import './globals.css'
import type { Metadata } from 'next'
import { Fraunces, Inter_Tight } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fadi Kurdahi',
  description:
    'Fadi Kurdahi — Distinguished Professor of Electrical Engineering and Computer Science, UC Irvine.',
}

const themeBootstrap = `
(function() {
  try {
    var t = localStorage.getItem('fk-theme-c');
    document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
    var a = localStorage.getItem('fk-accent-c');
    if (a) document.documentElement.style.setProperty('--accent', a);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`} data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
