import React, { useState } from "react";
import { Link } from "react-router-dom";
import RouteName from "../../config/Route";
import InputForm from "../../components/LoginRegister/InputForm";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "@firebase/auth";

export default function RegisterSeller() {
  const { signupWithEmailPassword, setIsSeller } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Error, setError] = useState("");
  const history = useHistory();

  const Inputs = [
    {
      id: "email-address",
      name: "email",
      type: "email",
      autoComplete: "email",
      placeholder: "Email address",
      label: "Email address",
      onChange: setEmail,
    },
    {
      id: "name",
      name: "name",
      type: "text",
      autoComplete: "name",
      placeholder: "Name",
      label: "Name",
      onChange: setName,
    },
    {
      id: "phone",
      name: "phone",
      type: "text",
      autoComplete: "phone",
      placeholder: "Phone",
      label: "Phone",
      onChange: setPhone,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      autoComplete: "current-password",
      placeholder: "Password",
      label: "Password",
      onChange: setPassword,
    },
  ];

  async function Register(e) {
    e.preventDefault();
    setLoading(true);
    return signupWithEmailPassword(Email, Password, Name, Phone, true)
      .then((data) => {
        console.log("data : ", data);

        if (data.isError) {
          setError(data.message);
          setLoading(false);
        }
        const credential = EmailAuthProvider.credential(Email, Password);
        return reauthenticateWithCredential(data.user, credential);
      })
      .then((res) => {
        return res.user.getIdTokenResult();
      })
      .then((res) => {
        if (res.claims.seller) setIsSeller(true);
        return history.push("/seller/dashboard");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(err.message);
      });
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img className='mx-auto h-12 w-auto' src='/icon.png' alt='Workflow' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign up to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{" "}
            <Link
              to={RouteName.sellerLogin}
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Login here
            </Link>
          </p>
        </div>
        <div className='text-red-600'>{Error}</div>
        <form className='mt-8 space-y-6' onSubmit={Register}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            {Inputs.map((input) => (
              <InputForm key={input.id} data={input} />
            ))}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <Link
                to={RouteName.forgetPassword}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              disabled={Loading}
              type='submit'
              className='group disabled:opacity-50 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign up
            </button>
          </div>
          <div>
            <Link to={RouteName.home}>Back to home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
