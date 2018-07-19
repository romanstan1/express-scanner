import {products, prescriptions} from './matrix'

const messages =  {
  first: 'Scan the long barcode on your box',
  second: 'Scan the short barcode'
}

const initialState = {
  productPage: false,
  overlayMessage: messages.first,
  scanning: false,
  scanPrescription: false,
  whichEye: '',
  productResult: {
    detectionCount: 0,
    barcode:null,
    productUrlLink:null,
    productName: null,
    productImageUrl:null
  },
    prescriptionResult: {
      left: {
      detectionCount: 0,
      bc: null,
      dia: null,
      pwr: null
    },
    right: {
      detectionCount: 0,
      bc: null,
      dia: null,
      pwr: null
    }
  }
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'RESET': return {
      ...state,
      productPage: false,
      overlayMessage: messages.first,
      scanning: false,
      scanPrescription: false,
      whichEye: '',
      productResult: {
        detectionCount: 0,
        barcode:null,
        productUrlLink:null,
        productName: null,
        productImageUrl:null
      },
      prescriptionResult: {
        left: {
          detectionCount: 0,
          bc: null,
          dia: null,
          pwr: null
        },
        right: {
          detectionCount: 0,
          bc: null,
          dia: null,
          pwr: null
        }
      }
    }
    case 'CHANGE_SCANNING': return {
      ...state,
      productPage: false,
      scanning: !state.scanning
    }
    case 'FORCE_PRODUCT_PAGE': return {
      ...state,
      productPage: !state.productPage
    }
    case 'ROUTE_TO_PRODUCT':
    const code = '123ABCabc'
    const product2 = lookUpProduct(code)
    return {
      ...state,
      productPage: !state.productPage,
      productResult: {
        ...state.productResult,
        detectionCount: 3,
        barcode: code,
        productUrlLink: product2.productUrlLink,
        productName: product2.productName,
        productImageUrl: product2.productImageUrl,
        productType: product2.productType,
        price: product2.price
      }
    }
    case 'NEW_ROUTE_TO_PRODUCT':
    return {
      ...state,
      productPage: !state.productPage
    }
    case 'FAKE_PRES_SCAN':
    const prescription2 = lookUpPrescription('5901234123457')
    return {
      ...state,
      prescriptionResult: {
        ...state.prescriptionResult,
        [action.whichEye]: {
          detectionCount: 3,
          barcode: prescription2.barcode,
          bc: prescription2.bc,
          dia: prescription2.dia,
          pwr: prescription2.pwr
        }
      }
    }
    case 'SCAN_PRESCRIPTION':
    return {
      ...state,
      scanPrescription: true,
      whichEye: action.payload,
      overlayMessage: messages.second,
    }
    case 'DETECTED_SCANNING':
    const product = lookUpProduct(action.payload.codeResult.code)
    console.log("product",product)
    return {
      ...state,
      productResult: {
        ...state.productResult,
        detectionCount: state.productResult.detectionCount + 1,
        barcode: action.payload.codeResult.code,
        productUrlLink: product.productUrlLink,
        productName: product.productName,
        productImageUrl: product.productImageUrl,
        productType: product.productType,
        price: product.price
      }
    }
    case 'DETECTED_PRESCRIPTION_SCANNING':
    const prescription = lookUpPrescription(action.payload.codeResult.code)
    return {
      ...state,
      prescriptionResult: {
        ...state.prescriptionResult,
        [action.whichEye]: {
          detectionCount: action.whichEye === 'left'?
            state.prescriptionResult.left.detectionCount + 1 :
            state.prescriptionResult.right.detectionCount + 1,
          barcode: action.payload.codeResult.code,
          bc: prescription.bc,
          dia: prescription.dia,
          pwr: prescription.pwr
        }
      }
    }
    default: return state
  }
}

function lookUpProduct(barcode) {

  console.log('barcode', barcode)

  const product = products.find(product => product.barcode === barcode)

  // console.log("product: ",product)
  // console.log("barcode: ",barcode)

  if(product) return product
  else {
    return {
      productUrlLink: null,
      productName: 'Lense Not Found',
      productImageUrl: null
    }
  }
}

function lookUpPrescription(barcode) {
  const prescription = prescriptions.find(prescription => prescription.barcode === barcode)
  if(prescription) return prescription
  else {
    return {
      bc: 'NF',
      dia: 'NF',
      pwr: 'NF'
    }
  }
}
