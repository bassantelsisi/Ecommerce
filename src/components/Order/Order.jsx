import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext  } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useContext} from 'react';
import { CartContext } from '../CartContext/CartContext';



// Validation schema
const validationSchema = yup.object({
    shippingAddress: yup.object({
        details: yup.string()
            .required('Details are required')
            .min(3, 'Details must be at least 3 characters'),
        phone: yup.string()
            .required('Phone number is required')
            .matches(
                /^01[1250][0-9]{8}$/, 
                'Phone number must be an Egyptian number (e.g., 01123456789)'
            ),
        city: yup.string()
            .required('City is required')
            .min(3, 'City must be at least 3 characters')
    }),
    paymentMethod: yup.string()
        .required('Payment method is required')
});

function Order() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useContext(AuthContext);
    const { cartId, resetCart } = useContext(CartContext); // Add resetCart

    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: '',
                phone: '',
                city: ''
            },
            paymentMethod: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                // For cash payment
                if (values.paymentMethod === 'cash') {
                    const response = await axios.post(
                        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                        {
                            shippingAddress: values.shippingAddress
                            
                        },
                        {
                            headers: { token: localStorage.getItem('token') }
                        }
                    );

                    if (response.data.status === 'success') {
                        await resetCart(); // Reset cart after successful cash payment
                        toast.success('Order placed successfully!');
                        navigate('/paymentsuccess');
                    }
                }
                // For card payment
                else if (values.paymentMethod === 'card') {
                    const response = await axios.post(
                        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
                        { shippingAddress: values.shippingAddress },
                        { 
                            headers: { token: localStorage.getItem('token') }
                        }
                    );

                    if (response.data.status === 'success') {
                        // Store shipping address in localStorage for after payment completion
                        localStorage.setItem('pendingOrderAddress', JSON.stringify(values.shippingAddress));
                        localStorage.setItem('pendingCartId', cartId);
                        window.open(response.data.session.url,'_blank')
                        
                    }
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error placing order');
            } finally {
                setIsLoading(false);
            }
        }
    });

    
    return (
        <div className="max-w-md mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>
            
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Details Input */}
                <div className="relative">
                    <input
                        type="text"
                        name="shippingAddress.details"
                        id="details"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                            formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details ? 'border-red-500' : ''
                        }`}
                        placeholder=" "
                        value={formik.values.shippingAddress.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Delivery Details
                    </label>
                    {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
                        <p className="mt-1 text-xs text-red-500">{formik.errors.shippingAddress.details}</p>
                    )}
                </div>

                {/* Phone Input */}
                <div className="relative">
                    <input
                        type="tel"
                        name="shippingAddress.phone"
                        id="phone"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                            formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone ? 'border-red-500' : ''
                        }`}
                        placeholder=" "
                        value={formik.values.shippingAddress.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone Number
                    </label>
                    {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
                        <p className="mt-1 text-xs text-red-500">{formik.errors.shippingAddress.phone}</p>
                    )}
                </div>

                {/* City Input */}
                <div className="relative">
                    <input
                        type="text"
                        name="shippingAddress.city"
                        id="city"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                            formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city ? 'border-red-500' : ''
                        }`}
                        placeholder=" "
                        value={formik.values.shippingAddress.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        City
                    </label>
                    {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
                        <p className="mt-1 text-xs text-red-500">{formik.errors.shippingAddress.city}</p>
                    )}
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700">Payment Method</p>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                onChange={formik.handleChange}
                                className="form-radio text-green-600"
                            />
                            <span className="text-sm text-gray-700">Credit Card</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                onChange={formik.handleChange}
                                className="form-radio text-green-600"
                            />
                            <span className="text-sm text-gray-700">Cash on Delivery</span>
                        </label>
                    </div>
                    {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                        <p className="text-xs text-red-500">{formik.errors.paymentMethod}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !formik.isValid}
                    className={`w-full py-3 px-4 text-white rounded-lg transition-colors ${
                        isLoading || !formik.isValid
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        'Place Order'
                    )}
                </button>
            </form>
        </div>
    );
}

export default Order;