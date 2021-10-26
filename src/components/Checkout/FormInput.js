import React from "react";

export const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onchange,
  name,
}) => {
  switch (type) {
    case "textarea":
      return (
        <div className='mb-3'>
          <label className='mb-3 block'>{label}</label>
          <textarea
            defaultValue={value}
            onChange={onchange}
            className='w-full border border-gray-300 rounded'
            placeholder={placeholder}
            name={name}
            rows='6'
          ></textarea>
        </div>
      );

    default:
      return (
        <div className='mb-3'>
          <label className='mb-3 block'>{label}</label>
          <input
            defaultValue={value}
            onChange={onchange}
            className='w-full border border-gray-300 rounded'
            type={type}
            placeholder={placeholder}
            name={name}
          />
        </div>
      );
  }
};
