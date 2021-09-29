import React from "react";
import MobileUserNavLink from "./MobileUserNavLink";

export default function MobileBtnWrapper({ links, label }) {
  return (
    <div className='pt-4 pb-3 border-t border-gray-700'>
      <div className='flex items-center px-5'>
        <div className=''>
          <div className='text-base font-medium leading-none text-white'>
            {label}
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
