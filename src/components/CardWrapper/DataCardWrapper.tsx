import * as React from "react";

interface DataCardWrapperProps {
  children: React.ReactNode;
}

export const DataCardWrapper: React.FC<DataCardWrapperProps> = ({
  children,
}) => {
  return (
    <div className="flex border rounded-md py-3 px-5 gap-5">{children}</div>
  );
};
