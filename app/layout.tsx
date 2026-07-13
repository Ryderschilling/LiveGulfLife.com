import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Josefin_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import CustomCursor from '@/components/CustomCursor'
import FloatingConcierge from '@/components/FloatingConcierge'

// Plus Jakarta Sans — cleaner, more distinctive than Outfit. Same modern sans vibe.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-outfit',   // keeping CSS var name so no other files need to change
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Josefin Sans — geometric like Montserrat but more refined. Perfect for small caps labels.
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-montserrat', // keeping CSS var name so no other files need to change
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
