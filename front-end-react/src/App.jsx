import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'

import Header from './components/Header'
import Body from './components/Body'
import Nav from './components/Nav'
import Footer from './components/Footer'


function App() {

  return (
    <div className='app'>
      <Header/>
      <Nav/>
      <Body/>
      {/* <Footer/> */}
    </div>
  )
}

export default App
