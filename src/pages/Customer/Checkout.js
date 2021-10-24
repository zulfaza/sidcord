import React from "react";
import { FormInput } from "../../components/Checkout/FormInput";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Checkout/Card";
import { convertToRupiah } from "../../utils/CovertToRupiah";
const Inputs = [
  {
    label: "Nama",
    placeholder: "Masukan nama penerima",
  },
  {
    label: "Email",
    placeholder: "Masukan email penerima",
    type: "email",
  },
  {
    label: "Email",
    placeholder: "Masukan email penerima",
    type: "email",
  },
  {
    label: "Alamat",
    placeholder: "Masukan alamt penerima",
    type: "textarea",
  },
];

const KurirOptions = [
  {
    label: "Reguler (1-2 hari) - J&T",
    value: 1,
  },
];

const Products = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/sidcord-15021.appspot.com/o/1632892679223gibson-les-paul-standard-60s-bourbon-burst_3_GIT0049494-000.jpg?alt=media&token=805fb0ad-6220-4317-a647-f916d3cfe62d",
    name: "Gitar mantab 1",
    quantity: 2,
    price: 14000,
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/sidcord-15021.appspot.com/o/1632892679223gibson-les-paul-standard-60s-bourbon-burst_3_GIT0049494-000.jpg?alt=media&token=805fb0ad-6220-4317-a647-f916d3cfe62d",
    name: "Gitar mantab 2",
    quantity: 2,
    price: 24000,
  },
];

const calculateTotalProduct = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.price;
  });
  return total;
};

export const Checkout = () => {
  return (
    <MainLayout title='Checkout'>
      <div className='container gap-10 md:grid grid-cols-2'>
        <div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Alamat Pengiriman</h2>
            <Card>
              {Inputs.map((input, index) => (
                <FormInput key={index} {...input} />
              ))}
            </Card>
          </div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Kurir Pengiriman</h2>
            <Card>
              <select className='w-full border border-gray-300 rounded'>
                {KurirOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Card>
          </div>
        </div>
        <div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Ringkasan Belanja</h2>
            <Card>
              {Products.map((product, index) => (
                <div key={index} className='flex justify-between mb-5'>
                  <div className='flex'>
                    <div className='relative mr-3'>
                      <div className='w-20 h-20 overflow-hidden rounded-md'>
                        <img
                          className='object-cover w-full h-full object-center'
                          src={product.img}
                          alt={product.name}
                        />
                      </div>
                      <button className='bg-gray-700 p-1 rounded-full absolute -right-1 -top-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-54 text-white'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <h5 className='text-xl'>{product.name}</h5>
                      <h6>{convertToRupiah(product.price)}</h6>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-lg font-medium'>
                      x {product.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </Card>
          </div>
          <div>
            <Card>
              <div className='py-3 px-5'>
                <div className='flex justify-between mb-5 text-xl'>
                  <span>Total Harga Barang</span>
                  <span>
                    {convertToRupiah(calculateTotalProduct(Products))}
                  </span>
                </div>
                <div className='flex justify-center'>
                  <button className='px-6 py-3 rounded-md bg-blue-600 text-white font-medium'>
                    Bayar
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
