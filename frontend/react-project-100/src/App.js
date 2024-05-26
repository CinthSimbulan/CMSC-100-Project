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
      {!isUserSignedIn && <Navbar onSortChange={handleSortChange} />}
      {isUserSignedIn && userType === 'Customer' && <Navbar onSortChange={handleSortChange} />}
      {isUserSignedIn && userType === 'Merchant' && <AdminNavbar onSortChange={handleSortChange} />}
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {isUserSignedIn && <Route path='/account' element={<Account sortOption={sortOption} onCartChange={addToCart} />} />}
          {isUserSignedIn && <Route path='/account/cart' element={<Cart cart={cart} onRemoveItem={removeFromCart} onOrderItem={orderSuccess} />} />}
          {isUserSignedIn && userType === 'Merchant' && <Route path='/admin' element={<Admin />} />}
          {isUserSignedIn && userType === 'Merchant' && <Route path='/admin/users' element={<AdminUsers />} />}
          {isUserSignedIn && userType === 'Merchant' && <Route path='/admin/products' element={<AdminProducts />} />}
          {isUserSignedIn && userType === 'Merchant' && <Route path='/admin/transactions' element={<AdminTransactions />} />}
        </Routes>
      </div>
      <Botbar />
    </div>

  );
}

export default App;
