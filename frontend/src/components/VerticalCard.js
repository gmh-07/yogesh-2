import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
            {
                loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md'>
                            <div className='bg-gray-200 h-48 p-4 flex justify-center items-center animate-pulse rounded-t-lg'></div>
                            <div className='p-4 grid gap-3'>
                                <div className='bg-gray-200 h-4 w-3/4 rounded-full animate-pulse'></div>
                                <div className='bg-gray-200 h-4 w-1/2 rounded-full animate-pulse'></div>
                                <div className='flex gap-3'>
                                    <div className='bg-gray-200 h-4 w-1/4 rounded-full animate-pulse'></div>
                                    <div className='bg-gray-200 h-4 w-1/4 rounded-full animate-pulse'></div>
                                </div>
                                <div className='bg-gray-200 h-8 w-1/2 rounded-full animate-pulse'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link
                            to={"/product/" + product?._id}
                            key={product?._id}
                            className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1'
                            onClick={scrollTop}
                        >
                            <div className='bg-gray-100 h-48 p-4 flex justify-center items-center rounded-t-lg'>
                                <img
                                    src={product?.productImage[0]}
                                    className='object-contain h-full transition-all hover:scale-105'
                                />
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-lg text-gray-800 truncate'>
                                    {product?.productName}
                                </h2>
                                <p className='capitalize text-gray-500'>{product?.category}</p>
                                <div className='flex gap-3 items-center'>
                                    <p className='text-gray-800 font-semibold'>
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className='text-gray-500 line-through'>
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>
                                <button
                                    className='text-sm bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-all'
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )
            }
        </div>
    )
}

export default VerticalCard
