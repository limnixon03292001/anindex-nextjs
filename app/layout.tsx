"use client"

import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Metadata } from 'next'
import NextNProgress from 'nextjs-progressbar'

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
        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={10} showOnShallow={true} />
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
