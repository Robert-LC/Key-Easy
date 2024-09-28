import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Key Easy 🎹',
  description: 'Learn scales with Key Easy!'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html id='app' className='h-screen' lang='en'>
      <body className={(inter.className, 'flex flex-col h-full')}>
        <Navbar />
        <main className='flex flex-col h-full justify-center'>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
