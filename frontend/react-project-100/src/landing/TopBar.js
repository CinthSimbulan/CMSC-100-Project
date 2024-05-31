import React from 'react'
import { Link } from 'react-router-dom'

function TopBar() {
    return (
        <div className='w-full bg-[#274B2C] p-4 flex justify-between items-center'>
            <span className='text-white ml-2 text-xl font-black'>FARM-TO-TABLE</span>
            <Link to='/login' className='mr-2 py-1 px-4 bg-white rounded-md'>Login</Link>
        </div>
    )
}

export default TopBar
