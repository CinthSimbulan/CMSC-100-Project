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


  const isUserSignedIn = !!localStorage.getItem('token')
  const userType = localStorage.getItem('usertype');
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSortChange={handleSortChange} />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {isUserSignedIn && <Route path='/account' element={<Account sortOption={sortOption} onCartChange={addToCart} />} />}
          <Route path='/cart' element={<Cart cart={cart} />} />
          {isUserSignedIn && userType === 'Merchant' && <Route path='/admin' element={<Admin />} />}
        </Routes>
      </div>
      <Botbar />
    </div>

  );
}

export default App;
