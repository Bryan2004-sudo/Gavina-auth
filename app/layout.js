import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Next.js Authentication App",
  description: "A modern authentication flow with social logins.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <AuthContextProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
