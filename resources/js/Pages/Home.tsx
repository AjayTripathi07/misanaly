import React, { useRef, useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import {
    Globe, Smartphone, Code2, Brain, Network, Palette,
    Cloud, Wrench, HeadphonesIcon, Building2, Star,
    CheckCircle2, ArrowRight, Users, Lightbulb, Clock, LifeBuoy,
    CalendarDays, ChevronRight, Layers, ChevronDown, Shield, Monitor, Rocket,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import PublicLayout from '@/Layouts/PublicLayout';
import StatementSimulatorPreview from '@/Components/Products/StatementSimulatorPreview';
import FavoriteProductPopup from '@/Components/FavoriteProductPopup';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { type Service, type Product, type Testimonial, type BlogPost, type PageProps } from '@/types';

/* ─── icon map ─── */
const ICON_MAP: Record<string, React.ElementType> = {
    Globe, Smartphone, Code2, Brain, Network, Palette,
    Cloud, Wrench, HeadphonesIcon, Building2, Layers,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
    const Icon = ICON_MAP[name] ?? Globe;
    return <Icon className={className} />;
}

/* ─── props ─── */
interface Props {
    services: Service[];
    hasMoreServices: boolean;
    featuredProduct: (Product & { features: { id: number; title: string; description: string }[] }) | null;
    testimonials: Testimonial[];
    latestPosts: BlogPost[];
}

/* ─── star rating ─── */
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
                />
            ))}
        </div>
    );
}

/* ─── animation variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── why items ─── */
const WHY_ITEMS = [
    {
        Icon: Users,
        title: 'Expert Team',
        desc: 'Deep expertise across web, mobile, cloud & automation.',
        stat: '15+',
        statLabel: 'engineers',
    },
    {
        Icon: Lightbulb,
        title: 'Custom Solutions',
        desc: 'No templates — built from the ground up for you.',
        stat: '100%',
        statLabel: 'custom built',
    },
    {
        Icon: Clock,
        title: 'Timely Delivery',
        desc: 'Clear milestones, shipped on schedule — every time.',
        stat: '95%',
        statLabel: 'on-time rate',
    },
    {
        Icon: LifeBuoy,
        title: '24/7 Support',
        desc: 'Always reachable — chat, email, or phone.',
        stat: '24/7',
        statLabel: 'availability',
    },
];

