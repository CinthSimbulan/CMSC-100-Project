import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:3001/products';
      const response = await axios.get(url);
      let productsFromDatabase = response.data;
      console.log(productsFromDatabase)
      setProducts(productsFromDatabase);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <ul>
              <li className='text-md'>{product.name} {product.description} {product.type === 1 ? 'Poultry' : 'Crop'} {product.quantity} P{product.price}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProducts
