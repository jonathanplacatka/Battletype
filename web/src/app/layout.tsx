import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import "./globals.css";
import Header from "./components/PageLayout/Header";
import Footer from "./components/PageLayout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Battletype",
  description: "Welcome to Battletype!",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
		<head>
			<ColorSchemeScript defaultColorScheme="dark"/>
		</head>

      <body className={`${inter.className} flex flex-col min-h-screen`}  >
			<MantineProvider defaultColorScheme="dark">
				<Header/>				
				<main className="flex-grow">
					{children}
				</main>
				<Footer/>
			</MantineProvider>
		</body>
    </html>
  );
}
