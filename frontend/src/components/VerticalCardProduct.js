import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(10).fill(null);
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

    return (
        <div className='container mx-auto px-4 my-8'>
            <h2 className='text-2xl font-semibold py-4 text-gray-800'>{heading}</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {loading
                    ? loadingList.map((_, index) => (
                          <div
                              key={index}
                              className='bg-white rounded-lg shadow-md animate-pulse p-4'
                          >
                              <div className='bg-gray-300 h-48 rounded'></div>
                              <div className='mt-4 space-y-2'>
                                  <div className='bg-gray-300 h-4 w-3/4 rounded'></div>
                                  <div className='bg-gray-300 h-4 w-1/2 rounded'></div>
                              </div>
                          </div>
                      ))
                    : data.map((product) => (
                          <Link
                              to={'/product/' + product?._id}
                              key={product?._id}
                              className='bg-white rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1 p-4'
                          >
                              <div className='bg-gray-100 h-48 flex justify-center items-center rounded'>
                                  <img
                                      src={product.productImage[0]}
                                      className='object-contain h-full transition-all'
                                  />
                              </div>
                              <div className='mt-4 space-y-2'>
                                  <h2 className='text-lg font-medium text-gray-800 truncate'>
                                      {product?.productName}
                                  </h2>
                                  {/* <p className='capitalize text-gray-500'>{product?.category}</p> */}
                                  <div className='flex gap-3'>
                                      <p className='text-gray-800 font-semibold'>
                                          {displayINRCurrency(product?.sellingPrice)}
                                      </p>
                                      <p className='text-gray-500 line-through'>
                                          {displayINRCurrency(product?.price)}
                                      </p>
                                  </div>
                                  <button
                                      className='text-sm bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-all w-full'
                                      onClick={(e) => handleAddToCart(e, product?._id)}
                                  >
                                      Add to Cart
                                  </button>
                              </div>
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default VerticalCardProduct;
