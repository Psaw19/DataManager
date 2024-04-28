"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
      variant="link"
      className="dark:focus-visible:ring-offset-0 dark:focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
