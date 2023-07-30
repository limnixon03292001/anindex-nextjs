

import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anindex',
  description: 'Find and track your favorite anime!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
