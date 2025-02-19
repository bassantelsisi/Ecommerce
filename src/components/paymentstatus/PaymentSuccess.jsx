import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../CartContext/CartContext';
import { Navigate } from 'react-router-dom';

function PaymentSuccess() {
    const navigate = useNavigate();
    const { resetCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            if (!isProcessing) return;
            
            try {
                // Reset the cart
                await resetCart();
                
                // Clear localStorage items
                localStorage.removeItem('pendingOrderAddress');
                localStorage.removeItem('pendingCartId');
                localStorage.removeItem('orderDetails');

                // Show success message
                toast.success('Order placed successfully!');
                
                // Set processing to false
                setIsProcessing(false);

            } catch (error) {
                console.error('Error handling payment success:', error);
                toast.error('There was an error processing your order.');
                navigate('/allorders');
            }
        };

        handlePaymentSuccess();
    }, [resetCart, isProcessing]);

    const handleViewOrders = () => {
        window.location.href = '/allorders';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <div className="mb-6">
                    <svg 
                        className="mx-auto h-16 w-16 text-green-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Order Placed Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your order. Your order has been confirmed.
                </p>
                {isProcessing ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                ) : (
                    <button
                        onClick={handleViewOrders}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-200"
                    >
                        View My Orders
                    </button>
                )}
            </div>
        </div>
    );
}

export default PaymentSuccess;