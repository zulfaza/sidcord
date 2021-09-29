import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import API_URL from "../../config/API";
import { useAuth } from "../../contexts/AuthContext";

export default function Example() {
  const { currentUser } = useAuth();
  const [Products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    currentUser
      .getIdToken()
      .then((token) => {
        const config = {
          headers: {
            authentication: token,
          },
        };
        return axios.get(API_URL + "/sellers/get/products", config);
      })
      .then((res) => {
        if (res.data.code === 200) {
          const { product } = res.data.data;
          setProducts(product);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  return (
    <MainLayout title={"List Product"}>
      <section className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
        <Link
          className='bg-green-500 hover:bg-green-600 transition-colors text-white flex w-max pl-3 pr-4 py-3 rounded-lg'
          to='/seller/add-product'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          <span>Tambah Product</span>
        </Link>
      </section>

      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Nama Product
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Stock
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Harga
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {Products.map((product) => (
                    <tr key={product.id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10'>
                            <img
                              className='h-10 w-10 rounded-full'
                              src={product.thumbnail}
                              alt=''
                            />
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              <Link to={`/product/${product.slug}`}>
                                {product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {product.stock}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          {product.price}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td> */}
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <Link
                          to='/'
                          className='text-indigo-600 hover:text-indigo-900'
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
