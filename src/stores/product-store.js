import { create } from 'zustand';

const useProductStore = create((set) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchProducts: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`http://localhost:1000/api/products/${userId}`);
            const data = await response.json();
            set({ products: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching products:', error);
            set({ isLoading: false, error: 'Failed to fetch products' });
        }
    },
    addProduct: async (userId, product) => {
        try {
            const response = await fetch(`http://localhost:1000/api/products/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const newProduct = await response.json();
            set((state) => ({
                products: [...state.products, newProduct],
            }));
        } catch (error) {
            console.error('Error adding product:', error);
        }
    },
    updateProduct: async (userId, productId, updatedFields) => {
        try {
            const response = await fetch(`http://localhost:1000/api/products/${userId}/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });
            const updatedProduct = await response.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                ),
            }));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    },
    deleteProduct: async (userId, productId) => {
        try {
            await fetch(`http://localhost:1000/api/products/${userId}/${productId}`, {
                method: 'DELETE',
            });
            set((state) => ({
                products: state.products.filter((product) => product._id !== productId),
            }));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    },
}));

export default useProductStore;
