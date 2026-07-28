// ─── GULF LIFE CONCIERGE BLOG ─────────────────────────────
// Posts live here as structured data. To add a post: copy an
// existing entry, change the slug/title/blocks, and redeploy.
// Inline links inside text use [label](href) syntax.

const WP = ''
const UP = `${WP}/wp-content/uploads/2025/11`

export const SITE_URL = 'https://livegulflife.com'

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: 'Travel Guide' | 'Vacation Tips' | 'For Owners'
  image: string
  imageAlt: string
  date: string // ISO — used for sitemap + JSON-LD
  dateDisplay: string
  readMinutes: number
  keywords: string[]
  blocks: BlogBlock[]
}

export const POSTS: BlogPost[] = [
  // ────────────────────────────────────────────────────────
  // 1. BEST TIME TO VISIT 30A
  // ────────────────────────────────────────────────────────
  {
    slug: 'best-time-to-visit-30a',
    title: 'The Best Time to Visit 30A: A Month-by-Month Guide',
    metaTitle: 'Best Time to Visit 30A, Florida (Month-by-Month Guide) | Gulf Life Concierge',
    metaDescription:
      'When is the best time to visit 30A? A local month-by-month breakdown of weather, crowds, water temps, and rental rates on Scenic Highway 30A — from a 30A property management team.',
    excerpt:
      'Emerald water, sugar-white sand, and 16 beach towns — but when should you actually come? A local, month-by-month look at weather, crowds, and rental rates on 30A.',
    category: 'Travel Guide',
    image: `${UP}/GLV_header_beachfront.jpeg`,
    imageAlt: 'Beachfront view of the Gulf of Mexico along Scenic Highway 30A',
    date: '2026-06-05',
    dateDisplay: 'June 5, 2026',
    readMinutes: 7,
    keywords: ['best time to visit 30A', '30A weather by month', '30A vacation planning', 'when to visit Santa Rosa Beach'],
    blocks: [
      { type: 'p', text: 'Ask five locals when the best time to visit 30A is and you’ll get five different answers — because the honest answer depends on what you want from your trip. Warm Gulf water and full-summer energy? Empty beaches and sunset walks with no one else on the sand? Festival weekends? They all happen here, just not in the same month.' },
      { type: 'p', text: 'As a team that manages vacation rentals along Scenic Highway 30A year-round, we see every season from the inside — what guests love, what surprises them, and when the smart money books. Here’s the local’s breakdown.' },
      { type: 'h2', text: 'The Short Answer' },
      { type: 'ul', items: [
        'Best overall weather-to-crowds ratio: late April through May, and September through mid-October',
        'Warmest Gulf water: June through September (82–86°F)',
        'Lowest rates and quietest beaches: November through February',
        'Peak energy, peak prices: Memorial Day through early August',
      ]},
      { type: 'h2', text: 'Spring (March – May): The Sweet Spot Begins' },
      { type: 'p', text: 'March kicks off with spring break crowds and 60s–70s air temps. The Gulf is still cool, but pool-deck weather arrives fast. By April the crowds thin, highs hit the mid-70s, and the water starts to warm. May might be the single best month on 30A: 80-degree days, swimmable water, uncrowded restaurants, and rates that haven’t hit summer peak yet.' },
      { type: 'h2', text: 'Summer (June – August): Full Gulf Life' },
      { type: 'p', text: 'This is what the postcards show. Water temps in the mid-80s, long beach days, farmers markets, and every town from Grayton to Rosemary humming. It’s also the busiest and most expensive stretch of the year — beachfront homes book out months ahead. If summer is your window, book early and book direct. Our [beachfront rentals](/beach-front-vacation-rentals/) are usually the first to go.' },
      { type: 'quote', text: 'Local tip: June typically has calmer surf and clearer water than August, when afternoon storms are more frequent. Early summer is the underrated pick.' },
      { type: 'h2', text: 'Fall (September – October): The Locals’ Secret' },
      { type: 'p', text: 'Ask anyone who lives here — fall is when 30A shows off. The water is still 84 degrees in September, the summer crowds are gone by Labor Day, and rates drop meaningfully. October brings the 30A Songwriters events, seafood festivals, and arguably the best sunsets of the year. If you have flexibility, this is the window we recommend most often.' },
      { type: 'h2', text: 'Winter (November – February): Quiet, Cheap, and Underrated' },
      { type: 'p', text: 'Winter on 30A is mild — highs in the 60s, crisp mornings, and miles of empty white sand. It’s not swimming season, but it is the best season for value. Monthly stays, remote-work escapes, and holiday gatherings dominate. Many of our homes offer significant off-season rates, and you’ll have Seaside’s food trucks practically to yourself.' },
      { type: 'h2', text: 'Month-by-Month Cheat Sheet' },
      { type: 'ul', items: [
        'January – February: Quietest + cheapest. Highs 58–63°F. Great for long stays.',
        'March: Spring break energy. Highs ~68°F. Book pool homes early.',
        'April – May: Warm, uncrowded, pre-peak rates. Our top pick for couples.',
        'June – July: Peak season. Warmest water, fullest calendar, highest rates.',
        'August: Still hot, crowds ease mid-month as schools restart.',
        'September – October: Warm water, no crowds, falling rates. The locals’ favorite.',
        'November – December: Mild and festive. Holiday bookings fill fast.',
      ]},
      { type: 'h2', text: 'Ready to Pick Your Week?' },
      { type: 'p', text: 'Whenever you decide to come, staying in a professionally managed home means the details are handled before you arrive. Browse our [30A vacation rentals](/search-results/) or [reach out to our concierge team](/contact-us) — we’re happy to recommend the right town and the right home for the season you’re booking.' },
    ],
  },

  // ────────────────────────────────────────────────────────
  // 2. THINGS TO DO ON 30A
  // ────────────────────────────────────────────────────────
  {
    slug: 'things-to-do-on-30a',
    title: '15 Things to Do on 30A Beyond the Beach',
    metaTitle: '15 Best Things to Do on 30A (Beyond the Beach) | Gulf Life Concierge',
    metaDescription:
      'The best things to do on 30A: coastal dune lakes, bike trails, state parks, food trucks, art walks and more — a local guide from the Gulf Life Concierge team on Scenic Highway 30A.',
    excerpt:
      'The beach is why you came — but it’s not why you’ll come back. Rare coastal dune lakes, 19 miles of bike path, state parks, and food worth planning a day around.',
    category: 'Travel Guide',
    image: `${UP}/original_169210140_beach_front-e1764087084845.jpeg`,
    imageAlt: 'White sand beach and emerald Gulf water on 30A',
    date: '2026-06-16',
    dateDisplay: 'June 16, 2026',
    readMinutes: 8,
    keywords: ['things to do on 30A', '30A activities', 'coastal dune lakes', '30A bike trail', 'Seaside Florida things to do'],
    blocks: [
      { type: 'p', text: 'The sugar-white sand and emerald water are why 30A shows up on every "best beaches in America" list. But talk to guests who come back year after year and they’ll tell you: it’s everything around the beach that makes this stretch of Florida different. Here’s our team’s honest list — the things we actually send our guests to do.' },
      { type: 'h2', text: 'On the Water (That Isn’t the Gulf)' },
      { type: 'h3', text: '1. Paddle a coastal dune lake' },
      { type: 'p', text: 'There are only a handful of places on Earth with coastal dune lakes — Western Lake in Grayton Beach State Park is the postcard one. Rent a paddleboard or kayak and glide across dark, still water with white dunes on one side and pines on the other.' },
      { type: 'h3', text: '2. Watch a dune lake outfall' },
      { type: 'p', text: 'When a dune lake breaches into the Gulf, brown lake water braids into emerald surf. It’s strange and beautiful, and kids can spend hours playing in the shallow flow.' },
      { type: 'h3', text: '3. Sunset sail or dolphin cruise from Grayton' },
      { type: 'p', text: 'Book a YOLO board session, a pontoon, or a catamaran sunset sail. Dolphins show up more often than not.' },
      { type: 'h2', text: 'On Two Wheels' },
      { type: 'h3', text: '4. Ride the Timpoochee Trail' },
      { type: 'p', text: 'The 19-mile paved path runs the full length of Scenic Highway 30A, connecting every beach town. Rent bikes (most rentals deliver to your door — ask our concierge team) and spend a morning rolling from Seaside to Rosemary Beach with coffee stops on the way.' },
      { type: 'h3', text: '5. Explore Point Washington State Forest' },
      { type: 'p', text: 'Fifteen thousand acres of pine flatwoods and off-road trails, ten minutes from the beach. The Eastern Lake Trail loop is the go-to.' },
      { type: 'h2', text: 'The Towns' },
      { type: 'h3', text: '6. Seaside’s food trucks and town square' },
      { type: 'p', text: 'The Airstream food trucks along 30A in Seaside are an institution — grilled cheese at Meltdown, frosé at the beach. The farmers market runs Saturday mornings.' },
      { type: 'h3', text: '7. Rosemary Beach’s cobblestone streets' },
      { type: 'p', text: 'European lanes, boutique shopping, and coffee at Amavida while the town wakes up. Come in the evening for dinner and live music.' },
      { type: 'h3', text: '8. Grayton Beach’s old-Florida soul' },
      { type: 'p', text: '"Nice dogs, strange people" is the unofficial motto. Art galleries, the Red Bar, and the most laid-back stretch of sand on 30A.' },
      { type: 'h3', text: '9. Alys Beach’s white architecture' },
      { type: 'p', text: 'All-white Bermuda-style buildings against a blue sky — bring your camera. Grab a casual lunch at the food trucks or a serious dinner at George’s.' },
      { type: 'h2', text: 'Eat and Drink' },
      { type: 'h3', text: '10. A proper Gulf seafood dinner' },
      { type: 'p', text: 'Locals argue about the best — Café Thirty-A, FOOW in WaterColor, Stinky’s Fish Camp. You won’t go wrong with the day’s catch anywhere along the corridor.' },
      { type: 'h3', text: '11. Sunset drinks at a rooftop or beach bar' },
      { type: 'p', text: 'Pescado’s rooftop in Rosemary Beach for cocktails, the Red Bar in Grayton for character, Bud & Alley’s in Seaside for the sunset bell.' },
      { type: 'h2', text: 'Slow It Down' },
      { type: 'h3', text: '12. Sunrise walk at Deer Lake State Park' },
      { type: 'p', text: 'A boardwalk over untouched dunes and usually nobody else on it. The most underrated beach access on 30A.' },
      { type: 'h3', text: '13. Gallery-hop the 30A art scene' },
      { type: 'p', text: 'Grayton’s galleries, the Foster Gallery in Grand Boulevard, and First Friday art walks in fall and spring.' },
      { type: 'h3', text: '14. Farmers markets in Seaside and Rosemary' },
      { type: 'p', text: 'Local honey, fresh pasta, Gulf shrimp for your rental’s kitchen. Saturday in Seaside, Sunday in Rosemary Beach.' },
      { type: 'h3', text: '15. Do absolutely nothing on purpose' },
      { type: 'p', text: 'The real 30A move: a slow morning on the porch, coffee in hand, no plan at all. Our guests tell us it’s the thing they remember most.' },
      { type: 'h2', text: 'Stay in the Middle of It All' },
      { type: 'p', text: 'Every home we manage puts you minutes from this list. Browse our [vacation rentals on 30A](/search-results/), or [ask our concierge team](/contact-us) to build you an itinerary — it’s what we’re here for.' },
    ],
  },

  // ────────────────────────────────────────────────────────
  // 3. 30A TOWNS GUIDE
  // ────────────────────────────────────────────────────────
  {
    slug: '30a-towns-guide',
    title: 'Rosemary Beach vs. Seaside vs. Grayton: Which 30A Town Fits Your Stay?',
    metaTitle: 'Where to Stay on 30A: Rosemary Beach vs. Seaside vs. Grayton & More | Gulf Life Concierge',
    metaDescription:
      'Choosing where to stay on 30A? Compare Rosemary Beach, Seaside, Grayton Beach, WaterColor, Alys Beach, and Watersound — vibe, walkability, dining, and who each town suits best.',
    excerpt:
      'Sixteen beach towns share one road, and they could not be more different. A straight-shooting local comparison of 30A’s neighborhoods — and who each one is really for.',
    category: 'Travel Guide',
    image: `${UP}/original_169986477_resorts.jpeg`,
    imageAlt: 'Resort community along Scenic Highway 30A',
    date: '2026-06-27',
    dateDisplay: 'June 27, 2026',
    readMinutes: 7,
    keywords: ['where to stay on 30A', 'Rosemary Beach vs Seaside', 'best 30A town', '30A neighborhoods', 'Watersound Origins'],
    blocks: [
      { type: 'p', text: 'Here’s the thing nobody tells first-time visitors: 30A isn’t one destination. It’s sixteen distinct beach communities strung along an 18-mile road, and picking the wrong one for your group is the most common trip-planning mistake we see. The good news — there’s no bad choice, only a wrong fit. Here’s the honest local comparison.' },
      { type: 'h2', text: 'Seaside: The Icon' },
      { type: 'p', text: 'The town that started New Urbanism (and starred in The Truman Show). Pastel cottages, the amphitheater lawn, food trucks, and constant, cheerful energy. Everything is walkable and there’s always something happening.' },
      { type: 'ul', items: [
        'Best for: first-timers, families with kids, people who want to park the car and forget it',
        'Vibe: lively, photogenic, social',
        'Trade-off: it’s the busiest spot on 30A in peak season',
      ]},
      { type: 'h2', text: 'Rosemary Beach: The Romantic One' },
      { type: 'p', text: 'Cobblestone streets, Dutch-Caribbean architecture, and a slower, more polished pace. Mornings at Amavida coffee, evenings on restaurant patios. It feels like a small European town that happens to sit on the Gulf of Mexico.' },
      { type: 'ul', items: [
        'Best for: couples, anniversary trips, multi-gen groups who want elegance',
        'Vibe: upscale, intimate, beautifully planned',
        'Trade-off: quieter nightlife, premium price point',
      ]},
      { type: 'h2', text: 'Grayton Beach: The Original' },
      { type: 'p', text: 'The oldest town on 30A and proudly the least polished. Live oaks, art galleries, golf carts, and the Red Bar. Grayton Beach State Park next door has some of the most untouched coastline in Florida.' },
      { type: 'ul', items: [
        'Best for: repeat visitors, artists, anyone allergic to crowds and dress codes',
        'Vibe: old-Florida, bohemian, barefoot',
        'Trade-off: fewer shops and restaurants within walking distance',
      ]},
      { type: 'h2', text: 'WaterColor: The Family Basecamp' },
      { type: 'p', text: 'Wraps around Seaside with resort-style pools, Western Lake access, and the famous WaterColor Beach Club. Bike paths everywhere and room to breathe.' },
      { type: 'ul', items: [
        'Best for: families who want pools plus beach plus space',
        'Vibe: relaxed resort living',
        'Trade-off: you’ll bike or drive to most dinners',
      ]},
      { type: 'h2', text: 'Alys Beach: The Stunner' },
      { type: 'p', text: 'All-white masonry, courtyard homes, and Caliza — the most beautiful pool on 30A. The most architecturally striking (and most exclusive) town on the road.' },
      { type: 'ul', items: [
        'Best for: design lovers, special occasions, luxury-first trips',
        'Vibe: serene, sculptural, exclusive',
        'Trade-off: the smallest rental inventory and top-of-market rates',
      ]},
      { type: 'h2', text: 'Watersound & Inlet Beach: The Quiet End' },
      { type: 'p', text: 'The east end of 30A. Watersound’s private beach access and dunes are spectacular, Watersound Origins offers neighborhood amenities families love, and Inlet Beach delivers more house for the money minutes from Rosemary. This is where many of our guests end up — and where many decide to buy.' },
      { type: 'ul', items: [
        'Best for: families, longer stays, value-hunters who still want the 30A experience',
        'Vibe: residential, peaceful, spread out',
        'Trade-off: you’ll drive or bike to the town centers',
      ]},
      { type: 'h2', text: 'Still Torn? That’s Literally Our Job.' },
      { type: 'p', text: 'We manage homes across the 30A corridor and match groups to towns every single week. Tell us who’s coming and what a perfect day looks like, and we’ll point you to the right neighborhood — and the right house. [Browse our rentals](/search-results/) or [talk to our concierge team](/contact-us).' },
    ],
  },

  // ────────────────────────────────────────────────────────
  // 4. HOW TO CHOOSE A 30A VACATION RENTAL
  // ────────────────────────────────────────────────────────
  {
    slug: 'how-to-choose-a-30a-vacation-rental',
    title: 'How to Choose a 30A Vacation Rental: 9 Questions to Ask Before You Book',
    metaTitle: 'How to Choose a 30A Vacation Rental: 9 Questions to Ask | Gulf Life Concierge',
    metaDescription:
      'Booking a vacation rental on 30A? Ask these 9 questions first — beach access, management, hidden fees, pool heating, and more. Local advice from a 30A property management team.',
    excerpt:
      'Two listings can look identical online and deliver totally different weeks. Nine questions that separate a flawless 30A stay from an expensive disappointment.',
    category: 'Vacation Tips',
    image: `${UP}/original_169209707_private_pool-e1764190709180.jpeg`,
    imageAlt: 'Private pool at a 30A vacation rental home',
    date: '2026-07-08',
    dateDisplay: 'July 8, 2026',
    readMinutes: 6,
    keywords: ['30A vacation rental tips', 'how to choose a vacation rental', '30A private pool rental', 'vacation rental questions'],
    blocks: [
      { type: 'p', text: 'Two rental listings can show the same bedroom count, similar photos, and near-identical nightly rates — and deliver completely different vacations. After managing hundreds of stays on 30A, we know exactly where the surprises hide. Ask these nine questions before you book anywhere (including with us).' },
      { type: 'h2', text: '1. How far is the beach — really?' },
      { type: 'p', text: '"Steps to the beach" is the most abused phrase in vacation rentals. Ask for the actual walking distance in minutes, and whether the route crosses 30A. On a July afternoon with kids, chairs, and a cooler, the difference between 2 minutes and 12 matters.' },
      { type: 'h2', text: '2. Is beach access public, deeded, or private?' },
      { type: 'p', text: 'Walton County beach access is a real topic. Some neighborhoods (like Watersound) have private access; some homes come with deeded access; others rely on public accesses that can be busy in summer. Know which one your rental uses before you book.' },
      { type: 'h2', text: '3. Is the pool heated — and what does it cost?' },
      { type: 'p', text: 'A [private pool](/vacation-rentals-with-a-private-pool/) in March is only a perk if it’s heated. Ask whether heating is available, whether it’s an add-on fee, and how many days’ notice the heater needs.' },
      { type: 'h2', text: '4. Who do I call at 9pm when the AC dies?' },
      { type: 'p', text: 'This is the question that separates professionally managed homes from absentee listings. If the answer is "message the owner and hope," think twice. A local management team with staff on the ground can fix problems the same day — usually within hours.' },
      { type: 'h2', text: '5. What’s actually included in the fees?' },
      { type: 'p', text: 'Cleaning fee, resort fee, damage waiver, booking fee — ask for the all-in total, then ask what those fees buy. Starter supplies? Beach gear? Early check-in options? Fees aren’t bad; unexplained fees are.' },
      { type: 'h2', text: '6. How accurate is the bed count vs. the sleep count?' },
      { type: 'p', text: '"Sleeps 12" sometimes means eight real beds and two pull-out sofas. Get the actual bed breakdown by room — especially for groups of adults.' },
      { type: 'h2', text: '7. What’s the parking situation?' },
      { type: 'p', text: 'Many 30A homes have limited parking, and street parking is heavily enforced in most communities. Confirm how many vehicles fit before three couples drive in separately.' },
      { type: 'h2', text: '8. Are bikes, beach chairs, or setup service included?' },
      { type: 'p', text: 'Bikes are half the fun of 30A, and daily beach-chair setups sell out in peak season. Some homes include these; concierge teams (ours included) can arrange delivery before you arrive either way.' },
      { type: 'h2', text: '9. Who’s behind the listing?' },
      { type: 'p', text: 'Finally: book with someone accountable. Read the [guest reviews](/guest-reviews), check that there’s a real local team with a real phone number, and book direct when you can — it’s usually cheaper than the big platforms and always better supported.' },
      { type: 'h2', text: 'The Easy Version' },
      { type: 'p', text: 'Every Gulf Life Concierge home comes with straight answers to all nine of these questions — plus a local team on call throughout your stay. [Browse our 30A rentals](/search-results/) or [ask us anything](/contact-us) before you book.' },
    ],
  },

  // ────────────────────────────────────────────────────────
  // 5. PROPERTY MANAGEMENT (OWNER ACQUISITION)
  // ────────────────────────────────────────────────────────
  {
    slug: '30a-property-management-guide',
    title: 'What a 30A Property Management Company Actually Does (and When It Pays for Itself)',
    metaTitle: '30A Property Management: What It Costs & When It Pays Off | Gulf Life Concierge',
    metaDescription:
      'Thinking about hiring a 30A property management company for your vacation rental? What full-service management actually includes, what it costs, and the math on when it pays for itself.',
    excerpt:
      'Self-managing a 30A rental from out of state is a part-time job with 2am shifts. Here’s what professional management actually covers — and the honest math on the fee.',
    category: 'For Owners',
    image: `${UP}/AdobeStock_653632793-scaled.jpeg`,
    imageAlt: 'Luxury vacation rental home managed on 30A',
    date: '2026-07-15',
    dateDisplay: 'July 15, 2026',
    readMinutes: 8,
    keywords: ['30A property management', 'vacation rental management 30A', 'Santa Rosa Beach property management', 'vacation rental management fees'],
    blocks: [
      { type: 'p', text: 'Most 30A homeowners we talk to started the same way: bought the house, listed it themselves, and figured they’d manage it from home with a lockbox and a cleaning crew. Six months later they’re fielding a hot-tub complaint during a work meeting, chasing a cleaner who no-showed on turnover day, and wondering why their "5-bedroom near Rosemary" is renting 30% below the house two doors down.' },
      { type: 'p', text: 'This isn’t an argument that everyone needs a manager. It’s an honest breakdown of what full-service management on 30A actually involves — so you can do the math for your own property.' },
      { type: 'h2', text: 'What Full-Service Management Actually Covers' },
      { type: 'h3', text: 'Revenue management, not just listings' },
      { type: 'p', text: 'Anyone can post on Airbnb. Professional management means dynamic pricing that moves with demand — festival weekends, snowbird season, last-minute gaps — plus distribution across multiple channels and a direct-booking site that avoids platform fees. On 30A, the gap between static pricing and active revenue management is routinely 15–25% of annual gross.' },
      { type: 'h3', text: 'Guest experience, end to end' },
      { type: 'p', text: 'Marketing photos, screening, check-in instructions, mid-stay requests, 2am lockouts, and the review follow-up afterward. Reviews compound: homes that respond fast and solve problems earn the 5-star average that drives next year’s bookings.' },
      { type: 'h3', text: 'Housekeeping and inspections' },
      { type: 'p', text: 'Turnover cleaning on a summer Saturday on 30A is a logistics operation — six-hour windows, laundry volume, and a pre-arrival inspection so the first thing a guest finds isn’t the last guest’s problem.' },
      { type: 'h3', text: 'Maintenance with local vendors' },
      { type: 'p', text: 'AC failures in July, pool pumps, storm prep. A management company has vendors on call and staff nearby. From out of state, you have Google and hope.' },
      { type: 'h3', text: 'Compliance and taxes' },
      { type: 'p', text: 'Walton County short-term rental registration, Florida transient rental taxes, insurance requirements — the unglamorous work that protects the asset.' },
      { type: 'h2', text: 'The Honest Math' },
      { type: 'p', text: 'Full-service management on 30A typically runs 20–30% of rental revenue. That number scares owners until they run the real comparison:' },
      { type: 'ul', items: [
        'Revenue lift: professional pricing and multi-channel marketing typically outperforms self-managed listings by 15–25%+',
        'Time recovered: self-managing averages 8–10 hours a week in season — guest messages, scheduling, vendor calls',
        'Fewer bad reviews: fast local response is the single biggest driver of rating recovery',
        'Direct bookings: repeat guests booking direct save you both the 15%+ platform commission over time',
      ]},
      { type: 'p', text: 'For most owners renting more than a handful of weeks a year, the revenue lift alone covers most or all of the management fee — and the hours come back free.' },
      { type: 'h2', text: 'When Self-Managing Makes Sense' },
      { type: 'p', text: 'If you live locally, rent only a few peak weeks a year, and genuinely enjoy the hospitality work — self-managing can work. The owners who struggle are the ones treating a 100-night-a-year rental as a side task from three states away.' },
      { type: 'h2', text: 'Questions to Ask Any 30A Management Company' },
      { type: 'ul', items: [
        'How do you price? Ask to see dynamic pricing in action, not a rate sheet.',
        'Who answers the phone at night, and how fast do guests get help?',
        'What are your average review scores across the portfolio?',
        'How do you report owner revenue and expenses each month?',
        'What does onboarding look like, and how fast can my home be live?',
      ]},
      { type: 'h2', text: 'Talk to a Local Team' },
      { type: 'p', text: 'Gulf Life Concierge manages vacation homes across 30A and the Emerald Coast with local staff, hands-on care, and owner-first reporting. If you’re weighing your options, [see how our property management works](/property-management) or [get a free rental projection for your home](/contact-us) — no pressure, just numbers.' },
    ],
  },
]

// ─── HELPERS ──────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find(p => p.slug === slug)
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return getAllPosts().slice(0, count)
  const sameCategory = getAllPosts().filter(p => p.slug !== slug && p.category === current.category)
  const others = getAllPosts().filter(p => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, count)
}
