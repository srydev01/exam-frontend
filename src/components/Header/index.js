import React from "react"
import './header.scss'
import Logo from '../../assets/images/logo.png'

export default function Header() {
  return (
    <div className='image'>
      <img src={Logo} alt='header'/>
    </div>
  )
}