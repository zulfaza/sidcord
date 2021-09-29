import React from "react";
import MobileUserNavLink from "./MobileUserNavLink";

export default function MobileUserWrapper({ user, links }) {
  return (
    <div className='pt-4 pb-3 border-t border-gray-700'>
      <div className='flex items-center px-5'>
        <div className='flex-shrink-0'>
          <img className='h-10 w-10 rounded-full' src={user.imageUrl} alt='' />
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
        {links.map((item) => (
          <MobileUserNavLink key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
