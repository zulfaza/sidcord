import React from "react";
import { Link } from "react-router-dom";

const breadcrumbs = [{ id: 1, name: "Guitar", href: "#" }];

export default function Breadcrumb({ product }) {
  return (
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
        <li className='text-sm'>{product.name}</li>
      </ol>
    </nav>
  );
}
