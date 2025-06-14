import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  ...rest
}) => {
  return (
    <input
      {...rest}
      value={value}
      onChange={onChange}
      className={`border text-black rounded px-3 py-2 ${
        className ?? ""
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
    />
  );
};
