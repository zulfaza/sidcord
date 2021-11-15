import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import MainLayout from "../../components/MainLayout";
import { useAuth } from "../../contexts/AuthContext";
import Api from "../../utils/Api";
import { convertToRupiah } from "../../utils/CovertToRupiah";

export default function TrackingOrder() {
  const [Orders, setOrders] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [PaymentData, setPaymentData] = useState({});
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

  function handlePaymentDetail(orderId) {
    setIsOpen(true);
    Api.get(`/payments/${orderId}`).then((res) => {
      setPaymentData(JSON.parse(res.data.data));
    });
  }

  return (
    <MainLayout title='Tracking Order'>
      <Transition appear show={IsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={() => setIsOpen(false)}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed bg-black bg-opacity-40 inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Payment Detail
                </Dialog.Title>
                <div className='mt-2'>
                  {PaymentData?.va_numbers?.length > 0 && (
                    <>
                      <div>
                        Tujuan :
                        <span className='uppercase ml-4'>
                          {PaymentData?.va_numbers[0].bank}
                        </span>
                      </div>
                      <div>
                        VA Number :
                        <span className='uppercase ml-4'>
                          {PaymentData?.va_numbers[0].va_number}
                        </span>
                      </div>
                      <div>
                        Status:
                        <span className='uppercase ml-4'>
                          {PaymentData?.transaction_status}
                        </span>
                      </div>
                      <div>
                        Jumlah:
                        <span className='uppercase ml-4'>
                          {convertToRupiah(parseInt(PaymentData?.gross_amount))}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

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
                              {product?.kurirId}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <button
                              onClick={() =>
                                handlePaymentDetail(
                                  `${order.id}-${currentUser.uid}`
                                )
                              }
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Details
                            </button>
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
