import React from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
