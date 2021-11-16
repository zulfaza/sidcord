import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import OrderItem from "../../components/OrderInfo/OrderItem";
import { useAuth } from "../../contexts/AuthContext";
import Api from "../../utils/Api";

const OrderInfo = () => {
  const [Orders, setOrders] = useState([]);
  const [CurrentTab, setCurrentTab] = useState(1);
  const { currentUser } = useAuth();
  useEffect(() => {
    Api.get(`/sellers/cartItems/${currentUser.uid}?status=${CurrentTab}`).then(
      (res) => {
        console.log(res.data.data.carts);
        setOrders(res.data.data.carts);
      }
    );
  }, [currentUser, CurrentTab]);

  function UpdateList() {
    Api.get(`/sellers/cartItems/${currentUser.uid}?status=${CurrentTab}`).then(
      (res) => {
        console.log(res.data.data.carts);
        setOrders(res.data.data.carts);
      }
    );
  }

  return (
    <MainLayout title={"Order Info"}>
      <div className='bg-white'>
        <nav className='flex flex-col sm:flex-row'>
          <button
            onClick={() => setCurrentTab(1)}
            className={`${
              CurrentTab === 1
                ? "text-blue-500 font-medium border-blue-500"
                : "text-gray-600 border-transparent"
            } border-b-2 py-4 px-6 block hover:text-blue-500 focus:outline-none `}
          >
            Menunggu Pembayaran
          </button>
          <button
            onClick={() => setCurrentTab(2)}
            className={`${
              CurrentTab === 2
                ? "text-blue-500 font-medium border-blue-500"
                : "text-gray-600 border-transparent"
            } border-b-2 py-4 px-6 block hover:text-blue-500 focus:outline-none `}
          >
            Diproses
          </button>
          <button
            onClick={() => setCurrentTab(3)}
            className={`${
              CurrentTab === 3
                ? "text-blue-500 font-medium border-blue-500"
                : "text-gray-600 border-transparent"
            } border-b-2 py-4 px-6 block hover:text-blue-500 focus:outline-none `}
          >
            Dikirim
          </button>
          <button
            onClick={() => setCurrentTab(5)}
            className={`${
              CurrentTab === 5
                ? "text-blue-500 font-medium border-blue-500"
                : "text-gray-600 border-transparent"
            } border-b-2 py-4 px-6 block hover:text-blue-500 focus:outline-none `}
          >
            Diterima
          </button>
          <button
            onClick={() => setCurrentTab(6)}
            className={`${
              CurrentTab === 6
                ? "text-blue-500 font-medium border-blue-500"
                : "text-gray-600 border-transparent"
            } border-b-2 py-4 px-6 block hover:text-blue-500 focus:outline-none `}
          >
            Gagal
          </button>
        </nav>
      </div>
      {Orders.map((order) => (
        <OrderItem UpdateList={UpdateList} key={order.id} {...order} />
      ))}
    </MainLayout>
  );
};

export default OrderInfo;
