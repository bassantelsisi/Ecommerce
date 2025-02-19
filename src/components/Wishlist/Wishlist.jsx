import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../CartContext/CartContext';
import { useWishlist } from '../context/WishlistContext/WishlistContext';

function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [loadingItems, setLoadingItems] = useState({});

    if (wishlistItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
                <p>Your wishlist is empty</p>
            </div>
        );
    }

    const handleAddToCart = async (item) => {
        setLoadingItems(prev => ({ ...prev, [item._id]: true }));
        try {
            await addToCart(item._id);
            await removeFromWishlist(item._id);
        } catch (error) {
            toast.error(error.message || 'Error adding to cart');
        } finally {
            setLoadingItems(prev => ({ ...prev, [item._id]: false }));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems.map((item, index) => (
                    <div 
                        key={`${item._id}-${index}`} // Combining _id with index for uniqueness
                        className="bg-white rounded-lg shadow-md p-4"
                    >
                        <img 
                            src={item.imageCover} 
                            alt={item.title} 
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4">${item.price}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleAddToCart(item)}
                                disabled={loadingItems[item._id]}
                                className={`bg-green-500 text-white px-4 py-2 rounded transition-colors ${
                                    loadingItems[item._id] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                                }`}
                            >
                                {loadingItems[item._id] ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={() => removeFromWishlist(item._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;