import React, { Component } from 'react';
import {connect} from 'react-redux'
import {scanPrescription, reset} from '../../store/modules/actions'
import './Product.css'


const SelectInput = ({val}) =>
  <span className='SelectInput'>
    <input type="text" placeholder="Select" defaultValue={val?val: val === 0 ? 0: ''}/>
    <span className={val?'active':''}>{val?'✓':null}</span>
  </span>

const ProductDisplay = ({productName, productType, price, productImageUrl}) =>
  <div className='product-display'>
    <div className='text'>
      <h3>{productName}</h3>
      <h4>{productType}</h4>
      <h5><span>{price}</span> per box of 30</h5>

    </div>
    <div className='image'>
      <img src={productImageUrl} alt=""/>
    </div>
  </div>


const RxInput = ({prescriptionResult, scan}) =>
  <div className="rx-input">
    <div className='enter'>Enter your prescription</div>
    <div className="title">
      <span>Left</span> <span>Right</span>
    </div>
    <div className="title-buttons">
      <span onClick={() => scan('left')}>Scan barcode</span>
      <span onClick={() => scan('right')}>Scan barcode</span>
    </div>

    <div className="row">
      <span className="title">Base Curve</span>
      <SelectInput val={prescriptionResult.left.bc}/>
      <SelectInput val={prescriptionResult.right.bc}/>
    </div>

    <div className="row">
      <span className="title">Diameter</span>
      <SelectInput val={prescriptionResult.left.dia}/>
      <SelectInput val={prescriptionResult.right.dia}/>
    </div>

    <div className="row">
      <span className="title">Sphere</span>
      <SelectInput val={prescriptionResult.left.pwr}/>
      <SelectInput val={prescriptionResult.right.pwr}/>
    </div>

    <div className="row quantity">
      <span className="title">Quantity</span>
      <SelectInput val={prescriptionResult.left.pwr? 1 : 0 }/>
      <SelectInput val={prescriptionResult.right.pwr? 1 : 0 }/>
    </div>
  </div>


const Totals = ({prescriptionResult, price}) => {

  var numItems = 0
  if(typeof prescriptionResult.left.pwr === 'number') {
    numItems = numItems + 1
  }
  if(typeof prescriptionResult.right.pwr === 'number') numItems = numItems + 1

  return <div className='totals'>
    <div className="row">
      <span className="title">Subtotal</span>
      <span className="value">{(price * numItems).toFixed(2)}</span>
    </div>

    <div className="row">
      <span className="title">Standard delivery</span>
      <span className="value">0.00</span>
    </div>

    <div className="row total">
      <span className="title">You pay</span>
      <span className="value">{(price * numItems).toFixed(2)}</span>
    </div>
  </div>
}

class Product extends Component {

  scan = (whichEye) => {
    const {history, dispatch} = this.props
    dispatch(scanPrescription(whichEye))
    history.push('/')
  }

  reset = () => {
    this.props.history.push('/')
    this.props.dispatch(reset())
  }

  render() {
    const {productResult, prescriptionResult} = this.props
    const {productName, productImageUrl, price, productType} = productResult
    return (
      <div id='Product'>
        <span className='close' onClick={this.reset}></span>
        <ProductDisplay
          productName={productName}
          price={price}
          productType={productType}
          productImageUrl={productImageUrl}
        />
        <RxInput prescriptionResult={prescriptionResult} scan={this.scan}/>
        <Totals prescriptionResult={prescriptionResult} price={price}/>

        <div className='ss-button'> Add to basket</div>
        <p className='bottom-text'>If you don't have a valid prescription, please <br/> contact your local Specsavers store.</p>
        <div className='reset' onClick={this.reset}>Reset</div>
      </div>
    )
  }
}

export default connect(state => ({
  scanning: state.data.scanning,
  productResult: state.data.productResult,
  overlayMessage: state.data.overlayMessage,
  prescriptionResult: state.data.prescriptionResult
}))(Product)
