// pages/_app.js
import '../styles/globals.css'; // This file should include Tailwind setup

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
