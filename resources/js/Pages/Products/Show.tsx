import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, FormEvent } from 'react';
import SeoHead from '@/Components/SeoHead';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import {
    CheckCircle2, Check, ArrowRight, ArrowLeft, MonitorPlay,
    Download, Play, ChevronDown, Shield, Monitor, Star,
    ChevronUp, ChevronRight, Zap, Database, FileText,
    Rocket, Mail, Phone, Building2, CheckCheck, UserCircle,
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
        title: 'Upload Your Bank Statement',
        description:
            'Import PDF, Excel, or CSV statements from SBI, HDFC, PNB, ICICI, Axis, Kotak and 20+ other Indian banks. One-time install — no internet needed.',
        icon: Database,
    },
    {
        step: 2,
        title: 'AI Reads & Categorises Instantly',
        description:
            'Bank2Books AI engine scans every transaction and maps it to the correct Tally ledger using 160+ auto-tagging rules — salary, GST, TDS, vendor payments, and more.',
        icon: FileText,
    },
    {
        step: 3,
        title: 'Review & Export to Tally',
        description:
            'Check the matched entries on screen, make any edits, then export directly into Tally ERP in seconds. Full audit trail included.',
        icon: Monitor,
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

    const { props } = usePage<{ auth: { user: { id: number; name: string; email: string } }; flash?: { waitlist_success?: string } }>();
    const waitlistSuccess = props.flash?.waitlist_success;

    // ── Waitlist form ─────────────────────────────────────────────────────────
    const waitlistRef = useRef<HTMLElement>(null);
    const waitlistInView = useInView(waitlistRef, { once: true, margin: '-60px' });

    const { data: wlData, setData: setWlData, post: wlPost, processing: wlProcessing, errors: wlErrors, reset: wlReset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        remark: '',
        product_id: String(product.id),
        source: 'product-page',
    });

    function scrollToWaitlist() {
        waitlistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handleWaitlistSubmit(e: FormEvent) {
        e.preventDefault();
        wlPost(route('waitlist.store'), {
            preserveScroll: true,
            onSuccess: () => wlReset(),
        });
    }

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
                return 0;
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
            <SeoHead
                title={product.name}
                description={product.tagline}
            />
            <Head>
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'SoftwareApplication',
                    name: product.name,
                    description: product.tagline,
                    applicationCategory: 'BusinessApplication',
                    operatingSystem: 'Windows',
                    offers: product.pricing_tiers?.map(tier => ({
                        '@type': 'Offer',
                        name: tier.name,
                        price: tier.price ?? '0',
                        priceCurrency: 'INR',
                    })) ?? [],
                })}</script>
            </Head>

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

                            {/* Coming Soon badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: dur(0.4), delay: 0.05 }}
                                className="mb-3"
                            >
                                <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                    Coming Soon — Early Access Open
                                </span>
                            </motion.div>

                            {/* Pricing model badge */}
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
                                <Button
                                    size="lg"
                                    onClick={scrollToWaitlist}
                                    className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 shadow-xl shadow-orange-900/40 font-semibold text-white"
                                >
                                    <Rocket className="mr-2 h-5 w-5" />
                                    Get Early Access — Free
                                </Button>
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

                            {/* Incentive pill */}
                            <motion.div
                                className="mt-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0, duration: dur(0.4) }}
                            >
                                <span className="inline-flex items-center gap-2 text-orange-200/80 text-sm">
                                    <Check className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                    First 100 signups get <strong className="text-orange-300">3 months free</strong> at launch
                                </span>
                            </motion.div>

                            {/* Floating stat pills */}
                            <motion.div
                                className="mt-5 flex flex-wrap gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1, duration: dur(0.4) }}
                            >
                                {['v1.3.0', '160+ Rules', '47/47 Tests'].map((stat, i) => (
                                    <motion.span
                                        key={stat}
                                        className="bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-1.5 font-mono"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 1.1 + i * 0.1,
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
                        className="text-center mb-12"
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
                            Bank Statement to Tally in 3 Steps
                        </h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            From upload to Tally export in seconds — no manual data entry.
                        </p>
                    </motion.div>

                    {/* Workflow diagram image */}
                    <motion.div
                        className="max-w-4xl mx-auto mb-14"
                        initial={{ opacity: 0, y: 30 }}
                        animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.6), delay: 0.15 }}
                    >
                        <img
                            src="/images/products/bank2books/how-it-works.png"
                            alt="Bank2Books workflow: Bank Statements → AI → Tally entries"
                            className="w-full h-auto rounded-2xl shadow-lg object-contain"
                        />
                    </motion.div>

                    {/* Steps */}
                    <div className="relative max-w-3xl mx-auto">
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
                SECTION 4 — PRODUCT VISUALS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#0F172A]" ref={demoSectionRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={demoInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5) }}
                    >
                        <Badge className="mb-3 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            Product Preview
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                            See Bank2Books in Action
                        </h2>
                        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
                            A clean, powerful interface built for speed and accuracy.
                        </p>
                    </motion.div>

                    <motion.div
                        className="max-w-4xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={demoInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.6), delay: 0.1 }}
                        whileHover={{ scale: prefersReduced ? 1 : 1.01 }}
                    >
                        <img
                            src="/images/products/bank2books/hero-banner.png"
                            alt="Bank2Books app on laptop and mobile showing financial dashboard"
                            className="w-full h-auto rounded-2xl shadow-2xl shadow-blue-900/40 object-cover"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={demoInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: dur(0.6), delay: 0.2 }}
                            whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                        >
                            <img
                                src="/images/products/bank2books/dashboard-mockup.png"
                                alt="Bank2Books financial dashboard showing transaction table"
                                className="w-full h-auto rounded-xl shadow-lg border border-white/10 object-cover"
                            />
                            <p className="text-gray-500 text-xs text-center mt-2">Transaction processing dashboard</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={demoInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: dur(0.6), delay: 0.3 }}
                            whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                        >
                            <img
                                src="/images/products/bank2books/before-after.png"
                                alt="Before and after Bank2Books: from paper chaos to organised digital"
                                className="w-full h-auto rounded-xl shadow-lg border border-white/10 object-cover"
                            />
                            <p className="text-gray-500 text-xs text-center mt-2">From manual chaos to automated clarity</p>
                        </motion.div>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4">
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
                        <p className="text-gray-400 text-sm">Schedule a live walkthrough</p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — PRICING
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#F8FAFC]" ref={pricingRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                    {/* Launch offer banner */}
                    <motion.div
                        className="max-w-2xl mx-auto mt-8 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5), delay: 0.15 }}
                    >
                        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-400/30 rounded-2xl px-6 py-4 text-center">
                            <p className="text-orange-600 font-bold text-sm">
                                🔥 Special Launch Offer — First 100 Early Access signups get <span className="underline">3 months FREE</span> on any plan
                            </p>
                            <button
                                onClick={scrollToWaitlist}
                                className="mt-2 text-xs text-orange-500 hover:text-orange-600 underline underline-offset-2 font-medium transition-colors"
                            >
                                Secure your spot →
                            </button>
                        </div>
                    </motion.div>

                    {product.pricing_tiers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-4">
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
                                        <Button
                                            onClick={scrollToWaitlist}
                                            className={`w-full rounded-full ${
                                                tier.is_popular
                                                    ? 'bg-white text-[#2563EB] hover:bg-blue-50'
                                                    : 'bg-orange-500 text-white hover:bg-orange-600'
                                            }`}
                                        >
                                            Available at Launch →
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[#0F172A]/50">
                                Pricing details coming soon.{' '}
                                <button onClick={scrollToWaitlist} className="text-[#2563EB] hover:underline">
                                    Join the waitlist
                                </button>{' '}
                                for early access.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 6 — WAITLIST SIGNUP
            ═══════════════════════════════════════════════════════════════ */}
            <section
                id="waitlist"
                ref={waitlistRef}
                className="py-24 bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#4F46E5] text-white relative overflow-hidden"
            >
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={waitlistInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5) }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-orange-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            <Rocket className="h-3.5 w-3.5" />
                            Early Access — Limited Spots
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Reserve Your Free 3 Months
                        </h2>
                        <p className="text-blue-100/80 mt-3 text-lg">
                            Bank2Books launches soon. Be first in line — early access users get 3 months completely free.
                        </p>
                    </motion.div>

                    {/* Form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={waitlistInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.6), delay: 0.15 }}
                    >
                        <AnimatePresence mode="wait">
                            {waitlistSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: dur(0.4), type: 'spring', stiffness: 200 }}
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 text-center"
                                >
                                    <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCheck className="h-8 w-8 text-green-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                                    <p className="text-blue-100/80">{waitlistSuccess}</p>
                                    <p className="mt-4 text-sm text-blue-200/60">
                                        Share with fellow CAs and accountants to help them get early access too.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8"
                                >
                                    <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                                        {/* Name + Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-blue-100/70 uppercase tracking-wider mb-1.5">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                                    <input
                                                        type="text"
                                                        value={wlData.name}
                                                        onChange={e => setWlData('name', e.target.value)}
                                                        placeholder="Rajesh Sharma"
                                                        required
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                                                    />
                                                </div>
                                                {wlErrors.name && <p className="text-red-300 text-xs mt-1">{wlErrors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-blue-100/70 uppercase tracking-wider mb-1.5">
                                                    Email *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                                    <input
                                                        type="email"
                                                        value={wlData.email}
                                                        onChange={e => setWlData('email', e.target.value)}
                                                        placeholder="rajesh@caoffice.in"
                                                        required
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                                                    />
                                                </div>
                                                {wlErrors.email && <p className="text-red-300 text-xs mt-1">{wlErrors.email}</p>}
                                            </div>
                                        </div>

                                        {/* Phone + Company */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-blue-100/70 uppercase tracking-wider mb-1.5">
                                                    Phone *
                                                </label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                                    <input
                                                        type="tel"
                                                        value={wlData.phone}
                                                        onChange={e => setWlData('phone', e.target.value)}
                                                        placeholder="+91 98765 43210"
                                                        required
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                                                    />
                                                </div>
                                                {wlErrors.phone && <p className="text-red-300 text-xs mt-1">{wlErrors.phone}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-blue-100/70 uppercase tracking-wider mb-1.5">
                                                    Firm / Company
                                                </label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                                    <input
                                                        type="text"
                                                        value={wlData.company}
                                                        onChange={e => setWlData('company', e.target.value)}
                                                        placeholder="Sharma & Associates"
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remark */}
                                        <div>
                                            <label className="block text-xs font-semibold text-blue-100/70 uppercase tracking-wider mb-1.5">
                                                How will you use Bank2Books? <span className="font-normal normal-case">(optional)</span>
                                            </label>
                                            <textarea
                                                value={wlData.remark}
                                                onChange={e => setWlData('remark', e.target.value)}
                                                rows={2}
                                                placeholder="e.g. Processing 50+ client statements monthly, currently doing it manually in Excel..."
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all resize-none"
                                            />
                                        </div>

                                        {/* Benefits reminder */}
                                        <div className="flex items-start gap-3 bg-white/8 rounded-xl px-4 py-3">
                                            <Rocket className="h-4 w-4 text-orange-300 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-blue-100/70 leading-relaxed">
                                                Early access users get <strong className="text-white">3 months completely free</strong> when Bank2Books launches — no credit card needed to reserve your spot.
                                            </p>
                                        </div>

                                        {/* Submit */}
                                        <Button
                                            type="submit"
                                            disabled={wlProcessing}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl py-3 text-base shadow-lg shadow-orange-900/40 disabled:opacity-60 transition-all"
                                        >
                                            {wlProcessing ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                    </svg>
                                                    Reserving your spot…
                                                </span>
                                            ) : (
                                                <>Reserve My Free 3 Months <ArrowRight className="ml-2 h-4 w-4 inline" /></>
                                            )}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Social proof */}
                    <motion.p
                        className="text-center text-blue-200/50 text-sm mt-6"
                        initial={{ opacity: 0 }}
                        animate={waitlistInView ? { opacity: 1 } : {}}
                        transition={{ duration: dur(0.4), delay: 0.4 }}
                    >
                        Join 200+ CA firms & accountants already on the waitlist
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 7 — FAQs
            ═══════════════════════════════════════════════════════════════ */}
            {faqs.length > 0 && (
                <section className="py-20 bg-white" ref={faqsRef}>
                    <div className="max-w-3xl mx-auto px-4">
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
                SECTION 8 — BOTTOM CTA
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#0F172A] text-white text-center" ref={ctaRef}>
                <div className="relative max-w-3xl mx-auto px-4">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)]" />

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: dur(0.6) }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                                Be First When Bank2Books Launches
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Reserve your spot today — first 100 signups get 3 months completely free.
                            </p>

                            <motion.div
                                whileHover={{ scale: prefersReduced ? 1 : 1.05 }}
                                whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
                                className="inline-block"
                            >
                                <Button
                                    size="lg"
                                    onClick={scrollToWaitlist}
                                    className="bg-orange-500 hover:bg-orange-600 rounded-full px-12 text-lg font-semibold shadow-2xl shadow-orange-900/40 text-white"
                                >
                                    <Rocket className="mr-2 h-5 w-5" />
                                    Reserve My Free 3 Months
                                </Button>
                            </motion.div>

                            <p className="mt-6 text-sm text-gray-500">
                                No credit card. No commitment. Just early access.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
