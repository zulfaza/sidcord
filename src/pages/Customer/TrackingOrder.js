import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { useAuth } from "../../contexts/AuthContext";
import Api from "../../utils/Api";
import { convertToRupiah } from "../../utils/CovertToRupiah";

export default function TrackingOrder() {
  const [Orders, setOrders] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    Api.get(`/carts/checkout/${currentUser.uid}`)
      .then((res) => {
        console.log(res);
        if (res.data.data.length > 0) setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  return (
    <MainLayout title='Tracking Order'>
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
                      Product
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Courier
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {Orders.length > 0 &&
                    Orders.map((order) =>
                      order.carts.map((product) => (
                        <tr key={product.id}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <h4>
                              Order ID :
                              <span className='font-bold ml-3'>
                                {order.id}-{currentUser.uid}
                              </span>
                            </h4>
                            <h5>Penjual : {product.seller.name}</h5>
                            <h6>Items : </h6>
                            {product.cartItems.map((item) => (
                              <div
                                key={item.id}
                                className='flex items-center mb-3'
                              >
                                <div className='flex-shrink-0 h-10 w-10'>
                                  <img
                                    className='h-10 w-10 rounded-full'
                                    src={item.thumbnail}
                                    alt=''
                                  />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900'>
                                    {item.name} x {item.quantity}
                                  </div>
                                  <div className='text-sm text-gray-500'>
                                    {convertToRupiah(item.price)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                              {getStatusLabel(order.status)}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-500'>
                              {product?.kurir?.nama}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <Link
                              to='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function getStatusLabel(status) {
  switch (status) {
    case 2:
      return "Proses";
    case 3:
      return "Kirim";
    case 4:
      return "Diantar oleh kurir";
    case 5:
      return "Diterima";
    case 6:
      return "Gagal";
    default:
      return "Menunggu Pembayaran";
  }
}
