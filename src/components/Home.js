import React, { Component } from 'react';
import {connect} from 'react-redux'
import Scanner from './Scanner/Scanner'
import NavBar from './NavBar/NavBar'
import {changeScanning} from '../store/modules/actions'

class Home extends Component {

  scan = () => {
    this.props.dispatch(changeScanning())
  }

  componentDidUpdate = () => {
    const {productPage, history} = this.props
    if(productPage) {
      history.push('/PDP')
    }
  }
  componentWillReceiveProps = () => {
    const {productPage, history} = this.props
    if(productPage) {
      history.push('/PDP')
    }
  }

  render() {
    return (
      <div id='Home'>

        {this.props.scanning ? <Scanner/>
        :
        <span>
          <NavBar/>
          <h2>Find my contact lenses </h2>
          <h3>Have you got your box to hand?</h3>

          <div className='card'>
            <div className='button' onClick={this.scan}>Scan my barcode</div>
            <h4>Scan the long barcode on your box</h4>
          </div>

          <div className='card'>
            <div className='button'>Photo my Rx</div>
            <h4>Take a photo of the prescription on your box</h4>
          </div>
        </span>}

      </div>
    )
  }
}



export default connect(state => ({
  scanning: state.data.scanning,
  productPage:  state.data.productPage
}))(Home)