/* ─── main component ─── */
export default function Home({ services, hasMoreServices, featuredProduct, testimonials, latestPosts }: Props) {
    const { props: pageProps } = usePage<PageProps<{ siteSettings?: { udyam_number: string } }>>();
    const udyamNumber = pageProps.siteSettings?.udyam_number;
    const prefersReduced = useReducedMotion();
    const dur = prefersReduced ? 0 : undefined;

    /* full-screen favorite-product popup — shown once per session */
    const [popupOpen, setPopupOpen] = useState(false);
    useEffect(() => {
        if (!featuredProduct) return;
        if (sessionStorage.getItem('favorite_popup_shown') === '1') return;
        const timer = setTimeout(() => {
            sessionStorage.setItem('favorite_popup_shown', '1');
            setPopupOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* company stats (used in Company Intro section) */
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
    const [counts, setCounts] = useState({ services: 0, firms: 0, clients: 0, years: 0 });
    useEffect(() => {
        if (statsInView) setCounts({ services: 10, firms: 99, clients: 50, years: 3 });
    }, [statsInView]);

    /* stats bar (below hero) — count-up on scroll */
    const { ref: statsBarRef, isVisible: statsBarVisible } = useScrollAnimation({ once: true });

    /* section refs */
    const servicesRef = useRef(null);
    const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });

    const { ref: whyRef, isVisible: whyInView } = useScrollAnimation({ once: true, threshold: 0.15 });

    const testimonialsRef = useRef(null);
    const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

    const blogRef = useRef(null);
    const blogInView = useInView(blogRef, { once: true, margin: '-100px' });

    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

    const SERVICE_COLORS = [
        { bg: 'bg-blue-500/10', icon: 'text-[#2563EB]', border: 'border-blue-500/20' },
        { bg: 'bg-emerald-500/10', icon: 'text-[#10B981]', border: 'border-emerald-500/20' },
        { bg: 'bg-violet-500/10', icon: 'text-[#6366F1]', border: 'border-violet-500/20' },
        { bg: 'bg-amber-500/10', icon: 'text-[#F59E0B]', border: 'border-amber-500/20' },
    ];

    return (
        <PublicLayout>
            <SeoHead
                title="Statement2Books - AI Bank Statement to Tally Converter"
                description="Statement2Books converts bank statements from SBI, HDFC, ICICI & 100+ banks into Tally entries in seconds — AI-powered, 100% offline. Built by NobelIQ Technologies for CA firms and businesses across India."
                keywords="Statement2Books, bank statement to Tally, AI bank statement converter, CA firm software, Tally automation, IT services India, custom software development, NobelIQ Technologies"
            />
            <Head>
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'NobelIQ Technologies',
                    url: 'https://misanaly.in',
                    description: 'IT Services and Software Products company based in India',
                    contactPoint: {
                        '@type': 'ContactPoint',
                        email: 'info@misanaly.in',
                        contactType: 'customer service',
                    },
                    sameAs: [],
                })}</script>
            </Head>

            {/* ═══════════════════════════════════════════════
                SECTION 1 — HERO: STATEMENT2BOOKS
            ═══════════════════════════════════════════════ */}
            <section className="relative flex items-center bg-[#0F172A] text-white overflow-hidden">
                {/* Background glow blobs — matches Products/Show.tsx hero */}
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT */}
                        <div>
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: dur ?? 0.5 }}
                            >
                                <Badge className="mb-6 bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                    🤖 AI-Powered · 100% Offline · Tally Ready
                                </Badge>
                            </motion.div>

                            {/* H1 */}
                            <motion.h1
                                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: dur ?? 0.6 }}
                            >
                                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Statement2Books</span>
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                className="text-gray-300 text-lg leading-relaxed mb-6 max-w-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: dur ?? 0.5 }}
                            >
                                Convert bank statements from SBI, HDFC, ICICI &amp; 100+ banks into Tally entries in seconds. Built for CA firms and finance teams — let AI handle the rest.
                            </motion.p>

                            {/* Feature list with stagger */}
                            <motion.ul
                                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6"
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                            >
                                {(featuredProduct?.features ?? []).slice(0, 4).map((f) => (
                                    <motion.li
                                        key={f.id}
                                        variants={fadeUp}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-[#10B981] flex-shrink-0" />
                                        <span className="font-semibold text-white">{f.title}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* CTAs */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
                            >
                                <Link href={`/products/${featuredProduct?.slug ?? 'statement2books'}`}>
                                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 shadow-xl shadow-orange-900/40 font-semibold text-white">
                                        Explore {featuredProduct?.name ?? 'Statement2Books'}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={`/products/${featuredProduct?.slug ?? 'statement2books'}#waitlist`}>
                                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent font-semibold">
                                        <Rocket className="mr-2 h-4 w-4" />
                                        Join Waitlist
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Social proof */}
                            <motion.div
                                className="flex items-center gap-3 mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: dur ?? 0.4 }}
                            >
                                <div className="flex -space-x-2">
                                    {['SK', 'PR', 'AM', 'VT', 'NJ'].map((initials, i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-8 rounded-full border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white ${['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-orange-500', 'bg-pink-500'][i]}`}
                                        >
                                            {initials}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-400">
                                    <strong className="font-mono text-white">99+</strong> CA firms process statements daily
                                </span>
                            </motion.div>

                            {/* Trust badges */}
                            <motion.div
                                className="flex flex-wrap gap-3 mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0, duration: dur ?? 0.4 }}
                            >
                                {[
                                    { icon: Monitor, label: 'Windows Compatible' },
                                    { icon: Shield, label: 'Secure Data' },
                                    { icon: CheckCircle2, label: 'Offline App' },
                                ].map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-gray-300">
                                        <Icon className="h-3.5 w-3.5" />
                                        {label}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT — auto-cycling simulator preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: dur ?? 0.7 }}
                            className="hidden lg:flex items-center justify-center"
                        >
                            <StatementSimulatorPreview />
                        </motion.div>
                    </div>
                </div>

                {/* Bouncing scroll arrow */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="h-6 w-6" />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 2 — STATS BAR
            ═══════════════════════════════════════════════ */}
            <section ref={statsBarRef} className="py-12 bg-[#0F172A] border-t-[3px] border-blue-400/30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <span className="inline-flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/25 text-blue-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                            Our Impact
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
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
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION — TRUST BAND (marquee)
            ═══════════════════════════════════════════════ */}
            <div className="bg-white pt-5 pb-6 overflow-hidden border-t-[3px] border-gray-300/40 border-b border-gray-100 group">
                <div className="text-center mb-4">
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        Trusted By
                    </span>
                </div>
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

            {/* ═══════════════════════════════════════════════
                SECTION — COMPANY INTRO: NOBELIQ TECHNOLOGIES
            ═══════════════════════════════════════════════ */}
            <section className="relative py-20 sm:py-24 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white overflow-hidden border-t-[3px] border-blue-400/30">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: dur ?? 0.5 }}
                    >
                        <Badge className="mb-6 bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                            🏢 The Company Behind Statement2Books
                        </Badge>
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-center gap-3 mb-3"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: dur ?? 0.6, delay: 0.1 }}
                    >
                        <img src="/images/branding/Icon.png" alt="NobelIQ Technologies" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                            NobelIQ Technologies
                        </h2>
                    </motion.div>

                    <motion.div
                        className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-4"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: dur ?? 0.6, delay: 0.2 }}
                    />

                    <motion.p
                        className="text-blue-200/80 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: dur ?? 0.5, delay: 0.25 }}
                    >
                        IT Services &amp; Software Products
                    </motion.p>

                    <motion.p
                        className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: dur ?? 0.5, delay: 0.3 }}
                    >
                        Beyond Statement2Books, we build custom web apps, mobile apps, and enterprise software that help businesses across India work smarter — not harder.
                    </motion.p>

                    {/* Company stats */}
                    <motion.div
                        ref={statsRef}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10 bg-white/5 border border-white/10 rounded-2xl p-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: dur ?? 0.5, delay: 0.4 }}
                    >
                        {[
                            { value: counts.services, suffix: '+', label: 'Services' },
                            { value: counts.firms, suffix: '+', label: 'CA Firms' },
                            { value: counts.clients, suffix: '+', label: 'Clients' },
                            { value: counts.years, suffix: '+', label: 'Years' },
                        ].map(({ value, suffix, label }, i) => (
                            <div key={label} className="text-center">
                                <motion.p
                                    className="font-mono text-2xl sm:text-3xl font-bold text-cyan-300"
                                    animate={prefersReduced ? {} : { scale: [1, 1.06, 1] }}
                                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                                >
                                    <NumberFlow value={value} />{suffix}
                                </motion.p>
                                <p className="text-xs text-gray-400 mt-1 font-medium">{label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: dur ?? 0.5, delay: 0.4 }}
                    >
                        <Link href="/services">
                            <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 font-semibold shadow-lg shadow-blue-900/50 text-white">
                                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent font-semibold">
                                Start Your Project
                            </Button>
                        </Link>
                    </motion.div>

                    {udyamNumber && (
                        <p className="mt-6 text-xs text-gray-500">🏛️ MSME Registered · Udyam: {udyamNumber}</p>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 3 — SERVICES
            ═══════════════════════════════════════════════ */}
            <section className="py-14 sm:py-16 bg-[#F8FAFC] border-t-[3px] border-emerald-400/30" ref={servicesRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: dur ?? 0.6 }}
                        className="mb-1.5"
                    >
                        <span className="flex w-fit items-center gap-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                            Our Services
                        </span>
                        <h2 className="font-heading relative inline-block text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            What We Do
                            <motion.span
                                className="absolute -bottom-1 left-0 h-1 bg-[#2563EB] rounded-full"
                                initial={{ width: 0 }}
                                animate={servicesInView ? { width: '100%' } : {}}
                                transition={{ duration: dur ?? 0.8, delay: 0.3 }}
                            />
                        </h2>
                    </motion.div>
                    <motion.p
                        className="text-[#0F172A]/55 text-sm sm:text-base max-w-2xl mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur ?? 0.6, delay: 0.2 }}
                    >
                        From custom software to accounting automation — we build technology that moves your business forward.
                    </motion.p>

                    {/* Cards stagger */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
                        variants={stagger}
                        initial="hidden"
                        animate={servicesInView ? 'visible' : 'hidden'}
                    >
                        {services.map((service, i) => {
                            const svcColor = SERVICE_COLORS[i % SERVICE_COLORS.length];
                            return (
                            <motion.div key={service.id} variants={fadeUp}>
                                <Link href={`/services/${service.slug}`}>
                                    <motion.div
                                        className="group h-full border border-gray-100 rounded-xl bg-white p-4 cursor-pointer flex flex-col"
                                        whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(37,99,235,0.12)' }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    >
                                        <div className={`w-9 h-9 rounded-lg ${svcColor.bg} flex items-center justify-center mb-3 transition-transform duration-150 group-hover:scale-110`}>
                                            <ServiceIcon name={service.icon} className={`h-4 w-4 ${svcColor.icon}`} />
                                        </div>
                                        <h3 className="font-semibold text-[#0F172A] text-sm leading-snug">{service.name}</h3>
                                        <p className="text-[#0F172A]/50 text-xs mt-1 truncate">{service.tagline}</p>
                                        <div className="mt-2 flex items-center gap-1 text-[#2563EB] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                            Learn More <ChevronRight className="h-3 w-3" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* View all */}
                    {hasMoreServices && (
                        <motion.div
                            className="mt-8 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: dur ?? 0.5, delay: 0.5 }}
                        >
                            <Link href="/services">
                                <Button variant="outline" className="border-[#2563EB] text-[#2563EB] hover:bg-blue-50 rounded-full px-8">
                                    View All Services <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                MARQUEE STRIP — TECH & SERVICES
            ═══════════════════════════════════════════════ */}
            <div className="bg-[#0F172A] py-4 overflow-hidden border-y border-white/5 group">
                <div className="flex animate-scroll-left group-hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
                    {[...['Laravel', 'React', 'AI / ML', 'Statement2Books', 'Tally Integration', 'NobelIQ Technologies', 'Mobile Apps', 'Cloud Solutions', 'Custom Software', 'REST APIs', 'UI / UX Design'], ...['Laravel', 'React', 'AI / ML', 'Statement2Books', 'Tally Integration', 'NobelIQ Technologies', 'Mobile Apps', 'Cloud Solutions', 'Custom Software', 'REST APIs', 'UI / UX Design']].map((item, i) => (
                        <span key={i} className="flex items-center gap-3 mx-6 text-sm font-medium text-white/50 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTION 4 — WHY CHOOSE US
            ═══════════════════════════════════════════════ */}
            <section className="py-20 sm:py-24 bg-white overflow-hidden border-t-[3px] border-violet-400/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={whyRef}>
                    {/* Title */}
                    <motion.div
                        className="text-center mb-16 sm:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={whyInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur ?? 0.6 }}
                    >
                        <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                            Why Us
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
                            Why Choose NobelIQ Technologies?
                        </h2>
                        <p className="text-[#0F172A]/60 text-lg max-w-2xl mx-auto">
                            We combine technical excellence with deep business understanding to deliver results that matter.
                        </p>
                    </motion.div>

                    {/* ── Desktop: horizontal trust path ── */}
                    <div className="hidden md:flex items-start justify-between">
                        {WHY_ITEMS.map((item, i) => {
                            const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
                            const isLast = i === WHY_ITEMS.length - 1;
                            return (
                                <div key={item.title} className={isLast ? 'flex items-start flex-shrink-0' : 'flex items-start flex-1'}>
                                    {/* Node */}
                                    <motion.div
                                        className="flex flex-col items-center text-center w-36 lg:w-44 group/node"
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={whyInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: dur ?? 0.5, delay: i * 0.18 }}
                                    >
                                        <div className="relative">
                                            <motion.div
                                                className={`w-20 h-20 rounded-full ${color.bg} border-2 ${color.border} flex items-center justify-center shadow-sm transition-transform duration-200 group-hover/node:scale-110`}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <item.Icon className={`h-8 w-8 ${color.icon}`} />
                                            </motion.div>
                                            {/* Step badge */}
                                            <motion.span
                                                className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 ${color.border} ${color.icon} text-[11px] font-bold flex items-center justify-center`}
                                                initial={{ scale: 0 }}
                                                animate={whyInView ? { scale: 1 } : {}}
                                                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.18 + 0.25 }}
                                            >
                                                {i + 1}
                                            </motion.span>
                                        </div>
                                        <h3 className="text-sm lg:text-base font-bold text-[#0F172A] mt-4">{item.title}</h3>
                                        <p className="text-[#0F172A]/55 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                                        <span className={`inline-flex items-center gap-1 mt-3 text-[10px] font-mono font-bold ${color.icon} ${color.bg} px-2 py-0.5 rounded-full`}>
                                            {item.stat} {item.statLabel}
                                        </span>
                                    </motion.div>

                                    {/* Connector to next node */}
                                    {!isLast && (
                                        <motion.div
                                            className="h-0.5 flex-1 mt-10 bg-gradient-to-r from-[#2563EB] to-violet-500 origin-left"
                                            initial={{ scaleX: 0 }}
                                            animate={whyInView ? { scaleX: 1 } : {}}
                                            transition={{ duration: dur ?? 0.5, delay: i * 0.18 + 0.35 }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Mobile/tablet: vertical trust path ── */}
                    <div className="md:hidden relative">
                        {/* Connecting line */}
                        <motion.div
                            className="absolute left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#2563EB] to-violet-500 origin-top"
                            initial={{ scaleY: 0 }}
                            animate={whyInView ? { scaleY: 1 } : {}}
                            transition={{ duration: dur ?? 0.8 }}
                        />
                        <div className="space-y-10">
                            {WHY_ITEMS.map((item, i) => {
                                const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
                                return (
                                    <motion.div
                                        key={item.title}
                                        className="relative flex gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={whyInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: dur ?? 0.5, delay: i * 0.15 }}
                                    >
                                        <div className="relative flex-shrink-0 z-10">
                                            <div className={`w-10 h-10 rounded-full ${color.bg} border-2 ${color.border} flex items-center justify-center shadow-sm`}>
                                                <item.Icon className={`h-5 w-5 ${color.icon}`} />
                                            </div>
                                            <span className={`absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-white border ${color.border} ${color.icon} text-[9px] font-bold flex items-center justify-center`}>
                                                {i + 1}
                                            </span>
                                        </div>
                                        <div className="pt-1">
                                            <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
                                            <p className="text-[#0F172A]/55 text-sm mt-1 leading-relaxed">{item.desc}</p>
                                            <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-mono font-bold ${color.icon} ${color.bg} px-2 py-0.5 rounded-full`}>
                                                {item.stat} {item.statLabel}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 5 — TESTIMONIALS
            ═══════════════════════════════════════════════ */}
            <section className="py-20 sm:py-24 bg-[#F8FAFC] overflow-hidden border-t-[3px] border-amber-400/30" ref={testimonialsRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur ?? 0.6 }}
                    >
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                            Testimonials
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
                            Trusted by Businesses Across India
                        </h2>
                        <p className="text-[#0F172A]/60 text-lg max-w-2xl mx-auto">
                            Hear from the teams that rely on NobelIQ Technologies every day.
                        </p>
                    </motion.div>
                </div>

                {testimonials.length > 0 ? (
                    /* Auto-scroll carousel */
                    <div className="overflow-hidden">
                        <div className="flex gap-6 animate-scroll-left" style={{ width: 'max-content' }}>
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <div key={i} className="w-80 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                                    <StarRating rating={t.rating} />
                                    <blockquote className="mt-4 text-[#0F172A]/70 text-sm italic leading-relaxed">"{t.quote}"</blockquote>
                                    <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#0F172A] text-sm">{t.name}</p>
                                            <p className="text-xs text-[#0F172A]/50">{t.role}, {t.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Placeholder cards */
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: 'Ramesh Gupta', role: 'CA', company: 'Gupta & Co', quote: 'NobelIQ Technologies transformed the way we handle Tally entries. What used to take half a day now takes minutes.', rating: 5 },
                                { name: 'Priya Sharma', role: 'Finance Manager', company: 'Sharma Exports', quote: 'Excellent web application built on time. The team understood our requirements perfectly.', rating: 5 },
                                { name: 'Anil Patel', role: 'Director', company: 'Patel Industries', quote: 'Outstanding support and a product that genuinely works. Highly recommend for any CA firm.', rating: 5 },
                            ].map((t, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: dur ?? 0.5, delay: i * 0.1 }}
                                >
                                    <StarRating rating={t.rating} />
                                    <blockquote className="mt-4 text-[#0F172A]/70 text-sm italic leading-relaxed">"{t.quote}"</blockquote>
                                    <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#0F172A] text-sm">{t.name}</p>
                                            <p className="text-xs text-[#0F172A]/50">{t.role}, {t.company}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 6 — BLOG PREVIEW
            ═══════════════════════════════════════════════ */}
            {latestPosts.length > 0 && (
                <section className="py-20 sm:py-24 bg-white border-t-[3px] border-blue-400/30" ref={blogRef}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Title */}
                        <motion.div
                            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={blogInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: dur ?? 0.6 }}
                        >
                            <div>
                                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#2563EB] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                                    Insights
                                </span>
                                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">
                                    Latest Insights
                                </h2>
                                <p className="text-[#0F172A]/60 text-lg">
                                    Tips, guides, and updates from the NobelIQ Technologies team.
                                </p>
                            </div>
                            <Link href="/blog">
                                <Button variant="outline" className="border-[#2563EB] text-[#2563EB] hover:bg-blue-50 rounded-full px-6 flex-shrink-0">
                                    View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Cards stagger */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={stagger}
                            initial="hidden"
                            animate={blogInView ? 'visible' : 'hidden'}
                        >
                            {latestPosts.map(post => (
                                <motion.div key={post.id} variants={fadeUp}>
                                    <Link href={`/blog/${post.slug}`}>
                                        <motion.div
                                            className="group h-full border border-gray-100 rounded-2xl bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
                                            whileHover={{ y: -4 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            {post.cover_image && (
                                                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                                    <img
                                                        src={post.cover_image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6 flex flex-col flex-1">
                                                <h3 className="font-bold text-[#0F172A] text-base mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                                                    {post.title}
                                                </h3>
                                                {post.excerpt && (
                                                    <p className="text-[#0F172A]/55 text-sm flex-1 line-clamp-3 leading-relaxed">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="mt-4 flex items-center justify-between text-xs text-[#0F172A]/40 pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-1.5">
                                                        <CalendarDays className="h-3.5 w-3.5" />
                                                        <span>{post.published_at}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[#2563EB] font-medium">
                                                        Read More <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════
                SECTION 7 — FINAL CTA
            ═══════════════════════════════════════════════ */}
            <section
                className="py-24 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white text-center overflow-hidden relative"
                ref={ctaRef}
            >
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />
                {/* Floating shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

                <motion.div
                    className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: dur ?? 0.6 }}
                >
                    <Badge className="mb-6 bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                        Start Today
                    </Badge>

                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                        Ready to Transform{' '}
                        <span className="text-white/90">Your Business?</span>
                    </h2>

                    <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Join 500+ businesses and CA firms across India who trust NobelIQ Technologies for their technology needs. Let's build something great together.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <Button size="lg" className="bg-white text-[#2563EB] hover:bg-gray-50 rounded-full px-10 shadow-xl font-bold text-base">
                                    Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/services">
                            <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 bg-transparent font-semibold">
                                Browse Services
                            </Button>
                        </Link>
                    </div>

                    {/* Trust row */}
                    <motion.div
                        className="mt-12 flex flex-wrap justify-center gap-6 text-white/60 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur ?? 0.5, delay: 0.3 }}
                    >
                        {[
                            { icon: CheckCircle2, text: 'No upfront fees' },
                            { icon: Shield, text: 'NDA on request' },
                            { icon: Clock, text: 'Response within 24h' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-1.5">
                                <Icon className="h-4 w-4" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {featuredProduct && (
                <FavoriteProductPopup
                    product={featuredProduct}
                    open={popupOpen}
                    onOpenChange={setPopupOpen}
                />
            )}
        </PublicLayout>
    );
}
