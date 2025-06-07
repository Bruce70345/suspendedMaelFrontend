// hooks/useProductDisplay.js
import { useState, useEffect } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

const useProductDisplay = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('useProductDisplay - Starting fetch products');
            setLoading(true);
            setError(null);

            try {
                const apiUrl = buildApiUrl(API_ENDPOINTS.PRODUCTS);
                console.log('useProductDisplay - Fetching from:', apiUrl);

                const res = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('useProductDisplay - Response status:', res.status);
                console.log('useProductDisplay - Response ok:', res.ok);

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('useProductDisplay - Error response:', errorText);
                    throw new Error(`HTTP ${res.status}: ${errorText || 'Failed to fetch products'}`);
                }

                const data = await res.json();
                console.log('useProductDisplay - Raw response data:', data);

                // 驗證回應資料格式
                if (!Array.isArray(data)) {
                    console.error('useProductDisplay - Response is not an array:', typeof data);
                    throw new Error('Response data format error: expected array');
                }

                // 驗證每個產品的資料結構
                const validProducts = data.filter((product, index) => {
                    const isValid = product && (
                        product._id || product.id
                    ) && (
                            product.name || product.title || product.productName
                        );

                    if (!isValid) {
                        console.warn(`useProductDisplay - Invalid product data at index ${index}:`, product);
                    } else {
                        console.log(`useProductDisplay - Valid product ${index}:`, {
                            id: product._id || product.id,
                            name: product.name || product.title || product.productName,
                            userID: product.userID || product.userId || product.user,
                            price: product.price,
                            quantity: product.dailyQuantity || product.quantity
                        });
                    }

                    return isValid;
                });

                console.log(`useProductDisplay - Filtered ${validProducts.length} valid products from ${data.length} total`);
                setProducts(validProducts);

            } catch (err) {
                console.error('useProductDisplay - Fetch error:', err);
                setError(err.message);
                setProducts([]); // 確保錯誤時清空產品資料
            } finally {
                setLoading(false);
                console.log('useProductDisplay - Fetch completed');
            }
        };

        fetchProducts();
    }, []);

    console.log('useProductDisplay - Current state:', {
        productsCount: products.length,
        loading,
        error
    });

    return { products, loading, error };
};

export default useProductDisplay;
