import { updateProfile } from "@firebase/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import API_URL from "../../config/API";
import { useAuth } from "../../contexts/AuthContext";

export default function EditProfile() {
  const { currentUser } = useAuth();
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Bio, setBio] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    currentUser
      .getIdToken()
      .then((token) => {
        const config = {
          headers: {
            authentication: token,
          },
        };
        return axios.get(API_URL + "/customers/" + currentUser.uid, config);
      })
      .then((res) => {
        if (res.data.code === 200) {
          const { name, phone, bio } = res.data.data.customer;
          setBio(bio);
          setName(name);
          setPhone(phone);
        }
        setLoading(false);
      });
  }, [currentUser]);

  async function updateProfileCustomer(e) {
    e.preventDefault();
    const updateProfileInFirebase = await updateProfile(currentUser, {
      displayName: Name,
    })
      .then(() => ({ isError: false }))
      .catch((err) => ({ isError: true, error: err }));

    if (updateProfileInFirebase.isError) {
      console.log(updateProfileInFirebase.error);
      return;
    }

    const token = await currentUser.getIdToken();

    const config = {
      headers: {
        authentication: token,
      },
    };

    const request = {
      name: Name,
      bio: Bio,
      phone: Phone,
    };

    setLoading(true);

    return axios
      .put(API_URL + "/customers/" + currentUser.uid, request, config)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <MainLayout>
      <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Edit Profile User
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Personal details.
          </p>
        </div>
        <form
          onSubmit={updateProfileCustomer}
          className='border-t border-gray-200'
        >
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Full name</dt>
              <input
                type='text'
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'
              />
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Phone Number
              </dt>
              <input
                type='text'
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'
              />
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Bio</dt>
              <input
                type='text'
                value={Bio}
                onChange={(e) => setBio(e.target.value)}
                className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'
              />
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'></dt>
              <button
                disabled={Loading}
                type='submit'
                className='disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save
              </button>
            </div>
          </dl>
        </form>
      </div>
    </MainLayout>
  );
}
