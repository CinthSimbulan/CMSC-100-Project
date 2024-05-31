import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillCartCheckFill } from "react-icons/bs";
import { TbTrashXFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function Cart({ cart, onRemoveItem, ontotallyRemoveItem }) {
    const [transactions, setTransactions] = useState([]);
    const [products, setProducts] = useState({});
    const userEmail = localStorage.getItem('email');

    let itemCounts = {};
    cart.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    });

    const removeItem = (subject) => {
        onRemoveItem(subject);
    };

    const totallyRemove = (subject) => {
        ontotallyRemoveItem(subject);
    };

    let uniqueItemNames = Object.keys(itemCounts);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchTransactions();
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

    const handleCheckout = (subject) => {
        const quantityToCheckout = itemCounts[subject.name];
        const productId = subject._id;
        const email = userEmail;

        if (quantityToCheckout > subject.quantity) {
            alert('Item is out of stock');
            return;
        }

        axios.post('http://localhost:3001/checkout', { productId: productId, orderQuantity: quantityToCheckout, email: email })
            .then(() => {
                alert('Order successful');
                ontotallyRemoveItem(subject.name);
                fetchTransactions()
            })
            .catch((error) => {
                console.log(productId, quantityToCheckout, email);
                console.log(error);
                alert('Unable to create order');
            });

    };

    const handleCancelOrder = async (transaction) => {
        try {
            // Update order status
            let updateTransactionUrl = `http://localhost:3001/checkout/${transaction._id}`;
            await axios.put(updateTransactionUrl, { ...transaction, orderStatus: 2 });

            // Refresh data
            fetchTransactions();
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const userTransactions = transactions.filter(transaction => transaction.email === userEmail);

    const totalPrice = cart.reduce((total, item) => {
        const product = products[item._id];
        if (product) {
            return total + product.price;
        }
        return total;
    }, 0);

    return (
        <>
            <div className='flex justify-center font-extrabold text-3xl mt-3'>
                <span>Shopping cart (Total: {cart.length}) Total Price: Php {totalPrice.toFixed(2)}</span>
            </div>
            <div className='flex'>
                <div className='flex flex-col w-2/3 mt-8'>
                    <div className='w-full'>
                        {uniqueItemNames.map((item, index) => {
                            const cartItem = cart.find(cartItem => cartItem.name === item);
                            const product = cartItem ? products[cartItem._id] : null;
                            if (!cartItem || !product) return null;
                            return (
                                <div className={`rounded-sm mb-5 ml-8 mr-5 flex justify-between ${product.type === 2 ? 'bg-orange-400' : 'bg-green-500'}`} key={index}>
                                    <div className='my-2 pl-10'>
                                        <p className='text-md text-white -mb-2 font-extrabold'>{item}</p>
                                        <span className='text-xs text-white'>id: {cartItem._id}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <FaMinus className='text-[#FF0000] mr-2.5' size={23} onClick={() => removeItem(item)} />
                                        <TbTrashXFilled className='text-[#FF0000] mr-2.5' size={23} onClick={() => totallyRemove(item)} />
                                        <span className='rounded-full bg-white border-x-40 border-white'>{itemCounts[item]}</span>
                                        <BsFillCartCheckFill className='ml-2 mr-4 text-white' size={20} onClick={() => handleCheckout(cartItem)} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='w-1/3 mt-8 mr-5'>
                    <div className='flex justify-center w-full bg-[#077230] py-2 rounded-sm mb-4'>
                        <h3 className='text-white font-extrabold'>Order status</h3>
                    </div>
                    {userTransactions.map((transaction) => {
                        const product = products[transaction.productId];
                        if (!product) return null;
                        return (
                            <div className='my-3 mb-8' key={transaction._id}>
                                <div className='flex justify-between items-center'>
                                    <span className='font-extrabold'>{product.name}</span>
                                    {transaction.orderStatus === 1 && <span className='text-xs italic'>mode of payment: COD</span>}
                                    {transaction.orderStatus === 0 && <span className='text-xs italic'>mode of payment: COD</span>}
                                    <div>
                                        <span className='text-xs'>Quantity: </span>
                                        <span className='text-md'>{transaction.orderQuantity}</span>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex items-center'>
                                        {transaction.orderStatus === 0 && <FaHourglassHalf className='text-yellow-500' size={40} />}
                                        {transaction.orderStatus === 1 && <FaCheckCircle className='text-green-500' size={40} />}
                                        {transaction.orderStatus === 2 && <MdCancel className='text-red-500' size={40} />}
                                        {transaction.orderStatus === 0 && <span className='px-2 font-extrabold'>Pending</span>}
                                        {transaction.orderStatus === 1 && <span className='px-2 font-extrabold'>Confirmed</span>}
                                        {transaction.orderStatus === 2 && <span className='px-2 font-extrabold'>Cancelled</span>}
                                    </div>

                                    {transaction.orderStatus !== 1 && transaction.orderStatus !== 2 && (
                                        <button className='text-white rounded-full bg-[#E37526] border-x-40 border-[#E37526]' onClick={() => handleCancelOrder(transaction)}>Cancel</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Cart;
