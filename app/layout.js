import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./common/Header";

export const metadata = {
  title: "Todo App",
  description: "Todo App task by Qtec Solution Limited",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <section className="">
          <Header />
          {children}
        </section>
      </body>
    </html>
  );
}
