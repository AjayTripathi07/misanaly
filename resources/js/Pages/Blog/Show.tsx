import { useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import { motion, useInView } from 'framer-motion';
import {
    CalendarDays,
    ArrowLeft,
    Clock,
    ExternalLink,
    Link2,
    Check,
    ChevronRight,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { type BlogPost } from '@/types';

interface Props {
    post: BlogPost;
    related: BlogPost[];
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function estimateReadTime(body: string): string {
    const words = body.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200)) + ' min read';
}

function RelatedCard({ post }: { post: BlogPost }) {
    return (
        <Card className="group h-full flex flex-col overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300 rounded-2xl">
            {post.cover_image ? (
                <div className="h-44 overflow-hidden">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            ) : (
                <div className="h-44 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <CalendarDays className="h-8 w-8 text-blue-200" />
                </div>
            )}
            <CardContent className="flex flex-col flex-1 p-5">
                {post.category && (
                    <Badge className="mb-2 w-fit bg-blue-50 text-[#2563EB] border border-blue-100 text-xs rounded-full">
                        {post.category.name}
                    </Badge>
                )}
                <h3 className="font-bold text-[#0F172A] text-base leading-snug mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2 flex-1">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-[#0F172A]/55 line-clamp-2 mb-4">{post.excerpt}</p>
                <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 mt-auto"
                >
                    Read Article <ChevronRight className="h-3 w-3" />
                </Link>
            </CardContent>
        </Card>
    );
}

export default function BlogShow({ post, related }: Props) {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });
    const bodyRef = useRef<HTMLDivElement>(null);
    const bodyInView = useInView(bodyRef, { once: true, margin: '-80px' });
    const [copied, setCopied] = useState(false);

    const readTime = estimateReadTime(post.body ?? '');

    function handleCopyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <PublicLayout>
            <SeoHead
                title={post.title}
                description={post.excerpt}
                ogImage={post.cover_image ?? undefined}
            />
            <Head>
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: post.title,
                    description: post.excerpt,
                    datePublished: post.published_at,
                    dateModified: post.published_at,
                    author: {
                        '@type': 'Person',
                        name: post.author?.name ?? 'MSI Analytics',
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'MSI Analytics',
                        url: 'https://misanaly.in',
                    },
                    ...(post.cover_image ? { image: post.cover_image } : {}),
                })}</script>
            </Head>

            {/* ── HERO ── */}
            <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-24 pb-16 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back link */}
                    <motion.div
                        ref={heroRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4 }}
                        className="mb-8"
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Posts
                        </Link>
                    </motion.div>

                    {/* Category badge */}
                    {post.category && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-4"
                        >
                            <Badge className="bg-[#2563EB]/20 text-blue-300 border border-blue-700/30 rounded-full text-xs px-3 py-1">
                                {post.category.name}
                            </Badge>
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Meta row */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="flex flex-wrap items-center gap-4 text-sm text-white/50"
                    >
                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
                                {post.author?.name?.charAt(0) ?? 'M'}
                            </div>
                            <span className="text-white/70">{post.author?.name ?? 'MSI Analytics'}</span>
                        </div>
                        <span className="text-white/20">·</span>
                        {/* Date */}
                        {post.published_at && (
                            <>
                                <span className="flex items-center gap-1">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {formatDate(post.published_at)}
                                </span>
                                <span className="text-white/20">·</span>
                            </>
                        )}
                        {/* Read time */}
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {readTime}
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* ── COVER IMAGE ── */}
            {post.cover_image ? (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full max-h-96 object-cover rounded-2xl shadow-2xl shadow-[#0F172A]/20"
                    />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100/50">
                        <CalendarDays className="h-14 w-14 text-blue-200" />
                    </div>
                </div>
            )}

            {/* ── ARTICLE BODY ── */}
            <section className="py-14">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.article
                        ref={bodyRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div
                            className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0F172A] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0F172A] [&_h3]:mt-8 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#0F172A] [&_h4]:mt-6 [&_h4]:mb-2 [&_p]:text-[#0F172A]/70 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:text-[#0F172A]/70 [&_li]:text-base [&_li]:leading-relaxed [&_li]:mb-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#2563EB] [&_blockquote]:pl-5 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-[#0F172A]/60 [&_blockquote]:my-6 [&_a]:text-[#2563EB] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#1D4ED8] [&_hr]:my-8 [&_hr]:border-gray-200 [&_strong]:text-[#0F172A] [&_strong]:font-semibold [&_code]:bg-gray-100 [&_code]:text-[#0F172A] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6 [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                        />
                    </motion.article>

                    {/* ── AUTHOR BIO CARD ── */}
                    <div className="mt-14 p-6 bg-white border border-gray-100 rounded-2xl flex items-start gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                            {post.author?.name?.charAt(0) ?? 'M'}
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-[#0F172A]/40 mb-0.5 font-medium">Written by</p>
                            <p className="font-bold text-[#0F172A] text-base">{post.author?.name ?? 'MSI Analytics'}</p>
                            <p className="text-sm text-[#0F172A]/50 mt-0.5">MSI Analytics Team</p>
                        </div>
                    </div>

                    {/* ── SHARE BUTTONS ── */}
                    <div className="mt-10 pt-8 border-t border-gray-100">
                        <p className="text-sm font-semibold text-[#0F172A] mb-4">Share this article</p>
                        <div className="flex items-center gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-[#0F172A]/70 hover:border-[#1D9BF0] hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/5 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Twitter / X
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-[#0F172A]/70 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                                LinkedIn
                            </a>
                            <button
                                onClick={handleCopyLink}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-[#0F172A]/70 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-green-600">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Link2 className="h-4 w-4" />
                                        Copy Link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── RELATED POSTS ── */}
            {related.length > 0 && (
                <section className="py-14 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {related.map((relPost) => (
                                <RelatedCard key={relPost.id} post={relPost} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── BOTTOM CTA ── */}
            <section className="bg-[#2563EB] py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Need help with technology for your business?
                    </h2>
                    <p className="text-blue-100 mb-8 text-base leading-relaxed">
                        Let's discuss how MSI Analytics can streamline your operations with custom software and automation.
                    </p>
                    <Link href="/get-quote">
                        <Button
                            size="lg"
                            className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 font-semibold shadow-lg shadow-blue-900/20 transition-all duration-200"
                        >
                            Get a Quote
                        </Button>
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
