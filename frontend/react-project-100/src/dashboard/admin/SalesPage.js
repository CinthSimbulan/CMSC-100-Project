import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalesPage() {
    const [transactions, setTransactions] = useState([]);
    const [productsMapping, setProductsMapping] = useState({});
    const [products, setProducts] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        fetchTransactions();
        fetchProducts();
    }, []);

    useEffect(() => {
        // Calculate total sales when transactions or products change
        calculateTotalSales();
    }, [transactions, products]);

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
            setProducts(productsFromDatabase)
            const productsMap = {};
            productsFromDatabase.forEach(product => {
                // Create a map so that the product name can be printed when the transactions product id is used
                productsMap[product._id] = product;
            });
            setProductsMapping(productsMap);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const calculateTotalSales = () => {
        let total = 0;
        transactions.forEach(transaction => {
            if (transaction.orderStatus === 1) {
                total += transaction.orderQuantity * productsMapping[transaction.productId]?.price;
            }
        });
        setTotalSales(total);
    };

    return (
        <div className='flex flex-col'>
            <div className='flex bg-green-600 h-20 items-center justify-between'>
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 text-white ml-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    <span className='text-white font-black text-4xl ml-5'>Sales report</span>
                </div>
                <div className='flex justify-center text-white font-black text-xl mr-5'>
                    <span>Total Sales: Php {totalSales.toFixed(2)}</span>
                </div>
            </div>

            <div className='flex justify-between mt-10'>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Product name</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Quantity</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Email</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Date of purchase</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Time of purchase</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Total income</span>
            </div>
            <div className='mt-5'>
                {transactions
                    .filter(transaction => transaction.orderStatus === 1)
                    .map(transaction => (
                        <div className='flex' key={transaction._id}>
                            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{productsMapping[transaction.productId]?.name}</span>
                            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{transaction.orderQuantity}</span>
                            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{transaction.email}</span>
                            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{transaction.date}</span>
                            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{transaction.time}</span>
                            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>Php {(transaction.orderQuantity * productsMapping[transaction.productId]?.price).toFixed(2)}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SalesPage;
