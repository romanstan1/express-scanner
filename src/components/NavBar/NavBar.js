import React, {Component} from 'react'
import logo from './logo.png'
import './NavBar.css'

const SearchIcon = () =>
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Page 1</title>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="iPhone-7" transform="translate(-270.000000, -260.000000)" fill="#000">
        <path d="M273.589474 269.6c0-3.313199999999995 2.686800000000005-6 6-6 3.313199999999995.0 6 2.686800000000005 6 6 0 3.313199999999995-2.686800000000005 6-6 6-3.313199999999995.0-6-2.686800000000005-6-6v0zM293.989474 281.4548 287.529874 274.994C288.576274 273.4568 289.189474 271.6004 289.189474 269.6 289.189474 264.2984 284.891074 260 279.589474 260 274.287874 260 269.989474 264.2984 269.989474 269.6 269.989474 274.9016 274.287874 279.2 279.589474 279.2 281.589874 279.2 283.446274 278.5868 284.983474 277.5404L291.444274 284 293.989474 281.4548z" id="Page-1"/>
      </g>
    </g>
  </svg>

const BasketIcon = () =>
  <svg width="21" height="24" viewBox="0 0 21 24" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="iPhone-7" transform="translate(-170.000000, -260.000000)" fill="#000">
        <path d="M180.105263 262.526316C181.752421 262.526316 183.140632 263.583579 183.662316 265.052632H176.548211C177.069895 263.583579 178.458105 262.526316 180.105263 262.526316v0zM186.293474 265.052632C185.708632 262.170105 183.160842 260 180.105263 260 177.049684 260 174.501895 262.170105 173.917053 265.052632H170V280.842105C170 282.586526 171.413474 284 173.157895 284H187.052632C188.797053 284 190.210526 282.586526 190.210526 280.842105V265.052632H186.293474z" id="Page-1"/>
      </g>
    </g>
  </svg>


export default class NavBar extends Component {
  render() {
    return (
      <nav>
        <span className='menubutton'>Menu</span>
        <span className='imagewrap'><img src={logo} alt=""/></span>
        <span className='icons'>
          <SearchIcon/>
          <BasketIcon/>
        </span>
      </nav>
    )
  }
}
