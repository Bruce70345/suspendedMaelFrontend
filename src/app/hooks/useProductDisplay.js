// hooks/useProductDisplay.js
import { useState, useEffect } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

const useProductDisplay = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS));
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useProductDisplay;
