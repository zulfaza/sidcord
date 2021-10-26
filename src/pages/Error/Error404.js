import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import RouteName from "../../config/Route";

export default function Error404() {
  return (
    <MainLayout>
      <div className='w-full min-h-screen flex justify-center items-center flex-col'>
        <h1 className='text-4xl md:text-8xl font-bold'>404</h1>
        <p>
          back to home{" "}
          <Link
            className='text-indigo-700 hover:text-gray-700'
            to={RouteName.home}
          >
            Home
          </Link>{" "}
        </p>
      </div>
    </MainLayout>
  );
}
