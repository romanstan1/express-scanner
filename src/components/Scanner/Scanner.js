import React, { Component } from 'react';
import Quagga from 'quagga';
import {changeScanning, detectedBarcode,rerouteToProduct, detectedPrescriptionBarcode, fakePrescriptionScan} from '../../store/modules/actions'
import {connect} from 'react-redux'


class Scanner extends Component {

  componentDidMount() {
    var decoder
    if(this.props.scanPrescription) {
      decoder = 'ean_reader'
    } else {
      decoder = 'code_128_reader'
    }

    Quagga.init({
        inputStream: {
          type : "LiveStream",
          constraints: {
            width: window.innerHeight - 110,
            height: window.innerWidth - 10,
            facingMode: "environment" // or user
          }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: 4,
        decoder: {
          readers : [ decoder ]
        },
        locate: true
    }, function(err) {
        if (err) {
            return console.log(err);
        }
        Quagga.start();
    });
    Quagga.onDetected(this.onDetected);
  }

  componentWillUnmount() {
    Quagga.offDetected(this.onDetected);
  }

  cancelCamera = () => {
    Quagga.stop()
    Quagga.offDetected(this.onDetected);
    this.props.dispatch(changeScanning())
  }

  rerouteToProduct = () => {
    Quagga.stop()
    Quagga.offDetected(this.onDetected)
    this.props.dispatch(rerouteToProduct())
  }

  prescriptionScan = () => {
    Quagga.stop()
    Quagga.offDetected(this.onDetected)
    this.props.dispatch(fakePrescriptionScan(this.props.whichEye))
  }

  onDetected = (result) => {
    const {scanPrescription, dispatch, productResult, prescriptionResult, whichEye } = this.props
    console.log("detected",result.codeResult, whichEye, prescriptionResult)
    if(!!result.codeResult && !!result.codeResult.code && productResult.detectionCount < 3) {
      dispatch(detectedBarcode(result))
    } else if ( scanPrescription  && whichEye === 'left' && prescriptionResult.left.detectionCount < 3 ) {
      dispatch(detectedPrescriptionBarcode(result, whichEye))
    } else if ( scanPrescription && whichEye === 'right' && prescriptionResult.right.detectionCount < 3 ) {
      dispatch(detectedPrescriptionBarcode(result, whichEye))
    }
  }

  render() {
    return (
      <div className='camera-wrapper'>
        <div id="interactive" className="viewport"></div>
        <div className='overlayMessage'>
          {this.props.whichEye?<h3>{this.props.whichEye} EYE</h3> : null}
          <span>{this.props.overlayMessage}</span>
        </div>
        <div onClick={this.cancelCamera} className='cancel-button'>Cancel</div>
        <div onClick={this.rerouteToProduct} className='cancel-button reroute'>ReRoute</div>
        <div onClick={this.prescriptionScan} className='cancel-button scan-pres'>Scan Pres</div>
      </div>
    )
  }
}

export default connect(state => ({
  scanning: state.data.scanning,
  productResult: state.data.productResult,
  overlayMessage: state.data.overlayMessage,
  scanPrescription: state.data.scanPrescription,
  prescriptionResult: state.data.prescriptionResult,
  whichEye: state.data.whichEye
}))(Scanner)
