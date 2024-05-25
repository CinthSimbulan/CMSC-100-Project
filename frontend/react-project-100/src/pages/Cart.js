import React from 'react';

function Cart({ cart }) {  // Destructure the cart prop correctly
    const showCart = () => {
        console.log('Cart contents:', cart);
    };

    return (
        <div>
            Shopping Cart
            <button onClick={showCart}>Show Cart</button>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;
