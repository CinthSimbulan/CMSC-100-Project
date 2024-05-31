import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../pages/Account.css';
import * as FaIcons from 'react-icons/fa'

function ProductsPage({ onCartChange }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [selectedType, setSelectedType] = useState(null);


    useEffect(() => {
        fetchProducts();
    }, [sortOption]);

    useEffect(() => {
        filterProducts();
    }, [selectedType, products, searchTerm]);

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

    const filterProducts = () => {
        let filtered = products;

        if (selectedType !== null) {
            filtered = filtered.filter(product => product.type === selectedType);
        }

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
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
            alert('Added item to cart')
        }
    };

    useEffect(() => {
        console.log('Cart updated:', onCartChange);
    }, [onCartChange]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const toggleType = (type) => {
        setSelectedType(prevType => (prevType === type ? null : type));
    };



    return (
        <div className='flex flex-col h-full w-full items-center'>
            <input
                type='search'
                className="w-1/2 border-2 border-gray-200 p-2 rounded-full mt-10 mb-6 placeholder:p-3"
                placeholder="Search product"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className='flex pb-5'>
                <FaIcons.FaLeaf className='text-green-700 mr-3' onClick={() => toggleType(1)} size={30} />
                <FaIcons.FaDove className="text-orange-400" onClick={() => toggleType(2)} size={30} />
            </div>
            <div className='w-1/6 mb-6'>
                <select
                    onChange={handleSortChange}
                    className='w-full border-2 border-gray-200 p-2 rounded-full'
                >
                    <option value=''>Sort by</option>
                    <option value='name'>Name ascending</option>
                    <option value='-name'>Name descending</option>
                    <option value='price'>Price ascending</option>
                    <option value='-price'>Price descending</option>
                    <option value='quantity'>Quantity ascending</option>
                    <option value='-quantity'>Quantity descending</option>
                </select>
            </div>

            {/* Products grid */}
            <div className="w-3/4 flex flex-wrap justify-center">
                {/* Map over the filtered products and create divs for each*/}
                {filteredProducts.map((product) => (
                    <div className='sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
                        <div key={product._id}
                            className={`w-full rounded-2xl h-72 text-gray-200 flex flex-col items-center text-center ${product.type === 1 ? 'bg-green-700' : 'bg-orange-400'
                                }`}
                            data-info="Add to Cart">
                            <div className='w-full p-2 flex justify-end'>
                                {product.type === 1 ? <FaIcons.FaLeaf size={18} /> : <FaIcons.FaDove size={18} />}
                            </div>
                            <div className='px-6 flex-grow'>
                                <p className='text-xl'>{product.name}</p>
                                <p className='text-sm'>{product.description}</p>
                                <p className='text-md'>Quantity: {product.quantity}</p>
                            </div>
                            <p className='text-md'>Php {product.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(product._id)} className={`py-2 px-4 rounded-b-2xl w-full  ${product.type === 1 ? 'bg-green-900/30 hover:bg-green-800' : 'bg-orange-900/30 hover:bg-orange-800'
                                }`}>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
