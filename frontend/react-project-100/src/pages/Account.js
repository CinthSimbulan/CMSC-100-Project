import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Account.css'


function Account() {
    const [products, setProducts] = useState([]);
    const [filteredproducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            setProducts(response.data);
            setFilteredProducts(products);
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

    return (
        <div className='account-page mt-5 h-full w-full'>
            <div className='search-box'>
                <input
                    type='search'
                    className="search-form"
                    placeholder="Search product"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="grid grid-cols-4 gap-4 m-4">
                {/* Map over the names array and create divs for each name */}
                {filteredproducts.map((product) => (
                    <div key={product._id} className="bg-[green] p-4 rounded-2xl min-h-72 text-gray-200">
                        <p className='text-xl'>{product.name}</p>
                        <p>Description: {product.description}</p>
                        <p>Type: {product.type === 1 ? 'poultry' : 'crop'}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: P{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Account
