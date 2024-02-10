import "styles/globals.css";
import RootLayout from "layouts/layout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <div className="min-h-screen">
        <Component {...pageProps} />
      </div>
    </RootLayout>
  );
}

export default MyApp;
