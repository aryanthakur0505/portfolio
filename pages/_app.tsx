import type { AppProps } from "next/app";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
