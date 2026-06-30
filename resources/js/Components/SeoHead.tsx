import { Head } from '@inertiajs/react';

interface SeoHeadProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
}

const SITE_NAME = 'MSI Analytics';
const DEFAULT_OG_IMAGE = '/images/og-default.jpg';
// Place a 1200×630 px image at public/images/og-default.jpg to activate the default OG image.

export default function SeoHead({
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
}: SeoHeadProps) {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
