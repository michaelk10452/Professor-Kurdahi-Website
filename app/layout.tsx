import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'],
});
export const metadata: Metadata = {
  title: 'Dr. Fadi Kurdahi',
  description: 'Official webpage of Professor Fadi Kurdahi, Professor of Electrical Engineering and Computer Science at UC Irvine, Director at the Center for Embedded and Cyber-physical Systems (CECS)',
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

