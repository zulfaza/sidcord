import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import parse from "html-react-parser";

import { convertToRupiah } from "../utils/CovertToRupiah";
import Breadcrumb from "../components/DetailProduct/Breadcrumb";
import Reviews from "../components/DetailProduct/Reviews";
import AddToCartButton from "../components/DetailProduct/AddToCartButton";
import Api from "../utils/Api";
import { useHistory } from "react-router";

export default function DetailProduct({ match }) {
  const [Product, setProduct] = useState({});
  const [ProductStock, setProductStock] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const slug = match.params.slug;
    Api.get("/products/" + slug).then((res) => {
      if (res.data.code === 200 && res.data.data.product) {
        setProduct(res.data.data.product);
        setProductStock(res.data.data.product.stock);
      }

      if (!res.data.data.product) {
        history.push("/error-404");
      }
    });
  }, [match, history]);

  return (
    <MainLayout>
      <div className='bg-white'>
        <div className='pt-6'>
          <Breadcrumb product={Product} />
          <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
            <div className='aspect-w-3 aspect-h-4 max-h-96 rounded-2xl overflow-hidden block'>
              <img
                src={Product.thumbnail}
                alt={Product.slug}
                className='w-full h-full object-center object-cover'
              />
            </div>
            {/* Product info */}
            <div className='flex flex-col col-span-2'>
              <div className=' lg:border-r lg:border-gray-200 lg:pr-8'>
                <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
                  {Product.name}
                </h1>
                <h2>Stock : {ProductStock}</h2>
              </div>

              <div className='py-10 lg:pt-6 lg:pb-16 lg:border-r lg:border-gray-200 lg:pr-8'>
                {/* Description and details */}
                <div>
                  <h3 className='sr-only'>Description</h3>
                  <div className='space-y-6 text-base text-gray-900'>
                    {Product.description && parse(Product.description)}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className='mt-4 lg:mt-0'>
                <h2 className='sr-only'>Product information</h2>
                <p className='text-3xl text-gray-900'>
                  {Product.price && convertToRupiah(Product.price)}
                </p>

                {/* Reviews */}
                <Reviews />
                <AddToCartButton
                  ProductStock={ProductStock}
                  setProductStock={setProductStock}
                  Product={Product}
                  productId={Product.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
