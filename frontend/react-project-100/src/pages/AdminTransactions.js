import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchTransactions = async () => {
    try {
      let url = 'http://localhost:3001/checkout';
      const response = await axios.get(url);
      let transactionsFromDatabase = response.data;
      setTransactions(transactionsFromDatabase);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:3001/products';
      const response = await axios.get(url);
      let productsFromDatabase = response.data;

      // Convert array to object with product ID as the key
      let productsMap = {};
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
      let updateTransactionUrl = `http://localhost:3001/checkout/${transaction._id}`;
      await axios.put(updateTransactionUrl, { ...transaction, orderStatus: 1 });

      // Adjust product quantity
      let product = products[transaction.productId];
      let updatedProduct = { ...product, quantity: product.quantity - transaction.orderQuantity };
      let updateProductUrl = `http://localhost:3001/products/${transaction.productId}`;
      await axios.put(updateProductUrl, updatedProduct);

      // Refresh data
      fetchTransactions();
      fetchProducts();
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction._id}>
            <ul>
              <li className='text-xl'>
                {products[transaction.productId].name} {transaction.orderQuantity} {transaction.orderStatus} {transaction.email} {transaction.date} {transaction.time}
                {transaction.orderStatus !== 1 && transaction.orderStatus !== 2 && (
                  <button onClick={() => handleConfirmOrder(transaction)}>Confirm Order</button>
                )}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTransactions;
