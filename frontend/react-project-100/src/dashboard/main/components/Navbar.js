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

function Navbar() {
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

    const handleProfileDetails = () => {
        setSidebar(!sidebar)
        navigate('/main')
    }

    const handleManageShoppingCart = () => {
        setSidebar(!sidebar)
        navigate('/main/cart')
    }

    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }

    const toggleFilterbar = () => {
        setFilterBar(!filterbar)
    }

    // const handleSortChange = (option) => {
    //     console.log(option)
    //     onSortChange(option);
    //     toggleFilterbar();
    // };

    return (
        <>
            {isUserSignedIn ? (
                <div className='sticky top-0 bg-[#274B2C] w-full p-4 flex justify-between items-center'>
                    <div className='h-full'>
                        <button onClick={toggleSidebar} className='p-2'><FaIcons.FaBars className='text-white'/></button>
                        <span className='text-white'> Farm-to-Table </span>
                    </div>
                    <div className={sidebar ? 'sidebar active' : 'sidebar'}>
                        <div className='bg-[#274B2C] w-full p-4 items-center'>
                            <button className='p-2' onClick={toggleSidebar}>
                                <FaIcons.FaBars className='text-white'/>
                            </button>
                            <span className='text-white'> Profile Menu </span>
                            {/* <span className='pl-4 text-white font-bold text-xs'>Profile's menu</span> */}
                        </div>
                        <div className='px-6 py-4 text-white'>
                            <div className='flex items-center'>
                                <CgProfile className=' w-16 h-16' />
                                <div className="px-4">
                                    <p className='text-xl font-medium'>{firstname} {lastname}</p>
                                    <p className='text-sm italic'>Customer</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8 my-6 px-2'>
                                <button onClick={handleProfileDetails} className='w-full text-left flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <span className='px-4'>Shop</span>
                                </button>
                                <button onClick={handleManageShoppingCart} className='w-full text-left flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    <span className='px-4'>Manage Shopping Cart</span>
                                </button>
                                <button onClick={handleSignOut} className='w-full text-left flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>
                                    <span className='px-4'>Logout</span>
                                </button>
                            </div>
                        </div>
                        
                    </div>

                    {/* <div className={filterbar ? 'filterbar active' : 'filterbar'}>
                        <div className='filter-widget'>
                            <CiFilter onClick={toggleFilterbar} className='filter-icon text-[#FFFFFF] w-4 h-4 font-bold' />
                            <span className='pr-4 text-white font-bold text-xs '>Sort filter</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Name</span>
                            <div className='flex justify-around mb-16'>
                                <FaSortAlphaDown onClick={() => handleSortChange('name')} className='icons' />
                                <FaSortAlphaDownAlt onClick={() => handleSortChange('-name')} className='icons' />
                            </div>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Type</span>
                            <div className='flex justify-around mb-16'>
                                <GiGrainBundle onClick={() => handleSortChange('type')} className='icons' />
                                <GiChicken onClick={() => handleSortChange('-type')} className='icons' />
                            </div>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Price</span>
                            <div className='flex justify-around mb-16'>
                                <div onClick={() => handleSortChange('price')} className='two-icons flex justify-center'>
                                    <TbCurrencyPeso className='w-12 h-12' />
                                    <FaSortNumericDown className='w-12 h-12' />
                                </div>
                                <div onClick={() => handleSortChange('-price')} className='two-icons flex justify-center'>
                                    <TbCurrencyPeso className='w-12 h-12' />
                                    <FaSortNumericDownAlt className='w-12 h-12' />
                                </div>
                            </div>
                            <span className='pb-4 text-white font-bold text-2xl'>Sort by Quantity</span>
                            <div className='flex justify-around mb-8'>
                                <FaSortNumericDown onClick={() => handleSortChange('quantity')} className='icons' />
                                <FaSortNumericDownAlt onClick={() => handleSortChange('-quantity')} className='icons' />
                            </div>
                            <button
                                onClick={() => handleSortChange('null')}
                                className='remove-button flex justify-center pb-4 text-white font-bold text-2xl'>Remove filter
                            </button>
                        </div>
                    </div> */}
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

