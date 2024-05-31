import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'

import Navbar from './components/Navbar'
import ProductsPage from './ProductsPage'

import CartPage from './CartPage';
import Footer from '../../landing/Footer';

function MainPage() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const userType = localStorage.getItem('usertype');

    // const [sortOption, setSortOption] = useState(null);
    const [cart, setCart] = useState([]);

    // const handleSortChange = (option) => {
    //     setSortOption(option);
    // };

    const addToCart = (product) => {
        setCart([...cart, product]);
        console.log(cart)
    };

    const removeFromCart = (itemName) => {
        // This will create a copy then reverse the array to find the index of the last added item
        const indexToRemove = cart.slice().reverse().findIndex(item => item.name === itemName);
        if (indexToRemove !== -1) {
            // This will find the index of the found item when not reversed
            const trueIndex = cart.length - 1 - indexToRemove;
            // This will get the values of the array from the start up to before the index, and after the index up to the end
            const updatedPushcarts = [...cart.slice(0, trueIndex), ...cart.slice(trueIndex + 1)];
            setCart(updatedPushcarts);
        }
    };

    const orderSuccess = (itemName) => {
        const updatedCart = cart.filter(item => item.name !== itemName);
        setCart(updatedCart);
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    {isUserSignedIn && <Route path='/' element={<ProductsPage onCartChange={addToCart} />} />}
                    {isUserSignedIn && <Route path='/cart' element={<CartPage cart={cart} onRemoveItem={removeFromCart} ontotallyRemoveItem={orderSuccess} />} />}
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default MainPage
