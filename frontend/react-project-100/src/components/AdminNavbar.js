import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { CgProfile } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericDownAlt } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";
import { GiGrainBundle } from "react-icons/gi";
import { GiChicken } from "react-icons/gi";
import './AdminNavbar.css'

function AdminNavbar({ onSortChange }) {
    const [sidebar, setSidebar] = useState(false)
    const [filterbar, setFilterBar] = useState(false)
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

    const toggleFilterbar = () => {
        setFilterBar(!filterbar)
    }

    const handleSortChange = (option) => {
        onSortChange(option);
        toggleFilterbar();
    };

    return (
        <>
            {isUserSignedIn ? (
                <div className='sticky top-0 bg-[#274B2C] w-full p-5 flex justify-between'>
                    <FaIcons.FaBars onClick={toggleSidebar} className='cursor-pointer-admin' />
                    <CiFilter onClick={toggleFilterbar} className='filter-icon-admin text-[#FFFFFF] w-4 h-4 font-bold' />
                    <div className={sidebar ? 'sidebar-admin active' : 'sidebar-admin'}>
                        <div className='drawer-widget-admin'>
                            <FaIcons.FaBars onClick={toggleSidebar} className='cursor-pointer-admin' />
                            <span className='pl-4 text-white font-bold text-xs'>Profile's menu</span>
                        </div>
                        <div className='profile-container-admin'>
                            <CgProfile className='profile-icon-admin' />
                            <div className="profile-text-admin">
                                <span className='profile-firstname-admin'>{firstname} {lastname}</span>
                                <span className='profile-customer-admin'>merchant</span>
                            </div>
                        </div>
                        <ul className='list-items-admin' onClick={toggleSidebar}>
                            <Link to='/admin/users'><li>User accounts</li></Link>
                            <Link to='/admin/products'><li>Product listings</li></Link>
                            <Link to='/admin/transactions'><li>Order fulfillment</li></Link>
                            <li>Sales reports</li>
                        </ul>
                        <button className='signout-button-admin' onClick={handleSignOut}>LOG OUT</button>
                    </div>

                    <div className={filterbar ? 'filterbar-admin active' : 'filterbar-admin'}>
                        <div className='filter-widget-admin'>
                            <CiFilter onClick={toggleFilterbar} className='filter-icon-admin text-[#FFFFFF] w-4 h-4 font-bold' />
                            <span className='pr-4 text-white font-bold text-xs '>Sort filter</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Name</span>
                            <div className='flex justify-around mb-16'>
                                <FaSortAlphaDown onClick={() => handleSortChange('name')} className='icons-admin' />
                                <FaSortAlphaDownAlt onClick={() => handleSortChange('-name')} className='icons-admin' />
                            </div>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Type</span>
                            <div className='flex justify-around mb-16'>
                                <GiGrainBundle onClick={() => handleSortChange('type')} className='icons-admin' />
                                <GiChicken onClick={() => handleSortChange('-type')} className='icons-admin' />
                            </div>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Price</span>
                            <div className='flex justify-around mb-16'>
                                <div onClick={() => handleSortChange('price')} className='two-icons-admin flex justify-center'>
                                    <TbCurrencyPeso className='w-12 h-12' />
                                    <FaSortNumericDown className='w-12 h-12' />
                                </div>
                                <div onClick={() => handleSortChange('-price')} className='two-icons-admin flex justify-center'>
                                    <TbCurrencyPeso className='w-12 h-12' />
                                    <FaSortNumericDownAlt className='w-12 h-12' />
                                </div>
                            </div>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Quantity</span>
                            <div className='flex justify-around mb-8'>
                                <FaSortNumericDown onClick={() => handleSortChange('quantity')} className='icons-admin' />
                                <FaSortNumericDownAlt onClick={() => handleSortChange('-quantity')} className='icons-admin' />
                            </div>
                            <button
                                onClick={() => handleSortChange('null')}
                                className='remove-button-admin flex justify-center pb-4 text-white font-bold text-2xl'>Remove filter
                            </button>
                        </div>
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

export default AdminNavbar

