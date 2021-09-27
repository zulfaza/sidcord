import React from "react";
import { Link } from "react-router-dom";

export default function MobileUserNavLink({ item }) {
  return (
    <Link
      to={item.href}
      className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
    >
      {item.name}
    </Link>
  );
}
