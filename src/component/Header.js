import { Add } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Header = () => {

 

  return (

    
    <div className='fixed opacity-100 bg-black top-0 left-0 right-0 text-3xl flex justify-between items-center text-green-500 font-bold p-3 border-b-2 border-green-300'>
        <Link to={'/'}>
        <span >Anime<span className='text-white'>Verse</span></span> 
        </Link>
        <Link to={'/addmovie'}>
        <button className='text-sm hover:shadow-yellow-400 shadow-2xl p-2 text-white bg-green-500 border-2  shadow-sm rounded-full'>
         <Add color='inherit'/>   Add New</button>
         </Link>
    </div>
    
  )
}

export default Header
