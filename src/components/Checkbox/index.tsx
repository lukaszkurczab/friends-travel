"use client";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox = ({
  checked,
  onCheckedChange,
  className,
  children,
}: CheckboxProps) => {
  const handleCheckboxChange = () => {
    onCheckedChange(!checked);
  };
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheckboxChange()}
        className={`w-4 h-4 cursor-pointer ${className}`}
      />
      <p
        className="text-black hover:cursor-pointer"
        onClick={() => handleCheckboxChange()}
      >
        {children}
      </p>
    </div>
  );
};
