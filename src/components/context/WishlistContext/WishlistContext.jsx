import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
const [wishlistItems, setWishlistItems] = useState([]);
const [loading, setLoading] = useState(true);


Collapse
const getWishlistData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setLoading(false);
        return;
    }

    try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: { token }
        });

        if (response.data.status === 'success') {
            setWishlistItems(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setWishlistItems([]);
        }
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    getWishlistData();
}, []);

const addToWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        toast.error('Please login first');
        return;
    }

    try {
        const response = await axios.post(
            'https://ecommerce.routemisr.com/api/v1/wishlist',
            { productId },
            { headers: { token } }
        );

        if (response.data.status === 'success') {
            setWishlistItems(response.data.data);
            toast.success('Added to wishlist!');
        }
    } catch (error) {
        toast.error(error.response?.data?.message || 'Error adding to wishlist');
    }
};

const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers: { token } }
        );

        if (response.data.status === 'success') {
            setWishlistItems(response.data.data);
            //toast.success('Removed from wishlist!');
        }
    } catch (error) {
        toast.error('Error removing from wishlist');
        getWishlistData();
    }
};

const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
};

const getWishlistCount = () => {
    return wishlistItems.length;
};

return (
    <WishlistContext.Provider value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        getWishlistData
    }}>
        {children}
    </WishlistContext.Provider>
);
}

export function useWishlist() {
const context = useContext(WishlistContext);
if (!context) {
throw new Error('useWishlist must be used within a WishlistProvider');
}
return context;
} 