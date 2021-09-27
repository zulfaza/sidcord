import React from "react";
import { Link } from "react-router-dom";
import classNames from "../../utils/ClassNames";

export default function UserNavLink({ item, active }) {
  return (
    <Link
      to={item.href}
      className={classNames(
        active ? "bg-gray-100" : "",
        "block px-4 py-2 text-sm text-gray-700"
      )}
    >
      {item.name}
    </Link>
  );
}
