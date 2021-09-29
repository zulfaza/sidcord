import React from "react";
import { Link } from "react-router-dom";
import classNames from "../../utils/ClassNames";

export default function UserNavLink({ item, active }) {
  function handleOnClick(e) {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  }

  return (
    <Link
      onClick={handleOnClick}
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
