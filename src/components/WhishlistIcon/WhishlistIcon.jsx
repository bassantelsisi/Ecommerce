import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext/WishlistContext';

export default function WishlistIcon() {
    const { getWishlistCount } = useWishlist();
    const wishlistCount = getWishlistCount();

    return (
        <Link to="/Wishlist" className="relative">
            <div className="p-2">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-green-500 hover:text-red-500 transition-colors"
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                </svg>
                {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                    </span>
                )}
            </div>
        </Link>
    );
}