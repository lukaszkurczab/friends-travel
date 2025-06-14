import React from "react";

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={`flex flex-wrap gap-4 ${className ?? ""}`}>
      {children}
    </div>
  );
};
