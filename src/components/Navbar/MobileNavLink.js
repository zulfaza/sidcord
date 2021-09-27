import React from "react";
import { Link } from "react-router-dom";
import classNames from "../../utils/ClassNames";

export default function MobileNavLink({ name, current, url }) {
  return (
    <Link
      to={url}
      className={classNames(
        current
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "block px-3 py-2 rounded-md text-base font-medium"
      )}
      aria-current={current ? "page" : undefined}
    >
      {name}
    </Link>
  );
}
