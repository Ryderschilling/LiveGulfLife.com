import type { MetadataRoute } from 'next'
import { getAllPosts, SITE_URL } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/property-management`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about-us`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/guest-reviews`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const postPages: MetadataRoute.Sitemap = getAllPosts().map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...postPages]
}
