/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import NavLink from "./NavLink";
import MobileNavLink from "./MobileNavLink";
import ProfileDropDown from "./ProfileDropDown";
import { Link } from "react-router-dom";
import RouteName from "../../config/Route";
import { useAuth } from "../../contexts/AuthContext";
import BtnLoginRegister from "./BtnLoginRegister";
import MobileUserWrapper from "./MobileUserWrapper";
import MobileBtnWrapper from "./MobileBtnWrapper";

export default function Navbar() {
  const { currentUser, IsSeller, logout } = useAuth();
  const user = {
    name: currentUser?.displayName,
    email: currentUser?.email,
    imageUrl: currentUser?.photoURL,
  };

  const navigation = [];

  const btnSeller = [
    { name: "Login", href: RouteName.sellerLogin },
    { name: "Register", href: RouteName.sellerRegister },
  ];

  const btnUser = [
    { name: "Login", href: RouteName.login },
    { name: "Register", href: RouteName.register },
  ];

  const userNavigation = [
    { name: "Your Profile", href: "/customer/edit-profile" },
    { name: "Cart", href: "/customer/shopping-cart" },
    { name: "Track order", href: "/customer/tracking-order" },
    { name: "Sign out", href: "#", onClick: logout },
  ];

  const sellerNavigation = [
    { name: "Dashboard", href: "/seller/dashboard" },
    { name: "Your Profile", href: "/seller/edit-profile" },
    { name: "Order Info", href: "/seller/order-info" },
    { name: "Sign out", href: "#", onClick: logout },
  ];

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <Link to='/'>
                    <img
                      className='h-8 w-auto'
                      src='/Logo-SIdcord-Web.png'
                      alt='Workflow'
                    />
                  </Link>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        name={item.name}
                        url={item.href}
                        current={item.current}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  {currentUser ? (
                    <ProfileDropDown
                      userNavigation={
                        IsSeller ? sellerNavigation : userNavigation
                      }
                      user={user}
                    />
                  ) : (
                    <>
                      <BtnLoginRegister
                        links={btnSeller}
                        label='Seller'
                        className='border-2 border-white text-white px-4 py-2 hover:bg-white hover:text-gray-800 transition-colors bg-gray-800 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                      />
                      <BtnLoginRegister
                        links={btnUser}
                        label='Customer'
                        className='border-2 border-white hover:text-white px-4 py-2 bg-white text-gray-800 transition-colors hover:bg-gray-800 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                      />
                    </>
                  )}
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navigation.map((item) => (
                <MobileNavLink
                  key={item.name}
                  name={item.name}
                  url={item.href}
                  current={item.current}
                />
              ))}
            </div>
            {currentUser ? (
              <MobileUserWrapper
                user={user}
                links={IsSeller ? sellerNavigation : userNavigation}
              />
            ) : (
              <>
                <MobileBtnWrapper links={btnSeller} label='Seller' />
                <MobileBtnWrapper links={btnUser} label='Customer' />
              </>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
