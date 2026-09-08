import { useEffect } from 'react'
import site from '../data/site.json'

function upsertMeta(attr, key, content) {
  if (content === undefined || content === null || content === '') return
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', String(content))
}

function upsertLink(rel, href) {
  if (!href) return
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function absoluteUrl(base, path) {
  if (!base || !path) return ''
  try {
    return new URL(path, base).href
  } catch {
    return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
  }
}

function resolveSiteUrl(configured) {
  // Prefer the host the page is actually served from so og:image matches the shared link.
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/`
  }
  return configured || ''
}

export function Seo() {
  useEffect(() => {
    const { seo, name } = site
    const pageTitle = seo?.title || `${name} — ${site.role}`
    const description = seo?.description || site.intro
    const url = resolveSiteUrl(seo?.siteUrl)
    const image = absoluteUrl(url, seo?.ogImage)
    const imageAlt = seo?.ogImageAlt || pageTitle
    const keywords = Array.isArray(seo?.keywords) ? seo.keywords.join(', ') : ''

    document.title = pageTitle
    document.documentElement.lang = 'en'

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', keywords)
    upsertMeta('name', 'author', name)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    upsertMeta('name', 'googlebot', 'index, follow')
    upsertMeta('name', 'theme-color', '#0b0b0c')

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', name)
    upsertMeta('property', 'og:title', pageTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:locale', seo?.locale || 'en_US')
    if (url) upsertMeta('property', 'og:url', url)
    if (image) {
      upsertMeta('property', 'og:image', image)
      upsertMeta('property', 'og:image:type', 'image/png')
      upsertMeta('property', 'og:image:width', seo?.ogImageWidth || 1200)
      upsertMeta('property', 'og:image:height', seo?.ogImageHeight || 630)
      upsertMeta('property', 'og:image:alt', imageAlt)
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', pageTitle)
    upsertMeta('name', 'twitter:description', description)
    if (image) {
      upsertMeta('name', 'twitter:image', image)
      upsertMeta('name', 'twitter:image:alt', imageAlt)
    }
    if (seo?.twitterHandle) upsertMeta('name', 'twitter:creator', seo.twitterHandle)

    if (url) upsertLink('canonical', url)
  }, [])

  return null
}
