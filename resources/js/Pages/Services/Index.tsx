import { Link } from '@inertiajs/react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
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
    { bg: 'bg-blue-500/10', icon: 'text-[#2563EB]', border: 'hover:border-blue-500/40' },
    { bg: 'bg-emerald-500/10', icon: 'text-[#10B981]', border: 'hover:border-emerald-500/40' },
    { bg: 'bg-violet-500/10', icon: 'text-[#6366F1]', border: 'hover:border-violet-500/40' },
    { bg: 'bg-amber-500/10', icon: 'text-[#F59E0B]', border: 'hover:border-amber-500/40' },
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

            {/* Compact Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F4FD] via-white to-[#F0F7FF] pt-14 pb-8">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                        What We Offer
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                        Our Services
                    </h1>
                    <p className="text-base sm:text-lg text-[#0F172A]/60 max-w-2xl mx-auto mt-3">
                        From web and mobile development to AI solutions and cloud infrastructure — we deliver end-to-end technology services.
                    </p>

                    {/* Inline stat strip */}
                    <div className="flex items-center justify-center divide-x divide-gray-200 mt-6">
                        {[
                            { value: '10+', label: 'Services' },
                            { value: '50+', label: 'Clients Served' },
                            { value: '3+', label: 'Years Experience' },
                        ].map((stat) => (
                            <div key={stat.label} className="px-5 first:pl-0 last:pr-0">
                                <span className="text-lg font-bold text-[#2563EB]">{stat.value}</span>
                                <span className="text-[#0F172A]/50 text-xs ml-1.5">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="bg-[#F8FAFC] py-14 sm:py-16" ref={gridRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <Badge variant="secondary" className="mb-2 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            All Services
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                            Everything You Need
                        </h2>
                        <p className="mt-2 text-[#0F172A]/55 max-w-xl mx-auto text-sm sm:text-base">
                            Choose the service that fits your needs, or combine several for a complete digital transformation.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        variants={stagger}
                        initial="hidden"
                        animate={gridInView ? 'visible' : 'hidden'}
                    >
                        {services.map((service, i) => {
                            const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
                            return (
                                <motion.div key={service.id} variants={fadeUp}>
                                    <Link href={`/services/${service.slug}`}>
                                        <motion.div
                                            className={`group h-full border border-gray-100 ${color.border} rounded-2xl bg-white p-6 cursor-pointer flex flex-col`}
                                            whileHover={{ y: -4, boxShadow: '0 14px 32px rgba(37,99,235,0.12)' }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                        >
                                            <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center mb-4 transition-transform duration-150 group-hover:scale-110`}>
                                                <ServiceIcon name={service.icon} className={`h-6 w-6 ${color.icon}`} />
                                            </div>

                                            <h3 className="font-bold text-[#0F172A] text-base group-hover:text-[#2563EB] transition-colors mb-1">
                                                {service.name}
                                            </h3>

                                            <p className="text-[#0F172A]/55 text-sm leading-relaxed">
                                                {service.tagline}
                                            </p>

                                            {service.starting_price && (
                                                <p className="mt-2 text-xs font-semibold text-[#2563EB]">
                                                    From {service.starting_price}
                                                </p>
                                            )}

                                            {service.features && service.features.length > 0 && (
                                                <ul className="mt-3 space-y-1.5">
                                                    {service.features.slice(0, 3).map((feature) => (
                                                        <li key={feature.id} className="flex items-center gap-2">
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                                            <span className="text-xs text-[#0F172A]/60">{feature.title}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <div className="mt-auto pt-4 flex items-center gap-1 text-[#2563EB] text-sm font-semibold">
                                                Learn More
                                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
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
