/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import NavLink from "./NavLink";
import MobileNavLink from "./MobileNavLink";
import MobileUserNavLink from "./MobileUserNavLink";
import ProfileDropDown from "./ProfileDropDown";
import { Link } from "react-router-dom";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Navbar() {
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
                      className='h-8 w-8'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
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
                  <ProfileDropDown
                    userNavigation={userNavigation}
                    user={user}
                  />
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
            <div className='pt-4 pb-3 border-t border-gray-700'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src={user.imageUrl}
                    alt=''
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium leading-none text-white'>
                    {user.name}
                  </div>
                  <div className='text-sm font-medium leading-none text-gray-400'>
                    {user.email}
                  </div>
                </div>
              </div>
              <div className='mt-3 px-2 space-y-1'>
                {userNavigation.map((item) => (
                  <MobileUserNavLink key={item.name} item={item} />
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
