import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext/CartContext';
import { useWishlist } from '../context/WishlistContext/WishlistContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
    const { title, imageCover, price, _id, description, ratingsAverage } = props.product;
    const [imageLoaded, setImageLoaded] = useState(false);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist, wishlistItems } = useWishlist();
    const [isInWishlistState, setIsInWishlistState] = useState(false);
    const navigate = useNavigate();

    // Update local state when wishlist changes
    useEffect(() => {
        setIsInWishlistState(isInWishlist(_id));
    }, [_id, wishlistItems, isInWishlist]);



//Add to cart event and alert
// ProductCard.jsx
const handleAddToCart = async (e) => {
e.preventDefault();

const token = localStorage.getItem('token');
if (!token) {
    toast.error('Please login first');
    navigate('/login');
    return;
}

try {
    await addToCart(_id); // Just pass the product ID
    
    
} catch (error) {
    console.error('Error adding to cart:', error);
    if (error.response?.status === 401) {
        toast.error('Please login again');
        navigate('/login');
    } else {
        toast.error(error.response?.data?.message || 'Error adding to cart');
    }
}
};
// Add to whishlist event and alert 
const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
        toast.error('Please login first');
        navigate('/login');
        return;
    }

    try {
        if (isInWishlistState) {
            await removeFromWishlist(_id);
            setIsInWishlistState(false);
        } else {
            await addToWishlist(_id);
            setIsInWishlistState(true);
        }
    } catch (error) {
        toast.error('Error updating wishlist');
    }
};

return (
    <Link to={`/details/${_id}`}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
                {/* Skeleton loader */}
                {!imageLoaded && (
                    <div className="animate-pulse">
                        <div className="p-8 rounded-t-lg h-[500px] w-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                )}

                <div>
                    <img
                        className={`p-8 rounded-t-lg h-[500px] w-full ${!imageLoaded ? 'hidden' : ''}`}
                        src={imageCover}
                        alt={title}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                {/*wishlistbutton*/}
                <button
                        onClick={handleWishlistClick}
                        className="absolute bottom-10 right-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={isInWishlistState ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth={isInWishlistState ? "0" : "1.5"}
                            className={`w-6 h-6 ${
                                isInWishlistState ? 'text-red-500' : 'text-green-500'
                            } transition-colors duration-300`}
                        >
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
            </div>

            {!imageLoaded ? (
                // Skeleton loader for content
                <div className="px-5 pb-5 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-2/3 mb-4"></div>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="w-4 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                            ))}
                        </div>
                        <div className="w-12 h-4 bg-gray-200 rounded dark:bg-gray-700 ms-3"></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 w-24"></div>
                        <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-28"></div>
                    </div>
                </div>
            ) : (
                // Actual content
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    <br />
                    <p className="text-l tracking-tight text-gray-900 dark:text-white">
                        {description.slice(0, 90) + ' . . .'}
                    </p>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-4 h-4 ${index < Math.floor(ratingsAverage)
                                            ? 'text-yellow-300'
                                            : 'text-gray-200 dark:text-gray-600'
                                        }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            ))}
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {ratingsAverage}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${price}
                        </span>
                        {/*Add to cart buttton*/}
                        <button
                            onClick={handleAddToCart}
                            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    </Link>
);
}

export default ProductCard;