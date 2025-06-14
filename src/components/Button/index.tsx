import { twMerge } from "tailwind-merge";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "text";
  }
> = ({ children, className, variant = "default", ...props }) => {
  const baseStyles = "px-4 py-2 rounded";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    text: "text-blue-500 hover:underline",
  };

  return (
    <button
      {...props}
      className={twMerge(`${baseStyles} ${variants[variant]} ${className}`)}
    >
      {children}
    </button>
  );
};
