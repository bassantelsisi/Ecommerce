import React, { useState } from 'react'

function BrandCard({ brand }) {
  const { name, image, _id } = brand;
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <>
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        {!imageLoaded && (
          <div className="animate-pulse">
            <div className="h-[300px] w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
          </div>
        )}
        <img 
          className={`p-8 rounded-t-lg h-[300px] w-full object-contain ${!imageLoaded ? 'hidden' : ''}`} 
          src={image} 
          alt={name} 
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="px-5 pb-5">
        {!imageLoaded ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          </div>
        ) : (
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
            {name}
          </h5>
        )}
      </div>
    </div>
    </>
  )
}

export default BrandCard