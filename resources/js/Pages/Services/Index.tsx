import { Link } from '@inertiajs/react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { Button } from '@/Components/ui/button';
import { ServiceIcon } from '@/Components/ServiceIcon';
import { CheckCircle2, ArrowRight, ChevronRight, Shield, Clock } from 'lucide-react';

interface ServiceFeature {
    id: number;
    title: string;
    description: string;
    icon: string | null;
}

interface Service {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    icon: string;
    starting_price: string | null;
    features?: ServiceFeature[];
}

interface Props {
    services: Service[];
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const SERVICE_COLORS = [
    { soft: 'bg-blue-500/10', text: 'text-[#2563EB]', border: 'hover:border-blue-500/40', grad: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/25', glow: 'bg-blue-500/10', pillHover: 'group-hover:border-blue-500/40 group-hover:text-[#2563EB]' },
    { soft: 'bg-teal-500/10', text: 'text-[#0D9488]', border: 'hover:border-teal-500/40', grad: 'from-teal-400 to-teal-600', shadow: 'shadow-teal-500/25', glow: 'bg-teal-500/10', pillHover: 'group-hover:border-teal-500/40 group-hover:text-[#0D9488]' },
    { soft: 'bg-violet-500/10', text: 'text-[#7C3AED]', border: 'hover:border-violet-500/40', grad: 'from-violet-400 to-violet-600', shadow: 'shadow-violet-500/25', glow: 'bg-violet-500/10', pillHover: 'group-hover:border-violet-500/40 group-hover:text-[#7C3AED]' },
    { soft: 'bg-amber-500/10', text: 'text-[#D97706]', border: 'hover:border-amber-500/40', grad: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/25', glow: 'bg-amber-500/10', pillHover: 'group-hover:border-amber-500/40 group-hover:text-[#D97706]' },
    { soft: 'bg-rose-500/10', text: 'text-[#E11D48]', border: 'hover:border-rose-500/40', grad: 'from-rose-400 to-rose-600', shadow: 'shadow-rose-500/25', glow: 'bg-rose-500/10', pillHover: 'group-hover:border-rose-500/40 group-hover:text-[#E11D48]' },
];

export default function Index({ services }: Props) {
    const gridRef = useRef(null);
    const gridInView = useInView(gridRef, { once: true, margin: '-100px' });

    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

    return (
        <PublicLayout>
            <SeoHead
                title="Our IT Services"
                description="Explore our IT services: web development, mobile apps, custom software, AI/ML solutions, and more. Serving businesses across India."
                keywords="IT services India, web development, mobile app development, custom software, AI solutions"
            />

            {/* Minimal breadcrumb — no hero block */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0F172A]/40">
                    Services {services.length > 0 && <span className="text-[#0F172A]/25">· {services.length} available</span>}
                </p>
            </div>

            {/* Services Grid */}
            <section className="bg-[#F8FAFC] py-10 sm:py-12 mt-2" ref={gridRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={stagger}
                        initial="hidden"
                        animate={gridInView ? 'visible' : 'hidden'}
                    >
                        {services.map((service, i) => {
                            const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
                            return (
                                <motion.div key={service.id} variants={fadeUp} className="h-full">
                                    <Link href={`/services/${service.slug}`}>
                                        <motion.div
                                            className={`group relative h-full overflow-hidden border border-gray-100 ${color.border} rounded-2xl bg-white p-6 cursor-pointer flex flex-col transition-colors`}
                                            whileHover={{ y: -5, boxShadow: '0 18px 36px rgba(15,23,42,0.12)' }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                        >
                                            {/* Subtle corner accent */}
                                            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${color.glow} blur-2xl opacity-70 pointer-events-none transition-opacity duration-300 group-hover:opacity-100`} />

                                            <div className="relative">
                                                {/* Icon badge */}
                                                <motion.div
                                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color.grad} shadow-lg ${color.shadow} flex items-center justify-center mb-5`}
                                                    whileHover={{ rotate: 6, scale: 1.08 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                                >
                                                    <ServiceIcon name={service.icon} className="h-7 w-7 text-white" />
                                                </motion.div>

                                                <h3 className="font-extrabold text-[#0F172A] text-lg group-hover:text-[#2563EB] transition-colors mb-1.5">
                                                    {service.name}
                                                </h3>

                                                <p className="text-[#0F172A]/55 text-sm leading-relaxed">
                                                    {service.tagline}
                                                </p>

                                                {service.starting_price && (
                                                    <span className={`inline-flex items-center mt-3 ${color.soft} ${color.text} text-xs font-semibold rounded-full px-3 py-1`}>
                                                        From {service.starting_price}
                                                    </span>
                                                )}

                                                {service.features && service.features.length > 0 && (
                                                    <ul className="mt-4 space-y-2">
                                                        {service.features.slice(0, 3).map((feature) => (
                                                            <li key={feature.id} className="flex items-center gap-2">
                                                                <CheckCircle2 className={`h-3.5 w-3.5 ${color.text} flex-shrink-0`} />
                                                                <span className="text-xs text-[#0F172A]/60">{feature.title}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            <div className="relative mt-auto pt-5">
                                                <span className={`inline-flex items-center gap-1 border border-gray-200 ${color.pillHover} rounded-full px-4 py-1.5 text-sm font-semibold text-[#0F172A] transition-colors`}>
                                                    Learn More
                                                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Section transition divider */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-1 w-24 mx-auto mt-14 rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-amber-400 opacity-60" />
                </div>
            </section>

            {/* Bottom CTA — premium dark gradient with pattern */}
            <section
                className="py-24 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white text-center overflow-hidden relative"
                ref={ctaRef}
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.12] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

                <motion.div
                    className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
                        Not Sure Which Service{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">You Need?</span>
                    </h2>
                    <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Talk to our experts for a free consultation — we'll help you pick the right fit.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/get-quote">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                                <Button size="lg" className="bg-white text-[#2563EB] hover:bg-gray-50 rounded-full px-10 shadow-xl shadow-blue-950/30 font-bold text-base">
                                    Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/contact">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                                <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 bg-transparent font-semibold">
                                    Contact Us
                                </Button>
                            </motion.div>
                        </Link>
                    </div>

                    <motion.div
                        className="mt-12 flex flex-wrap justify-center gap-3 text-white/70 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {[
                            { icon: CheckCircle2, text: 'No upfront fees' },
                            { icon: Shield, text: 'NDA on request' },
                            { icon: Clock, text: 'Response within 24h' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5">
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
