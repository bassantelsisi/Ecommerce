import React from 'react'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import { ClipLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'

function Products() {
  // Add the useQuery hook to fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      return data;
    }
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" />
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }

  return (
    <>
      {/* Products Grid */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl mb-4"></h2>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((prod) =>
            <ProductCard product={prod} key={prod._id} />
          )}
        </div>
      </div>
    </>
  )
}

export default Products