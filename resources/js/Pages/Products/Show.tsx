import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import {
    CheckCircle2, Check, ArrowRight, ArrowLeft, MonitorPlay,
    Download, Play, ChevronDown, Shield, Monitor, Star,
    ChevronUp, ChevronRight, Zap, Database, FileText,
} from 'lucide-react';

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface ProductFeature {
    id: number;
    title: string;
    description: string;
    icon: string | null;
}

interface ProductPricingTier {
    id: number;
    name: string;
    price: string | null;
    features_json: string[];
    is_popular: boolean;
}

interface ProductScreenshot {
    id: number;
    image_path: string;
    caption: string | null;
    sort_order: number;
}

interface Faq {
    id: number;
    question: string;
    answer: string;
}

interface Product {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    pricing_model: string;
    demo_url: string | null;
    features: ProductFeature[];
    pricing_tiers: ProductPricingTier[];
    screenshots: ProductScreenshot[];
}

interface Props {
    product: Product;
    faqs: Faq[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEMO_ROWS = [
    { company: 'Sharma & Associates', entries: '1,284', status: 'Processed' },
    { company: 'Patel Traders Pvt Ltd', entries: '892', status: 'Processed' },
    { company: 'Rajesh Kumar & Co', entries: '2,156', status: 'Processed' },
    { company: 'Mumbai Exports Ltd', entries: '445', status: 'Processed' },
    { company: 'Delhi Tech Solutions', entries: '1,780', status: 'Processed' },
];

const HOW_IT_WORKS = [
    {
        step: 1,
        title: 'Install the App',
        description:
            'Download the .exe installer (Windows). One-time setup takes under 5 minutes. No internet required after installation.',
        icon: Monitor,
    },
    {
        step: 2,
        title: 'Import Your Data',
        description:
            'Load bank statements, GST data, and TDS sheets directly. Supports Excel, CSV, PDF formats.',
        icon: Database,
    },
    {
        step: 3,
        title: 'Auto-Match & Export',
        description:
            'AI matches entries with 160+ pre-built rules. Review, edit, then export directly to Tally XML format.',
        icon: FileText,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductShow({ product, faqs }: Props) {
    const prefersReduced = useReducedMotion();
    const dur = (n: number) => (prefersReduced ? 0 : n);

    // ── Typewriter ────────────────────────────────────────────────────────────
    const [displayText, setDisplayText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= product.tagline.length) {
                setDisplayText(product.tagline.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 40);
        return () => clearInterval(interval);
    }, [product.tagline]);

    useEffect(() => {
        const blink = setInterval(() => setCursorVisible((v) => !v), 500);
        return () => clearInterval(blink);
    }, []);

    // ── Hero demo rows ────────────────────────────────────────────────────────
    const [heroRows, setHeroRows] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroRows((prev) => {
                if (prev < DEMO_ROWS.length) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 900);
        return () => clearInterval(interval);
    }, []);

    // ── Demo section rows ─────────────────────────────────────────────────────
    const [demoRows, setDemoRows] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDemoRows((prev) => {
                if (prev < DEMO_ROWS.length) return prev + 1;
                return 0; // loop
            });
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    // ── FAQ accordion ─────────────────────────────────────────────────────────
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // ── InView refs ───────────────────────────────────────────────────────────
    const featuresRef = useRef<HTMLElement>(null);
    const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });

    const howItWorksRef = useRef<HTMLElement>(null);
    const howItWorksInView = useInView(howItWorksRef, { once: true, margin: '-80px' });

    const demoSectionRef = useRef<HTMLElement>(null);
    const demoInView = useInView(demoSectionRef, { once: true, margin: '-80px' });

    const pricingRef = useRef<HTMLElement>(null);
    const pricingInView = useInView(pricingRef, { once: true, margin: '-80px' });

    const faqsRef = useRef<HTMLElement>(null);
    const faqsInView = useInView(faqsRef, { once: true, margin: '-80px' });

