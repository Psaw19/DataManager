import React, { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-2.5 h-full", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
