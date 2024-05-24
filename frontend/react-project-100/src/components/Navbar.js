import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { CgProfile } from "react-icons/cg";
import './Navbar.css'

function Navbar() {
    const [sidebar, setSidebar] = useState(false)
    const isUserSignedIn = !!localStorage.getItem('token')
    const firstname = localStorage.getItem('firstname')
    const lastname = localStorage.getItem('lastname')
    const navigate = useNavigate();


    const handleSignOut = () => {
        console.log('Clicked the logout')
        localStorage.removeItem('token')
        navigate('/login')
    }

    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }

    return (
        <>
            {isUserSignedIn ? (
                <div className='sticky top-0 bg-[#274B2C] w-full p-5'>
                    <FaIcons.FaBars onClick={toggleSidebar} className='cursor-pointer' />
                    <div className={sidebar ? 'sidebar active' : 'sidebar'}>
                        <div className='drawer-widget'>
                            <FaIcons.FaBars onClick={toggleSidebar} className='cursor-pointer' />
                        </div>
                        <div className='profile-container'>
                            <CgProfile className='profile-icon' />
                            <div className="profile-text">
                                <span className='profile-firstname'>{firstname} {lastname}</span>
                                <span className='profile-customer'>customer</span>
                            </div>
                        </div>
                        <ul className='list-items' onClick={toggleSidebar}>
                            <Link to='/account'><li>Profile Details</li></Link>
                            <Link to='/cart'><li>Manage Shopping Cart</li></Link>
                        </ul>
                        <button className='signout-button' onClick={handleSignOut}>LOG OUT</button>
                    </div>
                </div>
            ) : (
                <>
                    <nav className='flex justify-around p-3 border-b-20 border-[#1C2C20] items-center bg-[#274B2C]/90 text-zinc-300'>
                        <Link to='/'><h1 className='text-3xl'>Farm-to-table</h1></Link>
                        <ul className='flex gap-6'>
                            <Link to='/login'><li>Login</li></Link>
                            <Link to='/signup'><li>SignUp</li></Link>
                        </ul>
                    </nav>
                </>

            )}
        </>

    )
}

export default Navbar

