import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterTransactions(); // filterTransactions function will happen everytime there is a change in transactions or searchTerm
  }, [transactions, searchTerm]);

  const fetchTransactions = async () => {
    try {
      const url = 'http://localhost:3001/checkout';
      const response = await axios.get(url);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:3001/products';
      const response = await axios.get(url);
      const productsFromDatabase = response.data;

      // Convert array to object with product ID as the key
      const productsMap = {};
      productsFromDatabase.forEach(product => {
        productsMap[product._id] = product;
      });

      setProducts(productsMap);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleConfirmOrder = async (transaction) => {
    try {
      // Update order status
      const updateTransactionUrl = `http://localhost:3001/checkout/${transaction._id}`;
      await axios.put(updateTransactionUrl, { ...transaction, orderStatus: 1 });

      // Adjust product quantity
      const product = products[transaction.productId];
      const updatedProduct = { ...product, quantity: product.quantity - transaction.orderQuantity };
      const updateProductUrl = `http://localhost:3001/products/${transaction.productId}`;
      await axios.put(updateProductUrl, updatedProduct);

      // Refresh data
      fetchTransactions();
      fetchProducts();
      filterTransactions();
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const handleSortChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const filterTransactions = () => {
    const filtered = transactions.filter((transaction) =>
      searchTerm === '' || transaction.orderStatus.toString() === searchTerm
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex bg-green-600 h-20 items-center justify-between'>
        <div className='flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 text-white ml-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span className='text-white font-black text-4xl ml-5'>Order fulfillment</span>
        </div>
        <select
          onChange={handleSortChange}
          className='border-2 border-gray-200 rounded-full mx-3'
        >
          <option value=''>Filter by</option>
          <option value='0'>Pending</option>
          <option value='1'>Confirmed</option>
          <option value='2'>Canceled</option>
        </select>
      </div>
      <div className='flex justify-between mt-10'>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Product Name</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Quantity</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Email</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Date of purchase</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Order status</span>
      </div>
      <div>
        {filteredTransactions.map((transaction) => (
          <div className='flex mt-5' key={transaction._id}>
            <span className='flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-green-400 text-white mx-1 mb-2'>{products[transaction.productId]?.name}</span>
            <span className='flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-green-400 text-white mx-1 mb-2'>{transaction.orderQuantity}</span>
            <span className='flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-green-400 text-white mx-1 mb-2'>{transaction.email}</span>
            <span className='flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-green-400 text-white mx-1 mb-2'>{transaction.date}</span>
            {transaction.orderStatus !== 1 && transaction.orderStatus !== 2 && (
              <button className='flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-yellow-500 text-white mx-1 mb-2 rounded-3xl' onClick={() => handleConfirmOrder(transaction)}>Confirm Order</button>
            )}
            {transaction.orderStatus === 1 && (
              <span className='flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-green-600 text-white mx-1 mb-2 rounded-lg'>ready to deliver..</span>
            )}
            {transaction.orderStatus === 2 && (
              <span className='flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-red-500 text-white mx-1 mb-2'>cancelled</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionsPage;
