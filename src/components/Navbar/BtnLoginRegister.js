import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import UserNavLink from "./UserNavLink";

export default function BtnLoginRegister({ links, label, className }) {
  return (
    <Menu as='div' className='ml-3 relative'>
      <div>
        <Menu.Button className={className}>{label}</Menu.Button>
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
          {links.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => <UserNavLink item={item} active={active} />}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
