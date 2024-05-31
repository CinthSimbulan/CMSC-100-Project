import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa'


function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchProducts();
    }, [sortOption]);

    // Everytime selectedType or products is changed, the filterProducts function is called | So checkout while having a filter has a nice ui
    useEffect(() => {
        filterProducts();
    }, [selectedType, products]);

    const fetchProducts = async () => {
        try {
            let url = 'http://localhost:3001/products';
            const response = await axios.get(url);
            let sortedProducts = response.data;
            console.log('Sort option received:', sortOption);
            // Sort products based on the selected sort option | Compares each one a and b
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

    const filterProducts = () => {
        let filtered = products;
        if (selectedType !== null) {
            filtered = filtered.filter(product => product.type === selectedType);
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

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div>
            <div  className='flex bg-green-600 justify-between '>
                <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 ml-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className='text-white font-black text-4xl ml-5'>Product listings</span>
                </div>
                <div className='flex items-center h-20'>
                    <input
                        type='search'
                        className="border-2 border-gray-200 p-2 rounded-full placeholder:p-3 mx-3"
                        placeholder="Search product"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select
                        onChange={handleSortChange}
                        className='border-2 border-gray-200 rounded-full mx-3'
                    >
                        <option value=''>Sort by</option>
                        <option value='name'>Name ascending</option>
                        <option value='-name'>Name descending</option>
                        <option value='type'>Crop</option>
                        <option value='-type'>Poultry</option>
                        <option value='price'>Price ascending</option>
                        <option value='-price'>Price descending</option>
                        <option value='quantity'>Quantity ascending</option>
                        <option value='-quantity'>Quantity descending</option>
                    </select>
                </div>
            </div>
            
            <div className='flex mt-10'>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Name</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Description</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Type</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Quantity</span>
                <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Price</span>
            </div>
            <div>
                {filteredProducts.map((product) => (
                    <div className={`flex mt-5`} key={product._id}>
                        <div className={`flex flex-1 flex-col h-20 bg-green-400 items-center justify-center ${product.type === 1 ? 'bg-green-400' : 'bg-orange-300'}`}>
                            <p className='flex justify-center font-extrabold text-lg text-center text-white'>{product.name}</p>
                            <span className='flex justify-center italic text-xs text-white'>id: {product._id}</span>
                        </div>
                        <span className={`flex flex-1 justify-center text-xs text-center items-center h-20 pb-2 text-white mx-1 mb-2 ${product.type === 1 ? 'bg-green-400' : 'bg-orange-300'}`}>{product.description}</span>
                        <span className={`flex flex-1 justify-center text}-center items-center h-20 pb-2 bg-green-400 text-white mx-1 mb-2 font-extrabold ${product.type === 1 ? 'bg-green-400' : 'bg-orange-300'}`}>({product.type}) {product.type === 1 ? 'Crop' : 'Poultry'}</span>
                        <span className={`flex flex-1 justify-center text-center items-center h-20 text-lg pb-2 bg-green-400 text-white mx-1 mb-2 font-extrabold ${product.type === 1 ? 'bg-green-400' : 'bg-orange-300'}`}>{product.quantity}</span>
                        <span className={`flex flex-1 justify-center text-center items-center h-20 pb-2 bg-green-400 text-white mx-1 mb-2 font-extrabold ${product.type === 1 ? 'bg-green-400' : 'bg-orange-300'}`}>Php {product.price.toFixed(2)}</span>   
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductsPage
