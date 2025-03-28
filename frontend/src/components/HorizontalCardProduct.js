import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='relative'>
                <button className='bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className='bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block' onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                <div ref={scrollElement} className='flex gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex animate-pulse'>
                                <div className='bg-gray-200 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-l-lg'></div>
                                <div className='p-4 grid w-full gap-2'>
                                    <div className='bg-gray-200 h-4 w-3/4 rounded-full'></div>
                                    <div className='bg-gray-200 h-3 w-1/2 rounded-full'></div>
                                    <div className='flex gap-3'>
                                        <div className='bg-gray-200 h-4 w-1/4 rounded-full'></div>
                                        <div className='bg-gray-200 h-4 w-1/4 rounded-full'></div>
                                    </div>
                                    <div className='bg-gray-200 h-8 w-1/2 rounded-full'></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => (
                            <Link
                                key={product?._id}
                                to={'/product/' + product?._id}
                                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex hover:shadow-lg transition-all hover:-translate-y-1'
                            >
                                <div className='bg-gray-100 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-l-lg flex items-center justify-center'>
                                    <img
                                        src={product?.productImage[0]}
                                        className='object-contain h-full transition-all hover:scale-105'
                                        alt={product?.productName}
                                    />
                                </div>
                                <div className='p-4 grid gap-2'>
                                    <h2 className='font-medium text-lg text-gray-800 truncate'>{product?.productName}</h2>
                                    <p className='capitalize text-gray-500'>{product?.category}</p>
                                    <div className='flex gap-3 items-center'>
                                        <p className='text-gray-800 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-gray-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button
                                        className='text-sm bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-md transition-all'
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HorizontalCardProduct;