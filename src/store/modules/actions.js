
export const changeScanning = () => {
  return dispatch => dispatch({
    type: 'CHANGE_SCANNING'
  })
}
export const scanPrescription = (whichEye) => {
  return dispatch => dispatch({
    type: 'SCAN_PRESCRIPTION',
    payload: whichEye
  })
}
export const reset = () => {
  return dispatch => dispatch({
    type: 'RESET'
  })
}
export const rerouteToProduct = () => {
  return dispatch => dispatch({
    type: 'ROUTE_TO_PRODUCT'
  })
}
export const forceProductPage = () => {
  return dispatch => dispatch({
    type: 'FORCE_PRODUCT_PAGE'
  })
}
export const fakePrescriptionScan = (whichEye) => {
  return dispatch => dispatch({
    type: 'FAKE_PRES_SCAN',
    whichEye
  })
}
export const detectedBarcode = (result) => {
  return dispatch => dispatch({
    type: 'DETECTED_SCANNING',
    payload: result
  })
}
export const detectedPrescriptionBarcode = (result, whichEye) => {
  return dispatch => dispatch({
    type: 'DETECTED_PRESCRIPTION_SCANNING',
    payload: result,
    whichEye
  })
}
