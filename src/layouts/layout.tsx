import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="min-h-screen dark text-gray-900 dark:text-white h-100">
      {children}
    </div>
  );
};

export default RootLayout;
