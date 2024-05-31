import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Cart({ cart, onRemoveItem, onOrderItem }) {
    const [transactions, setTransactions] = useState([]);
    const [products, setProducts] = useState({});

    const userEmail = localStorage.getItem('email')


    const showCart = () => {
        console.log('Cart contents:', cart);
        console.log('unique item names:', uniqueItemNames)
    };

    let itemCounts = {};
    cart.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    });

    const removeItem = (subject) => {
        onRemoveItem(subject)
    };

    const orderItem = (subject) => {
        onOrderItem(subject)
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
            fetchTransactions();
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

        console.log('This is subject: ', subject)
        console.log('This is subjectid: ', productId)
        console.log('This is subjectquantity: ', quantityToCheckout)
        console.log('This is subjectemail: ', email)

        if (quantityToCheckout > subject.quantity) {
            alert('Item is out of stock')
            return;
        }


        axios.post('http://localhost:3001/checkout', { productId: productId, orderQuantity: quantityToCheckout, email: email })
            .then(() => {
                alert('Order successful');
                orderItem(subject.name)
            })
            .catch((error) => {
                console.log(productId, quantityToCheckout, email)
                console.log(error);
                alert('Unable to create order');
            });
    }

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

    return (
        <div>
            <div className='flex justify-center font-black text-6xl'>
                Shopping Cart
            </div>
            <button className="mb-4" onClick={showCart}>Show Cart</button>
            <div>
                <h2 id='cart'>(Total: {cart.length})</h2>
                {uniqueItemNames.map((item, index) => (
                    <div className="flex justify-center" key={index}>
                        <p>{item}</p>
                        <p>Quantity: {itemCounts[item]}</p>
                        <button onClick={() => removeItem(item)}>Remove</button>
                        <button onClick={() => handleCheckout(cart.find(cart => cart.name === item))}>Checkout</button>
                    </div>
                ))}
            </div>


            <div>
                <h3>Orders</h3>
                {userTransactions.map((transaction) => (
                    <div key={transaction._id}>
                        <p>Product ID: {transaction.productId}</p>
                        <p>Name: {products[transaction.productId].name}</p>
                        <p>Order Quantity: {transaction.orderQuantity}</p>
                        <p>Order Status: {transaction.orderStatus}</p>
                        {transaction.orderStatus !== 1 && transaction.orderStatus !== 2 && (
                            <button onClick={() => handleCancelOrder(transaction)}>Cancel Order</button>
                        )}
                        <br />
                        <br />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Cart;
