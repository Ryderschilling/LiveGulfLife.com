import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Josefin_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import CustomCursor from '@/components/CustomCursor'
import FloatingConcierge from '@/components/FloatingConcierge'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Gulf Life Concierge | 30A & Destin Vacation Rentals',
  description:
    'Experience the Gulf Life with Gulf Life Concierge. Premium vacation rentals and property management on 30A and the Emerald Coast.',
  icons: {
    icon: 'https://livegulflife.com/wp-content/uploads/2025/11/gulf-life-concierge-favicon.png',
  },
}

// Next.js 14: viewport MUST be a separate export — NOT inside metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${josefinSans.variable}`}>
      <body>
        <Loader />
        <CustomCursor />
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingConcierge />
      </body>
    </html>
  )
}
