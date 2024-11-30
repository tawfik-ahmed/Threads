import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { dark } from "@clerk/themes";

export const metadata = {
  title: "Auth",
  description: "A Next.js 15 Auth Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      dynamic
      afterSignOutUrl="/sign-in"
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="flex min-h-screen w-full items-center justify-center">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
