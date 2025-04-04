import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../components/styles/globals.css';
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "X.com Clone",
  description: "Created X.com Clone using Next js, Exress js, and MongoDB",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
