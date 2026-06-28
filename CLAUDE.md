# Grol Media — Project Notes

## Brand / visual system
- Black background (`hsl(0 0% 0%)`), white foreground, `muted-foreground` = `hsl(0 0% 65%)`.
- Fonts: Inter (sans) + Instrument Serif (italic accent for emphasis words in headlines).
- Shared CSS: `assets/grol-pages.css`. Particles: `assets/particles.js`. Image slots: `assets/image-slot.js`.
- GA4 tag id: `G-9TG3KL4B4D` (in every page head).
- Calendly: `https://calendly.com/grolmedia-agency/30min`.
- Company: Grol Media · Bulgaria. Privacy: `Privacy Policy.html`.
- Use normal hyphens `-`, never long dashes (—). Particle draw alpha is multiplied by 0.55 (kept subtle).

## BLOG POST SEO CHECKLIST — apply to EVERY blog post from now on
When writing or editing any blog article, follow this on-page SEO checklist (from the client's SEO spec):

### 1. Head & metadata
- Title tag 50–60 chars, primary keyword near the start.
- Meta description 150–160 chars: keyword + benefit + soft CTA.
- Canonical URL (`<link rel="canonical">`) to prevent duplicates.
- Open Graph: og:title, og:description, og:image (1200×630, under 1 MB), og:url, og:type=article.
- Twitter Card: summary_large_image + title, description, image.
- `lang="en"` on `<html>`, viewport meta, favicon + apple-touch-icon, charset meta.

### 2. URL structure
- Short slug under 60 chars, lowercase, hyphens only (never underscores), primary keyword in slug, no stop words. Pattern `/blog/[slug]`.

### 3. Headings
- Exactly one H1 (contains primary keyword). Logical H2→H3, never skip levels. H2s use supporting keywords + cluster questions. No keyword stuffing.

### 4. Copy & body
- Primary keyword in first 100 words. Direct answer to the query in the first paragraph. Length matches SERP average (1500+ words for pillar posts).

### 5. FAQ section (every post)
- 4–8 real questions (People-Also-Ask style), direct answers 2–4 sentences each, + FAQ schema (JSON-LD).

### 6. Images = ranking signals
- Alt text describes image + keyword where natural. Descriptive hyphenated filenames. WebP, compressed. Width/height attributes (prevents CLS). `loading="lazy"` for below-fold. Featured/hero image for social sharing.

### 7. Internal links
- 3–5 internal links per post. Link to related posts + relevant service pages (meta-ads-for-saas, email-flows, product-advice). Descriptive anchor text — never "click here"/"read more". Contextually placed. Breadcrumbs on every page.

### 8. External links
- 2–3 links to authoritative sources (.gov, .edu, major industry). Relevant to topic. Open in new tab with `rel="noopener"` (add `nofollow` for sponsored).

### 9. Schema markup (JSON-LD in head)
- Article schema on posts. Organization schema site-wide. BreadcrumbList on every page. FAQ schema where FAQ exists. Author/Person schema for bylines.

### 10. E-E-A-T signals
- Author byline with name. Author bio with credentials. Published date displayed. "Last updated" date when refreshed. Real stories/numbers/opinions. Cite authoritative sources.

### 11. Accessibility (= SEO signals)
- Semantic HTML5 (header/nav/main/article/footer). ARIA labels where needed. WCAG AA contrast. Visible focus indicators. Alt text on all images (empty alt="" for decorative). Descriptive link text. Skip-to-content link.

### 12. Mobile
- Responsive layout. Touch targets ≥48×48px. Body font ≥16px. No horizontal scroll. No intrusive interstitials.

### 13. Long-form posts
- Table of contents with anchor links at top. Jump links for each H2. Back-to-top button.
