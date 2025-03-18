import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "./storeProvider";
import { Toaster } from "sonner";
// import { Toaster } from "@/components/ui/sonner"
// import { getMessages } from "next-intl/server";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  // const { locale } = await params;
  // // Ensure that the incoming `locale` is valid
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // if (!routing.locales.includes(locale as any)) {
  //   notFound();
  // }
  // const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <NextIntlClientProvider> */}
        <StoreProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster/>
        </ThemeProvider>
        </StoreProvider>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
