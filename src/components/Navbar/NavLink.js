import React from "react";
import { Link } from "react-router-dom";
import classNames from "../../utils/ClassNames";

export default function NavLink({ name, url, current }) {
  return (
    <Link
      to={url}
      className={classNames(
        current
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium"
      )}
      aria-current={current ? "page" : undefined}
    >
      {name}
    </Link>
  );
}
