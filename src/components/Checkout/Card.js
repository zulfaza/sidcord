import React from "react";

export default function Card({ children }) {
  return (
    <div className='py-4 px-5 shadow my-2 border rounded-xl'>{children}</div>
  );
}
