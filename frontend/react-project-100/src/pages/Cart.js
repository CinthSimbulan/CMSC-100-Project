import React, { useState } from 'react';
import axios from 'axios'

function Cart({ cart, onRemoveItem, onOrderItem }) {  // Destructure the cart prop correctly
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

    // Function to get the current date
    // const getDate = () => {
    //     return new Date();
    // }

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
        </div>
    );
}

export default Cart;
