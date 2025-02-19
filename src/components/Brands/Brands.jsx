import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import BrandCard from '../BrandCard/BrandCard'


function LoadingSkeleton() {
    return (
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-[300px]"></div>
            <div className="mt-4 mx-auto w-3/4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  function Brands() { 
    const { data, isLoading } = useQuery({
      queryKey: ['brands'], 
      queryFn: async () => {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands') 
        return data
      }
    })
  
    if (isLoading) {
      return (
        <div className="container mx-auto px-4 py-4">
          <LoadingSkeleton />
        </div>
      )
    }
  
    return (
      <>
      <div className="container mx-auto px-4 py-4">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((item) =>
            <BrandCard key={item._id} brand={item} /> 
          )}
        </div>
      </div>
      </>
    )
  }
  export default Brands