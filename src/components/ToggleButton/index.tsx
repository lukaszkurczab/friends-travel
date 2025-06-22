import React from "react";

interface ToggleButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleButton = ({
  checked,
  onChange,
  className,
  ...rest
}: ToggleButtonProps) => {
  return (
    <label
      className={`inline-flex items-center cursor-pointer ${className ?? ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...rest}
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-all" />
      <div className="absolute w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-transform" />
    </label>
  );
};
