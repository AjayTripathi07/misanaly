import React, { useRef, useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Globe, Smartphone, Code2, Brain, Network, Palette,
    Cloud, Wrench, HeadphonesIcon, Building2, Star,
    CheckCircle2, ArrowRight, Users, Lightbulb, Clock, LifeBuoy,
    CalendarDays, ChevronRight, Layers, ChevronDown, Download, Play, Shield, Monitor,
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { type Service, type Product, type Testimonial, type BlogPost } from '@/types';

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

/* ─── demo rows constant ─── */
const DEMO_ROWS = [
    { company: 'Sharma & Associates', entries: '1,284', status: 'Processed' },
    { company: 'Patel Traders Pvt Ltd', entries: '892', status: 'Processed' },
    { company: 'Rajesh Kumar & Co', entries: '2,156', status: 'Processed' },
    { company: 'Mumbai Exports Ltd', entries: '445', status: 'Processed' },
    { company: 'Delhi Tech Solutions', entries: '1,780', status: 'Processed' },
];

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
        desc: 'Our engineers bring deep domain expertise across web, mobile, cloud, and enterprise automation — delivering solutions that are robust, scalable, and future-proof.',
        stat: '15+',
        statLabel: 'engineers',
    },
    {
        Icon: Lightbulb,
        title: 'Custom Solutions',
        desc: 'No templates, no shortcuts. Every solution is architected from the ground up to match your exact workflow, compliance requirements, and business goals.',
        stat: '100%',
        statLabel: 'custom built',
    },
    {
        Icon: Clock,
        title: 'Timely Delivery',
        desc: 'We respect your time. Clear milestones, transparent communication, and a proven delivery process ensure your project ships on schedule — every time.',
        stat: '95%',
        statLabel: 'on-time rate',
    },
    {
        Icon: LifeBuoy,
        title: '24/7 Support',
        desc: 'Your business never sleeps, and neither does our support. Reach our team any time via chat, email, or phone — we are always here when you need us.',
        stat: '24/7',
        statLabel: 'availability',
    },
];

