import React from 'react'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import { ClipLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Slider1 from '../../assets/images/slider-image-1.jpeg'
import Slider2 from '../../assets/images/slider-image-2.jpeg'
import blogImg1 from '../../assets/images/blog-img-1.jpeg'
import blogImg2 from '../../assets/images/blog-img-2.jpeg'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      return response.data
    },
    //cacheTime:5000

  })
  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const allProductsData = data?.data.data

  const { data: allCat, isLoading: catLoading } = useQuery({
    queryKey: ['allCategories'],
    queryFn: getAllCategories
  })

  console.log(allCat, 'catttegoriies');


  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader
          color="#36d7b7"
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  }

  return (
    <>
    {/*main*/ }
      


      <div className="container mx-auto px-4"> {/* main slider + container products + categories slider */}
      <div className="mb-8">
        <div className="grid grid-cols-6">
          <div className='col-span-4 relative'>
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              loop={true}
              style={{ height: '100%' }}
              navigation={{
                nextEl: '.main-swiper-next',
                prevEl: '.main-swiper-prev',
              }}
            >
              <SwiperSlide>
                <img src={Slider1} className='w-full h-full block rounded-lg' alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Slider2} className='w-full h-full block rounded-lg' alt="" />
              </SwiperSlide>

              {/* Custom Navigation Buttons */}
              <button className="main-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10  w-10 h-10 rounded-full flex items-center justify-center  transition-all duration-200 group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-800 group-hover:text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button className="main-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-800 group-hover:text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </Swiper>
          </div>
          <div className='col-span-2 flex flex-col'>
            <img src={blogImg1} className='h-1/2 object-cover rounded-lg' alt="" />
            <img src={blogImg2} className='h-1/2 object-cover rounded-lg' alt="" />
          </div>
        </div>
      </div>

        {/* Categories Slider */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Shop Popular Categories</h2>
          <div className="relative"> {/* Added wrapper for positioning */}
            <Swiper
              modules={[Navigation]}
              slidesPerView={6}
              loop={true}
              spaceBetween={20}
              navigation={{
                nextEl: '.category-swiper-next',
                prevEl: '.category-swiper-prev',
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {allCat?.data.data.map((cat) =>
                <SwiperSlide key={cat._id}>
                  <div className="text-center">
                    <img src={cat.image} className='h-[200px] w-full object-cover rounded-lg' alt={cat.name} />
                    <div className="mt-2">{cat.name}</div>
                  </div>
                </SwiperSlide>
              )}

              {/* Custom Navigation Buttons */}
              <button className="category-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 w-8 h-8 rounded-full flex items-center justify-center  transition-all duration-200 group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-800 group-hover:text-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button className="category-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-800 group-hover:text-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </Swiper>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4"></h2>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((prod) =>
              <ProductCard product={prod} key={prod._id} />
            )}
          </div>
        </div>
      </div>

    </>

  )
}

export default Home