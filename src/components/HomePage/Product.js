import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import classNames from "../../utils/ClassNames";
import { convertToRupiah } from "../../utils/CovertToRupiah";

export default function Product({ data }) {
  const reviews = { href: "#", average: 4, totalCount: 117 };

  return (
    <div className='group relative'>
      <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
        <img
          src={data.thumbnail}
          alt={data.slug}
          className='w-full h-full object-center object-cover lg:w-full lg:h-full'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-gray-700'>
            <Link to={`/product/${data.slug}`}>
              <span aria-hidden='true' className='absolute inset-0' />
              {data.name}
            </Link>
          </h3>
        </div>
        <p className='text-sm font-medium text-gray-900'>
          {convertToRupiah(data.price)}
        </p>
      </div>
      <div>
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
      </div>
    </div>
  );
}
