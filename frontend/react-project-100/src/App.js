import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Botbar from './components/Botbar';
import Cart from './pages/Cart';
import AdminNavbar from './components/AdminNavbar';
import AdminUsers from './pages/AdminUsers';
import AdminProducts from './pages/AdminProducts';
import AdminTransactions from './pages/AdminTransactions';

import LandingPage from './landing/LandingPage';
import LoginPage from './dashboard/login/LoginPage'
import SignUpPage from './dashboard/login/SignUpPage';
import MainPage from './dashboard/main/MainPage';
import AdminPage from './dashboard/admin/AdminPage';


function App() {
  const [sortOption, setSortOption] = useState(null);
  const [cart, setCart] = useState([]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

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

  const isUserSignedIn = !!localStorage.getItem('token')
  const userType = localStorage.getItem('usertype');
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/main/*' element={<MainPage />} />
        <Route path='/admin/*' element={<AdminPage />} />
      </Routes>
    </div>

  );
}

export default App;
