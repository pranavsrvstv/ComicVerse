import { Add } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Appstate } from '../App'


const Header = () => {


  const useAppstate = useContext(Appstate);
  return (


    <div className='fixed opacity-100 bg-black top-0 left-0 right-0 text-3xl flex justify-between items-center text-green-500 font-bold p-3 border-b-2 border-green-300 hover:shadow-green-500 hover:shadow-2xl'>

      <Link to={'/'}>
        <div className='hover:shadow-green-500 hover:shadow-2xl'>
          <span >Comic<span className='text-white '>Verse</span></span>
        </div>

      </Link>
      {
      //if user is logged in show add new button else show log in button
      useAppstate.login?
      <div className='text-sm text-white '>
        <span >Signed In As {useAppstate.userName}</span>
      </div>
      :<></>
      }
      <Link to={`${useAppstate.login ? "/addmovie" : "/login"}`}>
        <button className='text-sm hover:shadow-blue-500 shadow-2xl p-2 text-white bg-green-500 border-2 rounded-full'>
          <Add color='inherit' />  {useAppstate.login ?
            <span>Add New</span> :
            <span>Log In</span>
          }</button>
      </Link>

    </div>

  )
}

export default Header
