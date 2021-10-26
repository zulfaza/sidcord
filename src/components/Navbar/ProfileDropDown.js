import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import UserNavLink from "./UserNavLink";

export default function ProfileDropDown({ user, userNavigation }) {
  const { CartNumber = 0 } = useCart();
  const { IsSeller } = useAuth();

  return (
    <Menu as='div' className='ml-3 relative'>
      <div>
        <Menu.Button className='relative max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
          <span className='sr-only'>Open user menu</span>
          <img className='h-8 w-8 rounded-full' src={user.imageUrl} alt='' />
          {!IsSeller && (
            <span className='absolute -top-2 -right-3 bg-white px-1.5 rounded-full'>
              {CartNumber}
            </span>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 '>
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => <UserNavLink item={item} active={active} />}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
