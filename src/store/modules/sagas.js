
import {takeEvery} from 'redux-saga'

// console.log("takeEvery",takeEvery)
export function* watchAction() {
  yield takeEvery("CHANGE_SCANNING", redirectToProductPage)
}

function* redirectToProductPage() {
  console.log("redirectToProductPage")
  // yield put("CHANGE_SCANNING")
}
