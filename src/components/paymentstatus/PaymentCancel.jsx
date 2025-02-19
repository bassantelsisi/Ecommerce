
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PaymentCancel() {
    const navigate = useNavigate();

    useEffect(() => {
        const handlePaymentCancellation = () => {
            // Clear pending order data
            localStorage.removeItem('pendingOrderAddress');
            localStorage.removeItem('pendingCartId');
            
            toast.info('Payment was cancelled. Your cart items are still available.');
            navigate('/cart');
        };

        handlePaymentCancellation();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Payment Cancelled</h2>
                <p>Redirecting you back to your cart...</p>
            </div>
        </div>
    );
}

export default PaymentCancel;