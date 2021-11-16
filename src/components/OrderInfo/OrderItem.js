import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Api from "../../utils/Api";

const CartItem = ({ name, quantity, thumbnail }) => {
  return (
    <div className='flex flex-row place-items-center p-2'>
      <img
        alt='Qatar Airways'
        className='w-10 h-10 overflow-hidden rounded-full'
        src={thumbnail}
      />
      <div className='flex flex-col ml-2'>
        <table>
          <tbody>
            <tr className='text-xs text-gray-500'>
              <td>Nama Produk :</td>
              <td>{name}</td>
            </tr>
            <tr className='text-xs text-gray-500'>
              <td>Jumlah :</td>
              <td>{quantity} buah</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrderItem = ({ cartItems, order, status, id, UpdateList }) => {
  const [Loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  async function updateStatus(status) {
    setLoading(true);
    const token = await currentUser.getIdToken();
    const config = {
      headers: {
        authentication: token,
      },
    };
    return Api.post("/sellers/cartItems/update/" + id, { status }, config)
      .then(() => UpdateList())
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className='py-10'>
      <div className='max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg'>
        <div className='flex flex-row items-baseline flex-nowrap bg-gray-100 p-2'>
          <h1 className='ml-2 font-bold text-gray-500'>
            Order ID : {order.id}-{order.customerUID}
          </h1>
        </div>

        <div className='grid grid-cols-2'>
          <div className='mt-2 flex flex-col flex-wrap '>
            {cartItems.map((item) => (
              <CartItem {...item} key={item.id} />
            ))}
          </div>
          <div>
            <div className='flex flex-col ml-2'>
              <table>
                <tbody>
                  <tr className='text-xs text-gray-500'>
                    <td>Pembeli :</td>
                    <td>{order.alamat.nama}</td>
                  </tr>
                  <tr className='text-xs text-gray-500'>
                    <td></td>
                    <td>{order.alamat.recap}</td>
                  </tr>
                  <tr className='text-xs text-gray-500'>
                    <td></td>
                    <td>Telp. {order.alamat.notelp}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline'>
          <div className='md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap justify-end w-full'>
            {status === 2 && (
              <button
                disabled={Loading}
                onClick={() => updateStatus(3)}
                style={{ background: "#5663ED" }}
                className='px-5 py-2 disabled:opacity-50 rounded flex border-solid border text-white mx-2 justify-center place-items-center'
              >
                <div className=''>Tandai Telah Dikirim</div>
              </button>
            )}
            {status === 3 && (
              <div
                style={{ background: "#5663ED" }}
                className='px-5 py-2 disabled:opacity-50 rounded flex border-solid border text-white mx-2 justify-center place-items-center'
              >
                Dikirim
              </div>
            )}
            {status === 5 && (
              <div className='px-5 py-2 bg-green-500 disabled:opacity-50 rounded flex border-solid border text-white mx-2 justify-center place-items-center'>
                Diterima
              </div>
            )}
            {status === 6 && (
              <div className='px-5 py-2 bg-red-500 disabled:opacity-50 rounded flex border-solid border text-white mx-2 justify-center place-items-center'>
                Gagal
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