    const ctaRef = useRef<HTMLElement>(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <PublicLayout>
            <Head title={product.name} />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — HERO
            ═══════════════════════════════════════════════════════════════ */}
            <section className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden flex items-center">
                {/* Background glow blobs */}
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT ─────────────────────────────────────────────── */}
                        <div>
                            {/* Back link */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: dur(0.4) }}
                            >
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors mb-6"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    All Products
                                </Link>
                            </motion.div>

                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: dur(0.4), delay: 0.1 }}
                                className="mb-4"
                            >
                                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                                    {product.pricing_model}
                                </Badge>
                            </motion.div>

                            {/* Product name */}
                            <motion.h1
                                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: dur(0.7), delay: 0.2 }}
                            >
                                {product.name}
                            </motion.h1>

                            {/* Typewriter tagline */}
                            <motion.p
                                className="text-blue-200 text-xl mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: dur(0.4), delay: 0.5 }}
                            >
                                {displayText}
                                <span className={`transition-opacity ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                className="mt-8 flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: dur(0.5) }}
                            >
                                <Link href="/get-quote">
                                    <Button
                                        size="lg"
                                        className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 shadow-xl shadow-blue-900/60 font-semibold"
                                    >
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Free Trial
                                    </Button>
                                </Link>
                                <Link href="/request-demo">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-white/30 text-white rounded-full px-8 bg-transparent hover:bg-white/10 font-semibold"
                                    >
                                        <Play className="mr-2 h-4 w-4" />
                                        Watch Demo
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Floating stat pills */}
                            <motion.div
                                className="mt-6 flex flex-wrap gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0, duration: dur(0.4) }}
                            >
                                {['v1.3.0', '160+ Rules', '47/47 Tests'].map((stat, i) => (
                                    <motion.span
                                        key={stat}
                                        className="bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-1.5 font-mono"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 1.0 + i * 0.1,
                                            type: 'spring',
                                            stiffness: 200,
                                            duration: dur(0.4),
                                        }}
                                    >
                                        {stat}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT — Floating mockup ──────────────────────────── */}
                        <div className="hidden lg:flex items-center justify-center">
                            <motion.div
                                animate={{ y: prefersReduced ? 0 : [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-full max-w-md"
                            >
                                {/* Terminal window */}
                                <div className="rounded-2xl border border-blue-500/30 overflow-hidden shadow-2xl shadow-blue-900/40 bg-[#0D1117]">
                                    {/* Title bar */}
                                    <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-white/10">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                        <span className="ml-3 text-xs text-gray-400 font-mono">{product.name} — Processing</span>
                                        <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            LIVE
                                        </span>
                                    </div>

                                    {/* Column headers */}
                                    <div className="px-4 pt-4 pb-2 grid grid-cols-3 text-xs text-gray-500 font-mono uppercase tracking-wider border-b border-white/5">
                                        <span>Company</span>
                                        <span className="text-center">Entries</span>
                                        <span className="text-right">Status</span>
                                    </div>

                                    {/* Data rows */}
                                    <div className="p-4 space-y-2 min-h-[220px]">
                                        {DEMO_ROWS.map((row, i) =>
                                            i < heroRows ? (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -16 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: dur(0.35) }}
                                                    className="grid grid-cols-3 text-sm py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
                                                >
                                                    <span className="text-gray-300 truncate text-xs">{row.company}</span>
                                                    <span className="text-center text-blue-300 font-mono text-xs">{row.entries}</span>
                                                    <span className="text-right">
                                                        <span className="text-xs bg-green-500/20 text-green-400 rounded-full px-2 py-0.5">
                                                            {row.status}
                                                        </span>
                                                    </span>
                                                </motion.div>
                                            ) : null,
                                        )}
                                    </div>

                                    {/* Progress bar footer */}
                                    <div className="px-4 pb-4 space-y-1.5">
                                        <div className="flex justify-between text-xs text-gray-500 font-mono mb-1">
                                            <span>Processing…</span>
                                            <span>{Math.round((heroRows / DEMO_ROWS.length) * 100)}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                                animate={{ width: `${(heroRows / DEMO_ROWS.length) * 100}%` }}
                                                transition={{ duration: dur(0.5), ease: 'easeOut' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bouncing chevron */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
                    animate={{ y: prefersReduced ? 0 : [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown className="h-7 w-7" />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — FEATURES
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white" ref={featuresRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5) }}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5"
                        >
                            Features
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
                            Everything You Get
                        </h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-2xl mx-auto">
                            A complete toolkit built for productivity and accuracy.
                        </p>
                    </motion.div>

                    {/* Alternating feature rows */}
                    <div className="max-w-5xl mx-auto space-y-16">
                        {product.features.map((feature, i) => (
                            <motion.div
                                key={feature.id}
                                className={`flex flex-col md:flex-row gap-10 items-center ${
                                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                                }`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: dur(0.6), delay: i * 0.1 }}
                            >
                                {/* Icon side */}
                                <motion.div
                                    className="w-32 h-32 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: dur(0.2) }}
                                >
                                    <CheckCircle2 className="h-14 w-14 text-[#2563EB]" />
                                </motion.div>

                                {/* Text side */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                                    <p className="text-[#0F172A]/65 text-lg leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}

                        {product.features.length === 0 && (
                            <p className="text-center text-[#0F172A]/40">Feature details coming soon.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — HOW IT WORKS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#F8FAFC]" ref={howItWorksRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5) }}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5"
                        >
                            How It Works
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
                            Up and Running in Minutes
                        </h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            Three simple steps from installation to your first export.
                        </p>
                    </motion.div>

                    {/* Steps */}
                    <div className="relative max-w-3xl mx-auto">
                        {/* Vertical connecting line */}
                        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[#2563EB] to-blue-200 hidden sm:block" />

                        <div className="space-y-12">
                            {HOW_IT_WORKS.map((step, i) => (
                                <motion.div
                                    key={step.step}
                                    className="relative flex gap-6"
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={howItWorksInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: dur(0.6), delay: i * 0.2 }}
                                >
                                    {/* Step circle */}
                                    <motion.div
                                        className="w-16 h-16 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xl font-bold flex-shrink-0 relative z-10 shadow-lg shadow-blue-500/30"
                                        initial={{ scale: 0 }}
                                        animate={howItWorksInView ? { scale: 1 } : {}}
                                        transition={{
                                            delay: i * 0.2 + 0.3,
                                            type: 'spring',
                                            stiffness: 200,
                                            duration: dur(0.4),
                                        }}
                                    >
                                        {step.step}
                                    </motion.div>

                                    {/* Content */}
                                    <div className="pt-4">
                                        <h3 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
                                        <p className="text-[#0F172A]/65 leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — DEMO / SCREENSHOTS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#0F172A]" ref={demoSectionRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={demoInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5) }}
                    >
                        <Badge className="mb-3 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            Live Demo
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                            See It in Action
                        </h2>
                        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
                            Watch real data get processed, matched, and exported.
                        </p>
                    </motion.div>

                    {product.screenshots.length > 0 ? (
                        /* Screenshots grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                            {product.screenshots.map((screenshot, i) => (
                                <motion.div
                                    key={screenshot.id}
                                    className="overflow-hidden rounded-xl border border-white/10 shadow-sm"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={demoInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: dur(0.5), delay: i * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img
                                        src={screenshot.image_path}
                                        alt={screenshot.caption ?? product.name}
                                        className="w-full aspect-video object-cover"
                                    />
                                    {screenshot.caption && (
                                        <p className="text-xs text-gray-400 text-center py-2 bg-[#161B22]">
                                            {screenshot.caption}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        /* Animated mockup window */
                        <motion.div
                            className="max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 40 }}
                            animate={demoInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: dur(0.6) }}
                        >
                            <div className="relative rounded-2xl border border-blue-500/40 overflow-hidden shadow-2xl shadow-blue-900/50 bg-[#0D1117]">
                                {/* Window title bar */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-3 text-xs text-gray-400 font-mono">
                                        {product.name} — Live Processing
                                    </span>
                                    <span className="ml-auto flex items-center gap-1.5 text-xs text-red-400">
                                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                        LIVE
                                    </span>
                                </div>

                                {/* Column headers */}
                                <div className="px-6 pt-4 pb-2 grid grid-cols-3 text-xs text-gray-500 font-mono uppercase tracking-wider border-b border-white/5">
                                    <span>Company</span>
                                    <span className="text-center">Entries</span>
                                    <span className="text-right">Status</span>
                                </div>

                                {/* Data rows */}
                                <div className="p-6 space-y-3 min-h-[280px]">
                                    {DEMO_ROWS.map((row, i) =>
                                        i < demoRows ? (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: dur(0.35) }}
                                                className="grid grid-cols-3 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors text-sm"
                                            >
                                                <span className="text-gray-300 truncate text-xs">{row.company}</span>
                                                <span className="text-center text-blue-300 font-mono text-xs">{row.entries}</span>
                                                <span className="text-right">
                                                    <span className="text-xs bg-green-500/20 text-green-400 rounded-full px-2 py-0.5">
                                                        {row.status}
                                                    </span>
                                                </span>
                                            </motion.div>
                                        ) : null,
                                    )}
                                </div>

                                {/* Progress footer */}
                                <div className="px-6 pb-5 space-y-1.5">
                                    <div className="flex justify-between text-xs text-gray-500 font-mono">
                                        <span>Auto-matching in progress…</span>
                                        <span>{Math.round((demoRows / DEMO_ROWS.length) * 100)}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                            animate={{ width: `${(demoRows / DEMO_ROWS.length) * 100}%` }}
                                            transition={{ duration: dur(0.5), ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Play button with ripple */}
                            <div className="mt-8 flex flex-col items-center gap-4">
                                <div className="relative inline-flex items-center justify-center">
                                    <span className="absolute w-16 h-16 rounded-full bg-blue-500/30 animate-ping" />
                                    <Link href="/request-demo">
                                        <Button
                                            size="lg"
                                            className="relative bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full w-16 h-16 p-0 shadow-xl shadow-blue-900/50"
                                        >
                                            <Play className="h-6 w-6" />
                                        </Button>
                                    </Link>
                                </div>
                                <p className="text-gray-400 text-sm">Watch it work in real time</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — PRICING
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#F8FAFC]" ref={pricingRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5) }}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5"
                        >
                            Pricing
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-2xl mx-auto">
                            Choose the plan that fits your business. Upgrade anytime.
                        </p>
                    </motion.div>

                    {product.pricing_tiers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
                            {product.pricing_tiers.map((tier, i) => (
                                <motion.div
                                    key={tier.id}
                                    initial={{ opacity: 0, y: 60 }}
                                    animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: dur(0.5), delay: i * 0.1 }}
                                    whileHover={{ y: prefersReduced ? 0 : -8, transition: { duration: 0.2 } }}
                                    className={`relative rounded-2xl border-2 p-8 flex flex-col ${
                                        tier.is_popular
                                            ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-2xl shadow-blue-200'
                                            : 'border-gray-100 bg-white text-[#0F172A] shadow-sm'
                                    }`}
                                >
                                    {tier.is_popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 overflow-hidden rounded-full">
                                            <div className="relative bg-amber-400 text-[#0F172A] text-xs font-bold px-4 py-1 whitespace-nowrap">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>

                                    <div className="my-4">
                                        {tier.price ? (
                                            <p className="text-4xl font-extrabold">
                                                ₹{Number(tier.price).toLocaleString('en-IN')}
                                                <span className="text-base font-normal opacity-70"> one-time</span>
                                            </p>
                                        ) : (
                                            <p className="text-2xl font-bold">Custom Pricing</p>
                                        )}
                                    </div>

                                    {/* Feature list with stagger */}
                                    <motion.ul
                                        className="space-y-2.5 mt-4 flex-1"
                                        variants={stagger}
                                        initial="hidden"
                                        animate={pricingInView ? 'visible' : 'hidden'}
                                    >
                                        {tier.features_json.map((feature, idx) => (
                                            <motion.li
                                                key={idx}
                                                variants={fadeUp}
                                                className="flex items-center gap-2.5 text-sm"
                                            >
                                                <Check className="h-4 w-4 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    <div className="mt-8">
                                        <Link href="/get-quote">
                                            <Button
                                                className={`w-full rounded-full ${
                                                    tier.is_popular
                                                        ? 'bg-white text-[#2563EB] hover:bg-blue-50'
                                                        : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                                                }`}
                                            >
                                                Get Started
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[#0F172A]/50">
                                Pricing details coming soon.{' '}
                                <Link href="/contact" className="text-[#2563EB] hover:underline">
                                    Contact us
                                </Link>{' '}
                                for a quote.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 6 — FAQs
            ═══════════════════════════════════════════════════════════════ */}
            {faqs.length > 0 && (
                <section className="py-20 bg-white" ref={faqsRef}>
                    <div className="max-w-3xl mx-auto px-4">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={faqsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: dur(0.5) }}
                        >
                            <Badge
                                variant="secondary"
                                className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5"
                            >
                                FAQ
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
                                Frequently Asked Questions
                            </h2>
                        </motion.div>

                        {/* Accordion */}
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={faqsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.05, duration: dur(0.4) }}
                                    className="border border-gray-100 rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                        className="w-full flex items-center justify-between px-6 py-4 text-left bg-[#F8FAFC] hover:bg-blue-50 transition-colors"
                                    >
                                        <span className="font-semibold text-[#0F172A]">{faq.question}</span>
                                        <motion.div animate={{ rotate: openFaq === faq.id ? 180 : 0 }} transition={{ duration: dur(0.25) }}>
                                            <ChevronDown className="h-5 w-5 text-[#0F172A]/50" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {openFaq === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: dur(0.3) }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 py-4 bg-white text-[#0F172A]/65 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 7 — BOTTOM CTA
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#0F172A] text-white text-center" ref={ctaRef}>
                <div className="relative max-w-3xl mx-auto px-4">
                    {/* Radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)]" />

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: dur(0.6) }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                                Start Your Free Trial Today
                            </h2>
                            <p className="text-gray-400 mb-8">
                                No credit card. No internet required. Just install and go.
                            </p>

                            <Link href="/get-quote">
                                <motion.div
                                    whileHover={{ scale: prefersReduced ? 1 : 1.05 }}
                                    whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
                                    className="inline-block"
                                >
                                    <Button
                                        size="lg"
                                        className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-12 text-lg font-semibold shadow-2xl shadow-blue-900/50"
                                    >
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Free Trial
                                    </Button>
                                </motion.div>
                            </Link>

                            <p className="mt-6 text-sm text-gray-500">
                                Join 500+ CA firms already using {product.name}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
