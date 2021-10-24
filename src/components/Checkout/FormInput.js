import React from "react";

export const FormInput = ({ label, type = "text", placeholder }) => {
  switch (type) {
    case "textarea":
      return (
        <div className='mb-3'>
          <label className='mb-3 block'>{label}</label>
          <textarea
            className='w-full border border-gray-300 rounded'
            placeholder={placeholder}
            rows='6'
          ></textarea>
        </div>
      );

    default:
      return (
        <div className='mb-3'>
          <label className='mb-3 block'>{label}</label>
          <input
            className='w-full border border-gray-300 rounded'
            type={type}
            placeholder={placeholder}
          />
        </div>
      );
  }
};
