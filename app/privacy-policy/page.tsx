import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Privacy Policy | Gulf Life Concierge',
  description:
    'How Gulf Life Concierge collects, uses and protects the information you share when you browse our vacation rentals or book a stay on 30A.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      slug="privacy-policy"
      heading="Privacy Policy"
      kicker="How we handle the information you share with us"
    />
  )
}
