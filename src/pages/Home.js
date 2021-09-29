import axios from "axios";
import React, { useEffect, useState } from "react";
import Hero from "../components/HomePage/Hero";
import Product from "../components/HomePage/Product";
import MainLayout from "../components/MainLayout";
import API_URL from "../config/API";

export default function Home() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(API_URL + "/products").then((res) => {
      if (res.data.code === 200) {
        setProducts(res.data.data.product);
      }
    });
  }, []);

  return (
    <MainLayout>
      <Hero />
      <div className='bg-white'>
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
            Our Product
          </h2>

          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {Products.map((product) => (
              <Product data={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
