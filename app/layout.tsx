import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prof. Fadi Kurdahi - University of California, Irvine',
  description: 'Official webpage of Professor Fadi Kurdahi, Director at the Center for Embedded and Cyber-physical Systems (CECS)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>{children}</body>
    </html>
  )
}

