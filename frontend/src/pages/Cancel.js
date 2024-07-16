import React from 'react'
import CancelImage from '../assest/cancel.gif'
import { Link } from 'react-router-dom'


const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 m-3 rounded-md'>
      <img src={CancelImage}
        width={250}
        height={250}
        alt='cancel'
        className='mix-blend-multiply'
      />
      <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
    <Link to={"/cart"} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-all'>Go to Cart</Link>
    </div>
  )
}

export default Cancel
