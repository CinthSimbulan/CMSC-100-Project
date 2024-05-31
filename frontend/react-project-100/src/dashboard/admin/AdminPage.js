import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'

import AdminNavbar from './components/AdminNavbar';
import Footer from '../../landing/Footer';
import UsersPage from './UsersPage';
import ProductsPage from './ProductsPage';
import TransactionsPage from './TransactionsPage';
import SalesPage from './SalesPage';

function AdminPage() {

    const isUserSignedIn = !!localStorage.getItem('token')

    return (
        <div className="flex flex-col min-h-screen">
            <AdminNavbar />
            <div className='flex-grow'>
                <Routes>
                    {isUserSignedIn && <Route path='/' element={<UsersPage />} />}
                    {isUserSignedIn && <Route path='/products' element={<ProductsPage />} />}
                    {isUserSignedIn && <Route path='/transactions' element={<TransactionsPage />} />}
                    {isUserSignedIn && <Route path='/sales' element={<SalesPage />} />}
                </Routes>
            </div>
            <Footer />
        </ div>
    )
}

export default AdminPage

