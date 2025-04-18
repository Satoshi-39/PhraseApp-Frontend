import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const zenMaruGothic = localFont({
  src: "../public/fonts/Zen_Maru_Gothic/ZenMaruGothic-Regular.ttf",
  variable: "--font-zen-maru-gothic",
  display: "swap",
})

export const metadata = {
  title: "Pear - フレーズ学習アプリ",
  description: "フレーズと語彙を効率的に学習するためのアプリケーション",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} ${zenMaruGothic.variable} font-sans`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'