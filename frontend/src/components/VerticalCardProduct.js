import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(10).fill(null);
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
        <div className='container mx-auto px-4 my-8 relative'>
            <h2 className='text-2xl font-semibold py-4 text-gray-800'>{heading}</h2>

            <div className='relative'>
                <button
                    className='bg-gray-200 hover:bg-gray-300 text-gray-600 shadow-md rounded-full p-2 absolute left-0 z-10 hidden md:flex items-center justify-center'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-gray-200 hover:bg-gray-300 text-gray-600 shadow-md rounded-full p-2 absolute right-0 z-10 hidden md:flex items-center justify-center'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                <div
                    className='flex items-center gap-5 overflow-x-scroll scrollbar-none transition-all py-2'
                    ref={scrollElement}
                >
                    {loading
                        ? loadingList.map((_, index) => (
                              <div
                                  key={index}
                                  className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md animate-pulse'
                              >
                                  <div className='bg-gray-300 h-48 p-4 flex justify-center items-center'></div>
                                  <div className='p-4 grid gap-3'>
                                      <div className='bg-gray-300 h-4 w-3/4 rounded-full animate-pulse'></div>
                                      <div className='bg-gray-300 h-4 w-1/2 rounded-full animate-pulse'></div>
                                      <div className='flex gap-3'>
                                          <div className='bg-gray-300 h-4 w-1/4 rounded-full animate-pulse'></div>
                                          <div className='bg-gray-300 h-4 w-1/4 rounded-full animate-pulse'></div>
                                      </div>
                                      <div className='bg-gray-300 h-8 w-1/2 rounded-full animate-pulse'></div>
                                  </div>
                              </div>
                          ))
                        : data.map((product) => (
                              <Link
                                  to={'/product/' + product?._id}
                                  key={product?._id}
                                  className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1'
                              >
                                  <div className='bg-gray-100 h-48 p-4 flex justify-center items-center rounded-t-lg'>
                                      <img
                                          src={product.productImage[0]}
                                          className='object-contain h-full transition-all'
                                      />
                                  </div>
                                  <div className='p-4 grid gap-3'>
                                      <h2 className='text-lg font-medium text-gray-800 truncate'>
                                          {product?.productName}
                                      </h2>
                                      <p className='capitalize text-gray-500'>{product?.category}</p>
                                      <div className='flex gap-3'>
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
                          ))}
                </div>
            </div>
        </div>
    );
};

export default VerticalCardProduct;
