// src/app/trending/page.tsx

import React from 'react';

async function fetchProducts() {
    const res = await fetch('http://localhost:3000/api/products'); // Ensure this is the correct API route
    
    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    return res.json();
}

export default async function TrendingPage() {
    let products: Array<{ id: number; name: string; price: number }> = [];

    try {
        products = await fetchProducts();
        console.log(products)
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <div>
            {products && products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id}>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
}
