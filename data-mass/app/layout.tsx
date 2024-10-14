'use client'
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeProvider from "@/context/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html>
      <head><title>Magic Board</title></head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
