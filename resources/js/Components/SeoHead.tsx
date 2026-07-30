import { Head, usePage } from '@inertiajs/react';

interface SeoHeadProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
}

const SITE_NAME = 'NobelIQ Technologies';
const DEFAULT_OG_IMAGE = '/images/og-default.jpg';
// Place a 1200×630 px image at public/images/og-default.jpg to activate the default OG image.

/**
 * Current deployment's origin (protocol + host), read from the browser at render
 * time. No SSR is configured, so this always resolves to the domain the page was
 * actually served from — local, staging, or production — with nothing hardcoded.
 */
export function getSiteOrigin(): string {
    return typeof window !== 'undefined' ? window.location.origin : '';
}

export default function SeoHead({
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
}: SeoHeadProps) {
    const { url } = usePage();
    const fullTitle = `${title} | ${SITE_NAME}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;
    const origin = getSiteOrigin();
    const resolvedCanonical = canonicalUrl ?? (origin ? `${origin}${url.split('?')[0]}` : undefined);

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {resolvedCanonical && <meta property="og:url" content={resolvedCanonical} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
