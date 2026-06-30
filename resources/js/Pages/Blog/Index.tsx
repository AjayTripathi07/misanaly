import { useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, BookOpen, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { type BlogPost, type BlogCategory } from '@/types';

interface CategoryWithCount extends BlogCategory {
    posts_count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedPosts {
    data: BlogPost[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    posts: PaginatedPosts;
    categories: CategoryWithCount[];
    activeCategory: string;
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function estimateReadTime(body?: string): string {
    if (!body) return '3 min read';
    const words = body.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200)) + ' min read';
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <Card className="group h-full flex flex-col overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300 rounded-2xl">
                {/* Cover image / placeholder */}
                {post.cover_image ? (
                    <div className="h-48 overflow-hidden">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <CalendarDays className="h-10 w-10 text-blue-200" />
                    </div>
                )}

                <CardContent className="flex flex-col flex-1 p-5">
                    {/* Category badge */}
                    {post.category && (
                        <div className="mb-3">
                            <Badge className="bg-blue-50 text-[#2563EB] border border-blue-100 hover:bg-blue-100 text-xs font-medium rounded-full px-2.5 py-0.5">
                                {post.category.name}
                            </Badge>
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="font-bold text-[#0F172A] text-lg leading-snug mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-[#0F172A]/60 leading-relaxed line-clamp-3 flex-1 mb-4">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 min-w-0">
                            {/* Author avatar */}
                            <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {post.author?.name?.charAt(0) ?? 'M'}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-[#0F172A] truncate">
                                    {post.author?.name ?? 'MSI Analytics'}
                                </p>
                                <p className="text-xs text-[#0F172A]/40">
                                    {post.published_at ? formatDate(post.published_at) : 'Coming soon'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-xs text-[#0F172A]/40">{estimateReadTime(post.body)}</span>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="text-xs font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function BlogIndex({ posts, categories, activeCategory }: Props) {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    function handleCategoryClick(slug?: string) {
        if (slug) {
            router.get('/blog', { category: slug }, { preserveState: true });
        } else {
            router.get('/blog', {}, { preserveState: true });
        }
    }

    // Filter pagination links to only page numbers + prev/next (strip HTML entities from label)
    const pageLinks = posts.links;

    return (
        <PublicLayout>
            <SeoHead
                title="Blog — Insights & Updates"
                description="Expert perspectives on Tally automation, software development, and business technology for growing Indian businesses."
                keywords="Tally automation blog, IT services blog, CA firm software, business technology India"
            />

            {/* ── HERO ── */}
            <section className="bg-gradient-to-br from-[#F0F7FF] via-white to-[#F8FAFC] pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        ref={heroRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <Badge className="bg-blue-50 text-[#2563EB] border border-blue-100 rounded-full px-4 py-1.5 text-sm font-medium mb-6 inline-flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5" />
                            Knowledge Hub
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] mb-5 leading-tight tracking-tight">
                            Insights &amp; Updates
                        </h1>
                        <p className="text-lg text-[#0F172A]/60 leading-relaxed">
                            Expert perspectives on Tally automation, software development, and business technology for growing Indian businesses.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── CATEGORY FILTER ── */}
            <section className="bg-white border-b border-gray-100 sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-none">
                        {/* All pill */}
                        <button
                            onClick={() => handleCategoryClick(undefined)}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                !activeCategory || activeCategory === ''
                                    ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-200'
                                    : 'bg-white border border-gray-200 text-[#0F172A]/70 hover:border-[#2563EB] hover:text-[#2563EB]'
                            }`}
                        >
                            All
                            <span className="ml-1.5 text-xs opacity-70">({posts.total})</span>
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                    activeCategory === cat.slug
                                        ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-200'
                                        : 'bg-white border border-gray-200 text-[#0F172A]/70 hover:border-[#2563EB] hover:text-[#2563EB]'
                                }`}
                            >
                                {cat.name}
                                <span className="ml-1.5 text-xs opacity-70">({cat.posts_count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── POSTS GRID ── */}
            <section className="py-14 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.data.length === 0 ? (
                        /* Empty state */
                        <div className="text-center py-20">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-blue-300" />
                            </div>
                            <h3 className="font-semibold text-[#0F172A] mb-2">More Insights Coming Soon</h3>
                            <p className="text-[#0F172A]/50 text-sm max-w-md mx-auto">
                                We're working on in-depth articles about Tally automation, software development, and business technology.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {posts.data.map((post, index) => (
                                <PostCard key={post.id} post={post} index={index} />
                            ))}
                        </div>
                    )}

                    {/* ── PAGINATION ── */}
                    {posts.last_page > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-1.5 flex-wrap">
                            {pageLinks.map((link, i) => {
                                // Strip HTML entities from label
                                const rawLabel = link.label
                                    .replace(/&laquo;/g, '‹')
                                    .replace(/&raquo;/g, '›')
                                    .replace(/&amp;/g, '&');

                                const isPrev = i === 0;
                                const isNext = i === pageLinks.length - 1;

                                if (!link.url) {
                                    return (
                                        <span
                                            key={i}
                                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm text-gray-300 cursor-not-allowed"
                                        >
                                            {isPrev ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : rawLabel}
                                        </span>
                                    );
                                }

                                return (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-[#2563EB] text-white shadow-sm'
                                                : 'bg-white border border-gray-200 text-[#0F172A]/70 hover:border-[#2563EB] hover:text-[#2563EB]'
                                        }`}
                                    >
                                        {isPrev ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : rawLabel}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
