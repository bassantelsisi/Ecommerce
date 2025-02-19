import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../CartContext/CartContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {
    const { addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { id } = useParams();

    // React Query for fetching product details
    const { data, isLoading, isError } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: async () => {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            return data.data;
        }
    });

    // Enhanced add to cart handler
    const handleAddToCart = async () => {
        if (!data || isAddingToCart) return;

        setIsAddingToCart(true);
        try {
            await addToCart(data._id);
            //toast.success('Product added to cart successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to add product to cart');
        } finally {
            setIsAddingToCart(false);
        }
    };

    // Image slider functions
    const handlePrevImage = () => {
        if (data) {
            const allImages = [data.imageCover, ...data.images];
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
            );
        }
    };

    const handleNextImage = () => {
        if (data) {
            const allImages = [data.imageCover, ...data.images];
            setCurrentImageIndex((prevIndex) =>
                prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">Error loading product details</div>
            </div>
        );
    }

    // Not found state
    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">Product not found</div>
            </div>
        );
    }

    const allImages = [data.imageCover, ...data.images];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Slider Section */}
                <div className="space-y-4">
                    <div className="relative">
                        <div className="relative h-[500px] overflow-hidden rounded-lg">
                            <img
                                src={allImages[currentImageIndex]}
                                alt={data.title}
                                className="w-full h-full object-contain rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Image Indicators */}
                    <div className="flex justify-center space-x-2">
                        {allImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    currentImageIndex === index ? 'bg-green-500 w-4' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
                    <p className="text-gray-600">{data.description}</p>

                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-5 h-5 ${
                                        index < Math.floor(data.ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-600">({data.ratingsQuantity} reviews)</span>
                    </div>

                    <div className="text-3xl font-bold text-green-600">${data.price}</div>

                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <span className="font-semibold">Category:</span> {data.category?.name}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Brand:</span> {data.brand?.name}
                        </p>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                        className={`w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg transition-colors ${
                            isAddingToCart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                        }`}
                    >
                        {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}