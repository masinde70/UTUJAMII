import { defineQuery } from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(_createdAt desc) {
  _id, title, slug, summary, client,
  "imageUrl": mainImage.asset->url
}`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug] | order(_updatedAt desc)[0] {
  _id, title, client, body, summary, impactMetrics,
  "imageUrl": mainImage.asset->url,
  "galleryUrls": gallery[].asset->url
}`)

export const NEWS_QUERY = defineQuery(`*[_type == "news" && defined(slug.current)] | order(publishedAt desc) {
  _id, title, slug, excerpt, publishedAt,
  "imageUrl": mainImage.asset->url
}`)

export const NEWS_BY_SLUG_QUERY = defineQuery(`*[_type == "news" && slug.current == $slug] | order(_updatedAt desc)[0] {
  _id, title, publishedAt, body, excerpt,
  "imageUrl": mainImage.asset->url,
  "galleryUrls": gallery[].asset->url
}`)
