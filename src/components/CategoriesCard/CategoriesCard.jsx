import React, { useState } from 'react'

export default function CategoriesCard({ category }) {  
  const { name, image, _id } = category;
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
          className={`rounded-t-lg h-[300px] w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
          src={image} 
          alt={name}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="px-5 py-4">
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