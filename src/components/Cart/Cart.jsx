import { Link } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Cart() {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal,
        getCartData 
    } = useCart();

   
    useEffect(() => {
        getCartData();
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <p>Your cart is empty</p>
            </div>
        );
    }

    const handleQuantityUpdate = (productId, newCount) => {
        if (newCount < 1) {
            toast.error('Quantity cannot be less than 1');
            return;
        }
        updateQuantity(productId, newCount)
    };

    const handleRemove = async (productId) => {
        await removeFromCart(productId);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="space-y-4">
                {cartItems.map((item, index) => (
                    <div key={`${item.product._id}-${index}`} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                        <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">{item.product.title}</h3>
                            <p className="text-gray-600">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleQuantityUpdate(item.product._id, (1, item.count - 1))}
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span>{item.count}</span>
                            <button
                                onClick={() => handleQuantityUpdate(item.product._id, item.count + 1)}
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => handleRemove(item.product._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <div className="flex justify-between items-center mt-8 p-4 bg-white rounded-lg shadow">
                    <span className="text-xl font-semibold">Total:</span>
                    <span className="text-xl font-bold">${getCartTotal().toFixed(2)}</span>
                </div>
                <Link to="/order">
                    <button className="w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
}