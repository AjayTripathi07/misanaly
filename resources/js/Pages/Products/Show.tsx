import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, FormEvent } from 'react';
import SeoHead from '@/Components/SeoHead';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import PublicLayout from '@/Layouts/PublicLayout';
import StatementSimulator from '@/Components/Products/StatementSimulator';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import {
    CheckCircle2, Check, ArrowRight, ArrowLeft, MonitorPlay,
    Download, Play, ChevronDown, Shield, Monitor, Star,
    ChevronUp, ChevronRight, Zap, Database, FileText,
    Rocket, Mail, Phone, Building2, CheckCheck, UserCircle, X,
    Clock, AlertTriangle, Landmark, Briefcase, ScanLine, ListTree,
    Layers, Send, Sheet as SheetIcon, FileCheck2, Target, Brain, ClipboardCheck,
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

const FEATURE_ICON_MAP: Record<string, typeof CheckCircle2> = {
    Brain, FileText, ScanLine, ListTree, ClipboardCheck, Building2,
    Layers, Send, Sheet: SheetIcon, FileCheck2, Shield, Target,
};

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
            'Statement2Books AI engine scans every transaction and maps it to the correct Tally ledger using 160+ auto-tagging rules — salary, GST, TDS, vendor payments, and more.',
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

    // ── FAQ accordion ─────────────────────────────────────────────────────────
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // ── Sticky header CTA ─────────────────────────────────────────────────────
    const [showStickyBtn, setShowStickyBtn] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowStickyBtn(window.scrollY > 500);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ── Stats bar (count-up on scroll) ────────────────────────────────────────
    const { ref: statsBarRef, isVisible: statsBarVisible } = useScrollAnimation({ once: true });

    // ── Problem section ────────────────────────────────────────────────────────
    const problemRef = useRef<HTMLElement>(null);
    const problemInView = useInView(problemRef, { once: true, margin: '-80px' });

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
                SECTION 1 — HERO / INTERACTIVE SIMULATOR
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
                                transition={{ duration: dur(0.4), delay: 0.05 }}
                                className="mb-4"
                            >
                                <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    🤖 AI-Powered · 100% Offline · Tally Ready
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: dur(0.7), delay: 0.2 }}
                            >
                                Your Bank Statements.<br />
                                <span className="text-blue-400">Booked in Minutes.</span>
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                className="text-blue-200 text-xl mt-4 leading-relaxed max-w-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: dur(0.4), delay: 0.4 }}
                            >
                                {product.tagline}
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                className="mt-8 flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: dur(0.5) }}
                            >
                                <Button
                                    size="lg"
                                    onClick={scrollToWaitlist}
                                    className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 shadow-xl shadow-orange-900/40 font-semibold text-white"
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Free Trial
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

                            {/* Trust text row */}
                            <motion.div
                                className="mt-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: dur(0.4) }}
                            >
                                <span className="inline-flex items-center gap-2 text-orange-200/80 text-sm">
                                    <Check className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                    First 100 signups get <strong className="text-orange-300">3 months free</strong> at launch
                                </span>
                            </motion.div>

                            {/* Avatar-stack social proof */}
                            <motion.div
                                className="flex items-center gap-3 mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0, duration: dur(0.4) }}
                            >
                                <div className="flex -space-x-2">
                                    {['SK', 'PR', 'AM', 'VT', 'NJ', 'RS'].map((initials, i) => (
                                        <div
                                            key={i}
                                            className={`w-7 h-7 rounded-full border-2 border-[#0F172A] flex items-center justify-center text-[10px] font-bold text-white ${['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'][i]}`}
                                        >
                                            {initials}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">
                                    <strong className="text-white">99+</strong> CA firms process statements daily
                                </span>
                            </motion.div>
                        </div>

                        {/* RIGHT — Interactive simulator ─────────────────────── */}
                        <div className="hidden lg:flex items-center justify-center">
                            <StatementSimulator />
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
                SECTION — STATS BAR
            ═══════════════════════════════════════════════════════════════ */}
            <section ref={statsBarRef} className="py-12 bg-[#0F172A] border-t border-white/5">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                        { value: 99, suffix: '+', label: 'CA Firms' },
                        { value: 100, suffix: '+', label: 'Bank Formats' },
                        { value: 98.7, suffix: '%', label: 'Accuracy Rate' },
                        { value: 3, suffix: ' hrs', label: 'Saved Daily' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="font-mono text-3xl sm:text-4xl font-bold text-white">
                                <NumberFlow value={statsBarVisible ? stat.value : 0} />{stat.suffix}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm mt-1.5">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION — TRUST BAND (marquee)
            ═══════════════════════════════════════════════════════════════ */}
            <div className="bg-white py-6 overflow-hidden border-b border-gray-100 group">
                <div className="flex animate-scroll-left group-hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
                    {[...['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak', 'PNB', 'Tally Prime', 'BOB', 'Canara', 'Yes Bank'],
                      ...['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak', 'PNB', 'Tally Prime', 'BOB', 'Canara', 'Yes Bank']].map((name, i) => (
                        <span key={i} className="flex items-center gap-2 mx-8 text-sm font-semibold text-[#0F172A]/40 whitespace-nowrap uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/40 flex-shrink-0" />
                            {name}
                        </span>
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION — THE PROBLEM
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#F8FAFC]" ref={problemRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 30 }}
                        animate={problemInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur(0.5) }}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-3 bg-orange-50 text-orange-600 border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5"
                        >
                            The Problem
                        </Badge>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
                            Manual Bank Data Entry Is Killing Your Margins
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, title: 'Hours Lost to Manual Entry', desc: 'CAs spend 3-6 hours per client, per month, just typing bank transactions into Tally.' },
                            { icon: AlertTriangle, title: 'One Wrong Entry, One Wrong Balance', desc: 'A single transposed digit cascades into hours of reconciliation and client trust issues.' },
                            { icon: Landmark, title: 'Every Bank Does It Differently', desc: 'SBI, HDFC, ICICI, Axis — each statement format is different, making manual mapping painful.' },
                            { icon: Briefcase, title: "You're Billing Data Entry, Not Advisory", desc: 'Time spent on repetitive entry is time not spent on the high-value advisory work clients pay for.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="bg-white rounded-2xl border border-gray-100 p-6"
                                initial={{ opacity: 0, y: 30 }}
                                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: dur(0.5), delay: i * 0.1 }}
                            >
                                <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                                    Problem
                                </div>
                                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                                    <item.icon className="h-5 w-5 text-orange-500" />
                                </div>
                                <h3 className="font-bold text-[#0F172A] text-sm mb-2">{item.title}</h3>
                                <p className="text-[#0F172A]/60 text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
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
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
                            Everything You Get
                        </h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-2xl mx-auto">
                            A complete toolkit built for productivity and accuracy.
                        </p>
                    </motion.div>

                    {/* Feature grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.features.map((feature, i) => {
                            const Icon = (feature.icon && FEATURE_ICON_MAP[feature.icon]) || CheckCircle2;
                            return (
                                <motion.div
                                    key={feature.id}
                                    className="bg-[#F8FAFC] rounded-2xl border border-gray-100 p-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: dur(0.5), delay: (i % 6) * 0.08 }}
                                >
                                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                                        <Icon className="h-5 w-5 text-[#2563EB]" />
                                    </div>
                                    <h3 className="font-bold text-[#0F172A] text-sm mb-2">{feature.title}</h3>
                                    <p className="text-[#0F172A]/60 text-xs leading-relaxed">{feature.description}</p>
                                </motion.div>
                            );
                        })}

                        {product.features.length === 0 && (
                            <p className="col-span-full text-center text-[#0F172A]/40">Feature details coming soon.</p>
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
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
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
                            alt="Statement2Books workflow: Bank Statements → AI → Tally entries"
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
                SECTION — MANUAL vs STATEMENT2BOOKS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            The Difference
                        </Badge>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
                            Manual Entry vs Statement2Books
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Manual side */}
                        <div className="rounded-2xl border-2 border-red-100 bg-red-50/40 p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                    <X className="h-4 w-4 text-red-500" />
                                </div>
                                <h3 className="font-bold text-[#0F172A] text-lg">The Manual Way</h3>
                            </div>
                            {[
                                'Download bank statement PDF/Excel',
                                'Open Tally, navigate to vouchers',
                                'Manually type each transaction',
                                'Double-check every entry for errors',
                                'Repeat for every bank, every month',
                                '3–6 hours per client, per month',
                            ].map((item, i) => (
                                <motion.div key={i} className="flex items-start gap-3 mb-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                >
                                    <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-[#0F172A]/70 text-sm">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                        {/* Statement2Books side */}
                        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                </div>
                                <h3 className="font-bold text-[#0F172A] text-lg">With Statement2Books</h3>
                            </div>
                            {[
                                'Upload statement (PDF/Excel/CSV)',
                                'AI reads & categorises instantly',
                                '160+ auto-tagging rules applied',
                                'Review on screen — edit if needed',
                                'Export directly to Tally in 1 click',
                                'Done in under 60 seconds ✓',
                            ].map((item, i) => (
                                <motion.div key={i} className="flex items-start gap-3 mb-3"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                >
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-[#0F172A]/70 text-sm">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={scrollToWaitlist} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full text-base shadow-lg shadow-orange-900/20 transition-colors inline-flex items-center gap-2">
                            <Rocket className="h-4 w-4" /> Start Saving Time — Join Waitlist
                        </button>
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
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                            See Statement2Books in Action
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
                            alt="Statement2Books app on laptop and mobile showing financial dashboard"
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
                                alt="Statement2Books financial dashboard showing transaction table"
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
                                alt="Before and after Statement2Books: from paper chaos to organised digital"
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
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
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
                                            <p className="font-mono text-4xl font-extrabold">
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
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Reserve Your Free 3 Months
                        </h2>
                        <p className="text-blue-100/80 mt-3 text-lg">
                            Statement2Books launches soon. Be first in line — early access users get 3 months completely free.
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
                                                How will you use Statement2Books? <span className="font-normal normal-case">(optional)</span>
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
                                                Early access users get <strong className="text-white">3 months completely free</strong> when Statement2Books launches — no credit card needed to reserve your spot.
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
                    <motion.div
                        className="flex items-center justify-center gap-3 mt-6"
                        initial={{ opacity: 0 }}
                        animate={waitlistInView ? { opacity: 1 } : {}}
                        transition={{ duration: dur(0.4), delay: 0.4 }}
                    >
                        <div className="flex -space-x-2">
                            {['SK','PR','AM','VT','NJ','RS'].map((initials, i) => (
                                <div key={i} className={`w-7 h-7 rounded-full border-2 border-blue-700 flex items-center justify-center text-[10px] font-bold text-white ${['bg-blue-500','bg-emerald-500','bg-violet-500','bg-orange-500','bg-pink-500','bg-teal-500'][i]}`}>
                                    {initials}
                                </div>
                            ))}
                        </div>
                        <span className="text-blue-200/60 text-sm"><strong className="text-white">99+</strong> CA firms &amp; accountants already on the waitlist</span>
                    </motion.div>
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
                            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-3">
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
                            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4">
                                Be First When Statement2Books Launches
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

            {/* ── Sticky header CTA ── */}
            <AnimatePresence>
                {showStickyBtn && (
                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed top-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10 px-4 py-2.5 flex items-center justify-between"
                    >
                        <span className="text-white text-sm font-medium hidden sm:block">Statement2Books — Early Access</span>
                        <div className="flex items-center gap-3 mx-auto sm:mx-0">
                            <span className="text-gray-400 text-xs hidden md:block">🎉 First 100 signups get 3 months free</span>
                            <button onClick={scrollToWaitlist} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-1.5 rounded-full transition-colors">
                                Get Early Access →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