/* ─── main component ─── */
export default function Home({ services, featuredProduct, testimonials, latestPosts }: Props) {
    const prefersReduced = useReducedMotion();
    const dur = prefersReduced ? 0 : undefined;

    /* hero stats */
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
    const [counts, setCounts] = useState({ services: 0, firms: 0, clients: 0, years: 0 });
    useEffect(() => {
        if (statsInView) setCounts({ services: 10, firms: 500, clients: 50, years: 3 });
    }, [statsInView]);

    /* animated rows */
    const [visibleRows, setVisibleRows] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleRows(prev => (prev < DEMO_ROWS.length ? prev + 1 : 1));
        }, 900);
        return () => clearInterval(timer);
    }, []);

    /* section refs */
    const servicesRef = useRef(null);
    const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });

    const productRef = useRef(null);
    const productInView = useInView(productRef, { once: true, margin: '-80px' });

    const whyRef = useRef(null);
    const whyInView = useInView(whyRef, { once: true, margin: '-100px' });

    const testimonialsRef = useRef(null);
    const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

    const blogRef = useRef(null);
    const blogInView = useInView(blogRef, { once: true, margin: '-100px' });

    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

    return (
        <PublicLayout>
            <Head title="MSI Analytics — IT Services & Software Products" />

            {/* ═══════════════════════════════════════════════
                SECTION 1 — HERO
            ═══════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] overflow-hidden">

                {/* Floating geometric shapes */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-float pointer-events-none" />
                <div className="absolute bottom-32 right-16 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-float-delay pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800/10 rounded-full blur-[100px] animate-float-slow pointer-events-none" />

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT SIDE */}
                        <div>
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: dur ?? 0.5 }}
                            >
                                <Badge className="mb-6 bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                    ⭐ IT Services &amp; Software Products
                                </Badge>
                            </motion.div>

                            {/* H1 — word-by-word stagger */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                {"Innovative IT Solutions & Software Products".split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block mr-[0.25em]"
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.07, duration: dur ?? 0.45 }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>

                            {/* Subheadline */}
                            <motion.p
                                className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: dur ?? 0.5 }}
                            >
                                We build custom web apps, mobile apps, and accounting automation tools that help CA firms and businesses work smarter — not harder.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
                            >
                                <Link href="/services">
                                    <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 font-semibold shadow-lg shadow-blue-900/50 text-white">
                                        Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent font-semibold">
                                        Get a Quote
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Stats bar */}
                            <div ref={statsRef} className="grid grid-cols-4 gap-4 mt-12 bg-white/5 border border-white/10 rounded-2xl p-4">
                                {[
                                    { value: counts.services, suffix: '+', label: 'Services' },
                                    { value: counts.firms, suffix: '+', label: 'CA Firms' },
                                    { value: counts.clients, suffix: '+', label: 'Clients' },
                                    { value: counts.years, suffix: '+', label: 'Years' },
                                ].map(({ value, suffix, label }) => (
                                    <div key={label} className="text-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-white">
                                            <NumberFlow value={value} />{suffix}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 font-medium">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SIDE — Tally mockup (hidden below lg) */}
                        <div className="hidden lg:block">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative"
                            >
                                {/* Glow border container */}
                                <div className="rounded-2xl border border-blue-500/40 shadow-2xl shadow-blue-900/50 overflow-hidden bg-[#0D1117]">
                                    {/* Title bar */}
                                    <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-white/10">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                        <span className="ml-3 text-xs text-gray-400 font-mono">Tally Automation v1.3</span>
                                        <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            Processing...
                                        </span>
                                    </div>

                                    {/* Animated data rows */}
                                    <div className="p-4 space-y-2 min-h-[200px]">
                                        {DEMO_ROWS.map((row, i) =>
                                            i < visibleRows ? (
                                                <motion.div
                                                    key={row.company}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/[0.08]"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-300 font-mono truncate">{row.company}</p>
                                                        <p className="text-xs text-gray-500 font-mono">{row.entries} entries</p>
                                                    </div>
                                                    <span className="ml-3 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 font-mono flex-shrink-0">
                                                        ✓ {row.status}
                                                    </span>
                                                </motion.div>
                                            ) : null
                                        )}
                                    </div>

                                    {/* Progress bars */}
                                    <div className="px-4 pb-4 pt-2 border-t border-white/10 space-y-2">
                                        {[
                                            { label: 'Bank Entries', pct: 92, color: 'bg-blue-500' },
                                            { label: 'GST Entries', pct: 87, color: 'bg-indigo-500' },
                                            { label: 'TDS Entries', pct: 95, color: 'bg-violet-500' },
                                        ].map(bar => (
                                            <div key={bar.label}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-400 font-mono">{bar.label}</span>
                                                    <span className="text-gray-300 font-mono">{bar.pct}%</span>
                                                </div>
                                                <div className="h-1.5 bg-white/10 rounded-full">
                                                    <motion.div
                                                        className={`h-full ${bar.color} rounded-full`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${bar.pct}%` }}
                                                        transition={{ duration: dur ?? 1.5, delay: 0.5, ease: 'easeOut' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -top-4 -right-4 bg-white text-[#1D4ED8] rounded-xl shadow-xl px-4 py-2.5 font-mono">
                                    <p className="text-xs font-semibold">Time saved</p>
                                    <p className="text-xl font-bold">3 hrs<span className="text-sm">/day</span></p>
                                </div>
                            </motion.div>
                        </div>
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
                SECTION 2 — SERVICES
            ═══════════════════════════════════════════════ */}
            <section className="py-20 sm:py-24 bg-gray-50" ref={servicesRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: dur ?? 0.6 }}
                        className="mb-4"
                    >
                        <h2 className="relative inline-block text-3xl sm:text-4xl font-bold text-[#0F172A]">
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
                        className="text-[#0F172A]/60 text-lg max-w-2xl mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur ?? 0.6, delay: 0.2 }}
                    >
                        From custom software to accounting automation — we build technology that moves your business forward.
                    </motion.p>

                    {/* Cards stagger */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={stagger}
                        initial="hidden"
                        animate={servicesInView ? 'visible' : 'hidden'}
                    >
                        {services.map(service => (
                            <motion.div key={service.id} variants={fadeUp}>
                                <Link href={`/services/${service.slug}`}>
                                    <motion.div
                                        className="group h-full border border-gray-100 rounded-2xl bg-white p-6 cursor-pointer flex flex-col"
                                        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(37,99,235,0.15)' }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <motion.div
                                            className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4"
                                            whileHover={{ scale: 1.1, backgroundColor: '#2563EB' }}
                                        >
                                            <ServiceIcon name={service.icon} className="h-6 w-6 text-[#2563EB] group-hover:text-white transition-colors" />
                                        </motion.div>
                                        <h3 className="font-semibold text-[#0F172A] text-base mb-2">{service.name}</h3>
                                        <p className="text-[#0F172A]/55 text-sm flex-1">{service.tagline}</p>
                                        {service.starting_price && (
                                            <p className="mt-3 text-xs text-[#2563EB] font-semibold">From {service.starting_price}</p>
                                        )}
                                        <div className="mt-4 flex items-center gap-1 text-[#2563EB] text-sm font-medium">
                                            Learn More <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* View all */}
                    <motion.div
                        className="mt-12 text-center"
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
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 3 — FEATURED PRODUCT
            ═══════════════════════════════════════════════ */}
            <section className="py-20 sm:py-24 bg-[#0F172A] text-white overflow-hidden relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.15)_0%,transparent_60%)] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={productRef}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT — animates from left */}
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={productInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: dur ?? 0.7 }}
                        >
                            {/* Pulsing badge */}
                            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 rounded-full px-4 py-1.5 mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">⭐ Flagship Product</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                                Automate Your Tally.<br />
                                <span className="text-blue-400">Save Hours Daily.</span>
                            </h2>

                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Built for CA firms and finance teams. Import bank statements, GST data, and TDS sheets — let AI handle the rest.
                            </p>

                            {/* Feature list with stagger */}
                            <motion.ul
                                className="space-y-4 mb-8"
                                variants={stagger}
                                initial="hidden"
                                animate={productInView ? 'visible' : 'hidden'}
                            >
                                {(featuredProduct?.features ?? []).map((f) => (
                                    <motion.li
                                        key={f.id}
                                        variants={fadeUp}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="font-semibold text-white">{f.title}</span>
                                            <span className="text-gray-400 text-sm"> — {f.description}</span>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* Animated counter */}
                            <div className="flex items-center gap-2 mb-8">
                                <Users className="h-5 w-5 text-blue-400" />
                                <span className="text-white font-bold text-xl">
                                    <NumberFlow value={productInView ? 500 : 0} />+
                                </span>
                                <span className="text-gray-400">CA firms trust us</span>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link href="/get-quote">
                                    <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 shadow-lg shadow-blue-900/50 font-semibold text-white">
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Free Trial
                                    </Button>
                                </Link>
                                <Link href="/request-demo">
                                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent font-semibold">
                                        <Play className="mr-2 h-4 w-4" />
                                        Watch Demo
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-3">
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
                            </div>
                        </motion.div>

                        {/* RIGHT — animated mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={productInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: dur ?? 0.7, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative"
                            >
                                <div className="rounded-2xl border border-blue-500/40 shadow-2xl shadow-blue-500/10 overflow-hidden bg-[#0D1117]">
                                    {/* Title bar */}
                                    <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-white/10">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                        <span className="ml-3 text-xs text-gray-400 font-mono">Tally Automation v1.3</span>
                                        <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            Processing...
                                        </span>
                                    </div>

                                    {/* Data rows */}
                                    <div className="p-4 space-y-2 min-h-[200px]">
                                        {DEMO_ROWS.map((row, i) =>
                                            i < visibleRows ? (
                                                <motion.div
                                                    key={row.company}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/[0.08]"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-300 font-mono truncate">{row.company}</p>
                                                        <p className="text-xs text-gray-500 font-mono">{row.entries} entries</p>
                                                    </div>
                                                    <span className="ml-3 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 font-mono flex-shrink-0">
                                                        ✓ {row.status}
                                                    </span>
                                                </motion.div>
                                            ) : null
                                        )}
                                    </div>

                                    {/* Progress bars */}
                                    <div className="px-4 pb-4 border-t border-white/10 pt-3 space-y-2">
                                        {[
                                            { label: 'Bank Entries', pct: 92, color: 'bg-blue-500' },
                                            { label: 'GST Entries', pct: 87, color: 'bg-indigo-500' },
                                        ].map(bar => (
                                            <div key={bar.label}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-400 font-mono">{bar.label}</span>
                                                    <span className="text-gray-300 font-mono">{bar.pct}%</span>
                                                </div>
                                                <div className="h-1.5 bg-white/10 rounded-full">
                                                    <motion.div
                                                        className={`h-full ${bar.color} rounded-full`}
                                                        initial={{ width: 0 }}
                                                        animate={productInView ? { width: `${bar.pct}%` } : {}}
                                                        transition={{ duration: dur ?? 1.5, delay: 0.8, ease: 'easeOut' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <p className="text-xs text-gray-500 font-mono text-right pt-1">1,284 processed · 98.7% accuracy</p>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -top-4 -right-4 bg-white text-[#1D4ED8] rounded-xl shadow-xl px-4 py-2.5">
                                    <p className="text-xs font-semibold">Time saved</p>
                                    <p className="text-xl font-bold leading-none mt-0.5">3 hrs<span className="text-sm font-medium">/day</span></p>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 4 — WHY CHOOSE US
            ═══════════════════════════════════════════════ */}
            <section className="py-20 sm:py-24 bg-white" ref={whyRef}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={whyInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur ?? 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
                            Why Choose MSI Analytics?
                        </h2>
                        <p className="text-[#0F172A]/60 text-lg max-w-2xl mx-auto">
                            We combine technical excellence with deep business understanding to deliver results that matter.
                        </p>
                    </motion.div>

                    {/* Alternating rows */}
                    <div className="space-y-16">
                        {WHY_ITEMS.map((item, i) => (
                            <div
                                key={item.title}
                                className={`flex flex-col md:flex-row gap-10 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Icon side */}
                                <motion.div
                                    className="flex-shrink-0"
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    animate={whyInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: dur ?? 0.6, delay: i * 0.1 }}
                                >
                                    <div className="w-28 h-28 rounded-3xl bg-blue-500/10 border border-blue-100 flex items-center justify-center shadow-sm">
                                        <item.Icon className="h-14 w-14 text-[#2563EB]" />
                                    </div>
                                </motion.div>

                                {/* Text side */}
                                <motion.div
                                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                    animate={whyInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: dur ?? 0.6, delay: i * 0.1 + 0.1 }}
                                >
                                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
                                    <p className="text-[#0F172A]/60 text-base leading-relaxed mb-4">{item.desc}</p>
                                    <p className="text-4xl font-extrabold text-[#2563EB]">{item.stat}</p>
                                    <p className="text-sm text-gray-500 mt-1 font-medium">{item.statLabel}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                SECTION 5 — TESTIMONIALS
            ═══════════════════════════════════════════════ */}
            <section className="py-20 sm:py-24 bg-gray-50 overflow-hidden" ref={testimonialsRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: dur ?? 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
                            Trusted by Businesses Across India
                        </h2>
                        <p className="text-[#0F172A]/60 text-lg max-w-2xl mx-auto">
                            Hear from the teams that rely on MSI Analytics every day.
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
                                { name: 'Ramesh Gupta', role: 'CA', company: 'Gupta & Co', quote: 'MSI Analytics transformed the way we handle Tally entries. What used to take half a day now takes minutes.', rating: 5 },
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
                <section className="py-20 sm:py-24 bg-white" ref={blogRef}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Title */}
                        <motion.div
                            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={blogInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: dur ?? 0.6 }}
                        >
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">
                                    Latest Insights
                                </h2>
                                <p className="text-[#0F172A]/60 text-lg">
                                    Tips, guides, and updates from the MSI Analytics team.
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

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                        Ready to Transform{' '}
                        <span className="text-white/90">Your Business?</span>
                    </h2>

                    <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Join 500+ businesses and CA firms across India who trust MSI Analytics for their technology needs. Let's build something great together.
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
        </PublicLayout>
    );
}
