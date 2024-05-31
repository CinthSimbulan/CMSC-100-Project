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

function AdminNavbar() {
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

    const handleUsers = () => {
        setSidebar(!sidebar)
        navigate('/admin')
    }

    const handleProducts = () => {
        setSidebar(!sidebar)
        navigate('/admin/products')
    }

    const handleTransactions = () => {
        setSidebar(!sidebar)
        navigate('/admin/transactions')
    }

    const handleSales = () => {
        setSidebar(!sidebar)
        navigate('/admin/sales')
    }

    const toggleSidebar = () => {
        setSidebar(!sidebar)
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
                        <button onClick={toggleSidebar} className='p-2'><FaIcons.FaBars className='text-white' /></button>
                        <span className='text-white'> Farm-to-Table </span>
                    </div>
                    <div className={sidebar ? 'sidebar active' : 'sidebar'}>
                        <div className='bg-[#274B2C] w-full p-4 items-center'>
                            <button className='p-2' onClick={toggleSidebar}>
                                <FaIcons.FaBars className='text-white' />
                            </button>
                            <span className='text-white'> Admin Menu </span>
                            {/* <span className='pl-4 text-white font-bold text-xs'>Profile's menu</span> */}
                        </div>
                        <div className='px-6 py-4 text-white'>
                            <div className='flex items-center'>
                                <CgProfile className=' w-16 h-16' />
                                <div className="px-4">
                                    <p className='text-xl font-medium'>{firstname} {lastname}</p>
                                    <p className='text-sm italic'>Merchant</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8 my-6 px-2'>
                                <button onClick={handleUsers} className='w-full text-left flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <span className='px-4'>User accounts</span>
                                </button>
                                <button onClick={handleProducts} className='w-full text-left flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    <span className='px-4'>Product listings</span>
                                </button>
                                <button onClick={handleTransactions} className='w-full text-left flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <span className='px-4'>Order fulfillment</span>
                                </button>
                                <button onClick={handleSales} className='w-full text-left flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                    </svg>
                                    <span className='px-4'>Sales report</span>
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

