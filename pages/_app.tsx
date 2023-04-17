import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster containerStyle={{ transform: `translateY(-2px)` }} />
      <Component {...pageProps} />
    </>
  );
}
