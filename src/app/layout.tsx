import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "../components/Providers/session-provider";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Notes and Password Manager",
  description: "Store your data securely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <div className="w-full h-[90%]">
              <Toaster />
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
