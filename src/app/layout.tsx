import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "@/app/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/components/Providers/session-provider";
import { ThemeProvider } from "@/components/Providers/theme-provider";

export const metadata: Metadata = {
  title: "Notes and Password Manager",
  description: "Store your data securely",
  icons: [
    {
      rel: "icon",
      type: "image/svg",
      url: "/icon-dark.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/svg",
      url: "/icon-dark.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-[100dvh] overflow-x-hidden">
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
