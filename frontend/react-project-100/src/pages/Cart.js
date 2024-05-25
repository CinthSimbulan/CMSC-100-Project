import React from 'react';

function Cart({ cart, onRemoveItem }) {  // Destructure the cart prop correctly
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

    let uniqueItemNames = Object.keys(itemCounts);

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
                        <button>Checkout</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
