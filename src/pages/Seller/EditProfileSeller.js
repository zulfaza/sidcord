import react from "react";
import { PaperClipIcon } from '@heroicons/react/solid'
import MainLayout from "../../components/MainLayout";

export default function EditProfileSeller() {
    return ( 
        <MainLayout>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Profile Seller</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <input type='text' defaultValue='input your name' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <input type='text' defaultValue='input your number' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <input type='text' defaultValue='input your email' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Bio</dt>
            <input type='text' defaultValue='input your bio' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"></dt>
            <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
          </div>
        </dl>
      </div>
    </div>
        </MainLayout>
     );
}
 
