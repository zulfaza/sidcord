import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { StarIcon } from "@heroicons/react/solid";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import classNames from "../utils/ClassNames";
import API_URL from "../config/API";
import axios from "axios";
import { convertToRupiah } from "../utils/CovertToRupiah";

export default function DetailProduct({ match }) {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    const slug = match.params.slug;
    axios.get(API_URL + "/products/" + slug).then((res) => {
      if (res.data.code === 200) {
        setProduct(res.data.data.product);
      }
    });
  }, [match]);

  const breadcrumbs = [{ id: 1, name: "Guitar", href: "#" }];

  const reviews = { href: "#", average: 4, totalCount: 117 };

  return (
    <MainLayout>
      <div className='bg-white'>
        <div className='pt-6'>
          <nav aria-label='Breadcrumb'>
            <ol className='max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8'>
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className='flex items-center'>
                    <Link
                      to={breadcrumb.href}
                      className='mr-2 text-sm font-medium text-gray-900'
                    >
                      {breadcrumb.name}
                    </Link>
                    <svg
                      width={16}
                      height={20}
                      viewBox='0 0 16 20'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      className='w-4 h-5 text-gray-300'
                    >
                      <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                    </svg>
                  </div>
                </li>
              ))}
              <li className='text-sm'>{Product.name}</li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
            <div className='aspect-w-3 aspect-h-4 rounded-lg overflow-hidden block'>
              <img
                src={Product.thumbnail}
                alt={Product.slug}
                className='w-full h-full object-center object-cover'
              />
            </div>
            {/* Product info */}
            <div className='flex flex-col col-span-2'>
              <div className=' lg:border-r lg:border-gray-200 lg:pr-8'>
                <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
                  {Product.name}
                </h1>
                <h2>Stock : {Product.stock}</h2>
              </div>

              <div className='py-10 lg:pt-6 lg:pb-16 lg:border-r lg:border-gray-200 lg:pr-8'>
                {/* Description and details */}
                <div>
                  <h3 className='sr-only'>Description</h3>
                  <div className='space-y-6 text-base text-gray-900'>
                    {Product.description && parse(Product.description)}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className='mt-4 lg:mt-0'>
                <h2 className='sr-only'>Product information</h2>
                <p className='text-3xl text-gray-900'>
                  {Product.price && convertToRupiah(Product.price)}
                </p>

                {/* Reviews */}
                <div className='mt-6'>
                  <h3 className='sr-only'>Reviews</h3>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <p className='sr-only'>{reviews.average} out of 5 stars</p>
                    <Link
                      to={reviews.href}
                      className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {reviews.totalCount} reviews
                    </Link>
                  </div>
                </div>

                <form className='mt-10'>
                  <button
                    type='submit'
                    className='mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Add to bag
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
