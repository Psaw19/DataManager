import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  heading: string;
  subHeading: string;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  heading,
  subHeading,
}) => {
  return (
    <Card className="w-[50%] h-min max-w-[450px] py-4">
      <CardHeader className="px-6 py-4">
        <CardTitle>{heading}</CardTitle>
        <CardDescription>{subHeading}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
