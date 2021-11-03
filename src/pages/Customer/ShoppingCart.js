import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import RouteName from "../../config/Route";
import { useCart } from "../../contexts/CartContext";
import { convertToRupiah } from "../../utils/CovertToRupiah";
export default function ShoppingCart() {
  const { Order } = useCart();

  return (
    <MainLayout title='Shopping Cart'>
      {Order?.carts?.length > 0 ? (
        <div className='flex justify-between items-start gap-5'>
          <div className='flex flex-col w-3/5'>
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
                          Product
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Price
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Quantity
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {Order.carts.map((Cart) => (
                        <>
                          {Cart.cartItems.map((product, index) => (
                            <tr key={index}>
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
                                      {product.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {convertToRupiah(product.price)}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {product.quantity}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {convertToRupiah(
                                    product.price * product.quantity
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center w-2/5 bg-gray-200 rounded-md p-6'>
            <div className='flex w-full justify-between items-center mb-3'>
              <p>Total:</p>
              <p>{convertToRupiah(Order?.totalPrice || 0)}</p>
            </div>
            <Link
              to={"/customer/checkout"}
              className='bg-green-400 rounded-md p-2 mx-auto'
            >
              CheckOut
            </Link>
          </div>
        </div>
      ) : (
        <div className='w-full min-h-screen flex justify-start items-center flex-col'>
          <h1 className='text-4xl md:text-8xl mb-5'>Cart Kosong</h1>
          <p>
            Silahkan <Link to={RouteName.home}>belanja dulu</Link>{" "}
          </p>
        </div>
      )}
    </MainLayout>
  );
}
