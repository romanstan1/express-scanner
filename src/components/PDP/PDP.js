import React, { Component } from 'react';
import {connect} from 'react-redux'
import {reset} from '../../store/modules/actions'
import './PDP.css'
import NavBar from '../NavBar/NavBar'
import deliveryDetails from './delivery-details.png'

const ProductDisplayPDP = ({productName, productType, price, productImageUrl}) =>
  <div className='product-display-pdp'>
    <div className='image'>
      <img src={productImageUrl} alt=""/>
    </div>

    <div className='text'>
      <h3>{productName}</h3>
      <div><h4>{productType} </h4> <span>{price}</span></div>
      <h5>30 lenses</h5>
    </div>
  </div>

class PDP extends Component {

  reset = () => {
    this.props.history.push('/')
    this.props.dispatch(reset())
  }

  componentDidMount = () => {
    const {prescriptionResult} = this.props
    if(prescriptionResult.left.pwr || prescriptionResult.right.pwr ) {
      // reroute to product page
      this.enterPrescription()
    }
  }

  enterPrescription = () => {
    this.props.history.push('/product')
  }

  render() {
    const {productResult, prescriptionResult} = this.props
    const {productName, productImageUrl, price, productType} = productResult
      console.log("productName",productName)
    return [
      <NavBar key='adadsda'></NavBar>,
      <div id='ProductPDP'  key='sjdf'>
        <ProductDisplayPDP
          productName={productName}
          price={price}
          productType={productType}
          productImageUrl={productImageUrl}
        />

        <div className='ss-button' onClick={this.enterPrescription}>
          Enter your prescription
        </div>
        <div className='delivery-image'>
          <img src={deliveryDetails} alt=""/>
        </div>
        <div className='reset' onClick={this.reset}>Reset</div>
      </div>
    ]
  }
}

export default connect(state => ({
  scanning: state.data.scanning,
  productResult: state.data.productResult,
  overlayMessage: state.data.overlayMessage,
  prescriptionResult: state.data.prescriptionResult
}))(PDP)
