import React from "react";

interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: React.ReactNode;
}

export const Tile: React.FC<TileProps> = ({
  title,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 h-[150] w-[250] ${
        className ?? ""
      }`}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};
