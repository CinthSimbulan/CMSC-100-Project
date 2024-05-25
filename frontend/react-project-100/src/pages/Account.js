import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';

function Account({ sortOption, onCartChange }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchProducts();
    }, [sortOption]);

    const fetchProducts = async () => {
        try {
            let url = 'http://localhost:3001/products';
            const response = await axios.get(url);
            let sortedProducts = response.data;
            console.log('Sort option received:', sortOption);
            // Sort products based on the selected sort option
            if (sortOption === 'name') {
                sortedProducts.sort((a, b) => { console.log('Sorting by name ascending'); return a.name.localeCompare(b.name); });
            } else if (sortOption === '-name') {
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            } else if (sortOption === 'type') {
                sortedProducts.sort((a, b) => {
                    return a.type - b.type;
                });
            } else if (sortOption === '-type') {
                sortedProducts.sort((a, b) => {
                    return b.type - a.type;
                });
            } else if (sortOption === 'price') {
                sortedProducts.sort((a, b) => {
                    return a.price - b.price;
                });
            } else if (sortOption === '-price') {
                sortedProducts.sort((a, b) => {
                    return b.price - a.price;
                });
            } else if (sortOption === 'quantity') {
                sortedProducts.sort((a, b) => {
                    return a.quantity - b.quantity;
                });
            } else if (sortOption === '-quantity') {
                sortedProducts.sort((a, b) => {
                    return b.quantity - a.quantity;
                });
            }
            console.log("Sort")
            console.log(sortedProducts)
            console.log("Sort")
            setProducts(sortedProducts);
            setFilteredProducts(sortedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filtered);
    };

    const addToCart = (productId) => {
        const productToAdd = products.find(product => product._id === productId);
        if (productToAdd) {
            onCartChange(productToAdd);
        }
    };

    useEffect(() => {
        console.log('Cart updated:', onCartChange);
    }, [onCartChange]);


    return (
        <div className='account-page mt-5 h-full w-full'>
            {/* Search box */}
            <div className='search-box'>
                <input
                    type='search'
                    className="search-form"
                    placeholder="Search product"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 m-4">
                {/* Map over the filtered products and create divs for each*/}
                {filteredProducts.map((product) => (
                    <div onClick={() => addToCart(product._id)} key={product._id} className="bg-[green] p-4 rounded-2xl min-h-72 text-gray-200">
                        <p className='text-xl'>{product.name}</p>
                        <p>{product.description}</p>
                        <p>Type: {product.type === 1 ? 'Poultry' : 'Crop'}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: P{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Account;
