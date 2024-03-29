import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Key Easy 🎹',
  description: 'Learn scales, chords, and theory with Key Easy!'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
