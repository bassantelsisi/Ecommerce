import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const CartContext = createContext();
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};


export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState();
    const [loading, setLoading] = useState(true);
    // CartContext.js
    const resetCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.delete(
                'https://ecommerce.routemisr.com/api/v1/cart',
                { headers: { token } }
            );

            setCartItems([]);
            setCartId(null);
        } catch (error) {
            console.error('Error resetting cart:', error);
        }
    };

    const getCartData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { token }
            });

            if (response.data.status === 'success') {
                setCartItems(response.data.data.products || []);
                setCartId(response.data.data._id);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setCartItems([]);
                setCartId(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCartData();
    }, []); // Initial load

    const addToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login first');
            return;
        }

        try {
            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/cart',
                { productId },
                { headers: { token } }
            );

            if (response.data.status === 'success') {
                setCartItems(response.data.data.products);
                setCartId(response.data.data._id);
                toast.success('Added to cart!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding to cart');
        }
    };

    const removeFromCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers: { token } }
            );

            if (response.data.status === 'success') {
                // Immediately update the local state
                setCartItems(response.data.data.products);
                if (response.data.data.products.length === 0) {
                    setCartId(null);
                }
                toast.success('Removed from cart!');
            }
        } catch (error) {
            toast.error('Error removing from cart');
            // Refresh cart data in case of error
            getCartData();
        }
    };

    const updateQuantity = async (productId, count) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        if (count >= 1) {
            try {
                const response = await axios.put(
                    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    { count },
                    { headers: { token } }
                );

                if (response.data.status === 'success') {
                    setCartItems(response.data.data.products);
                    toast.success('Quantity updated!');
                }
            } catch (error) {
                toast.error('Error updating quantity');
                getCartData();
            }
        } else {
            toast.error('Quantity cannot be less than 1');
        }


    };
    const clearCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.delete(
                'https://ecommerce.routemisr.com/api/v1/cart',
                { headers: { token } }
            );

            if (response.data.status === 'success') {
                setCartItems([]);
                setCartId(null);
                toast.success('Cart cleared!');
            }
        } catch (error) {
            toast.error('Error clearing cart');
            getCartData();
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.count), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.count, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartId,
            loading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            resetCart,
            getCartData
        }}>
            {children}
        </CartContext.Provider>
    );
}
