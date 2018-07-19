import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
// import { watchAction } from './modules/sagas'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import {rerouteToProduct, forceProductPage} from './modules/actions'
// import createSagaMiddleware from 'redux-saga'
// import logger from 'redux-logger'
import Quagga from 'quagga';

// const sagaMiddleware = createSagaMiddleware()

export const history = createHistory()

const enhancers = []

const logger = store => next => action => {
  let result = next(action)
  console.log("store: ",action.type, store.getState())

  if(action.type === "DETECTED_SCANNING" && store.getState().data.productResult.detectionCount === 3) {
    Quagga.stop()
    store.dispatch(forceProductPage())
  }

  const {prescriptionResult} = store.getState().data
  if(((action.type === "DETECTED_PRESCRIPTION_SCANNING" || action.type === "FAKE_PRES_SCAN") && prescriptionResult.left.detectionCount === 3) || ((action.type === "DETECTED_PRESCRIPTION_SCANNING" || action.type === "FAKE_PRES_SCAN") && prescriptionResult.right.detectionCount === 3)) {
    Quagga.stop()
    store.dispatch(forceProductPage())
    store.dispatch(forceProductPage())
  }

  return result
}

const middleware = [
  thunk,
  // sagaMiddleware,
  routerMiddleware(history),
  logger
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)

// sagaMiddleware.run(watchAction)

export default store
