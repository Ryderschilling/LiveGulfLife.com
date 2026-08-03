import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

// Pull fresh from WordPress hourly. An edit to the rental agreement shows up on
// the site without a deploy.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Terms & Conditions | Gulf Life Concierge',
  description:
    'The full rental agreement for Gulf Life Concierge vacation homes on 30A and the Emerald Coast, including our payment, cancellation, occupancy and property policies.',
  alternates: { canonical: '/terms-and-conditions' },
}

export default function TermsPage() {
  return (
    <LegalPage
      slug="terms-and-conditions"
      heading="Terms & Conditions"
      kicker="Rental agreement, payment and cancellation policy"
      summary={[
        'All payments are nonrefundable. Travel insurance is offered at the time of booking and we strongly recommend it.',
        'Outside 60 days from arrival, a deposit reserves the home and the balance is charged automatically 60 days before you arrive.',
        'Cancel within 60 days of arrival and all payments are forfeited. If we rebook your dates, 75% of what we recover is credited toward a future stay.',
        'No parties, no smoking, and quiet hours run 10:00 PM to 7:00 AM. Maximum occupancy is enforced.',
        'Check-out is no later than 10:00 AM. A valid credit card stays on file for damage, missing items and excessive cleaning.',
      ]}
    />
  )
}
