import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReduxProvider } from '@/redux/provider'

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
    <html lang='en'>
      <body className={(inter.className, 'flex flex-col justify-between h-screen')}>
        <Navbar />
        <ReduxProvider>
          <main className='flex-grow'>{children}</main>
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
