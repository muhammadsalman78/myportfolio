import { useEffect } from 'react'
import site from '../data/site.json'

function upsertMeta(attr, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
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

export function Seo() {
  useEffect(() => {
    const { seo, name, role, email, phone, social } = site
    const pageTitle = seo?.title || `${name} — ${role}`
    const description = seo?.description || site.intro
    const url = seo?.siteUrl || ''
    const image = seo?.ogImage ? `${url}${seo.ogImage}` : ''
    const keywords = Array.isArray(seo?.keywords) ? seo.keywords.join(', ') : ''

    document.title = pageTitle

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
    if (image) upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', pageTitle)
    upsertMeta('name', 'twitter:description', description)
    if (image) upsertMeta('name', 'twitter:image', image)
    if (seo?.twitterHandle) upsertMeta('name', 'twitter:creator', seo.twitterHandle)

    if (url) upsertLink('canonical', url)

    const linkedIn = social.find((item) => item.label.toLowerCase() === 'linkedin')?.href
    const sameAs = [linkedIn, url].filter(Boolean)

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': url ? `${url}/#website` : undefined,
          url: url || undefined,
          name: pageTitle,
          description,
          inLanguage: 'en',
          publisher: { '@id': url ? `${url}/#person` : undefined },
        },
        {
          '@type': 'Person',
          '@id': url ? `${url}/#person` : undefined,
          name,
          jobTitle: role,
          description: site.intro,
          email,
          telephone: phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Karachi',
            addressCountry: 'PK',
          },
          url: url || undefined,
          sameAs,
          knowsAbout: [
            'React Native',
            'React',
            'Vue.js',
            'Tauri',
            'Fintech',
            'Firebase',
            'Mobile app development',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'K-Labs',
          },
        },
        {
          '@type': 'ProfilePage',
          '@id': url ? `${url}/#profile` : undefined,
          url: url || undefined,
          name: pageTitle,
          description,
          about: { '@id': url ? `${url}/#person` : undefined },
          mainEntity: { '@id': url ? `${url}/#person` : undefined },
        },
      ],
    }

    let script = document.getElementById('seo-json-ld')
    if (!script) {
      script = document.createElement('script')
      script.id = 'seo-json-ld'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)

    document.documentElement.lang = 'en'
  }, [])

  return null
}
