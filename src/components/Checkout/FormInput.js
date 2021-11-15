import React from "react";

export const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onchange,
  name,
  options = [],
}) => {
  switch (type) {
    case "select":
      return (
        <div className='mb-3'>
          <label className='mb-3 block'>{label}</label>
          <select
            value={value}
            name={name}
            onChange={onchange}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            {options.map((option, index) => (
              <option
                key={index}
                value={option.value}
                disabled={option.isDisabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
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
