import { Link } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { ServiceIcon } from '@/Components/ServiceIcon';
import { CheckCircle2, ChevronRight, ChevronDown, ArrowRight, ArrowLeft, Shield, Clock } from 'lucide-react';

interface ServiceFeature {
    id: number;
    title: string;
    description: string;
    icon: string | null;
}

interface ServiceProcessStep {
    id: number;
    step_number: number;
    title: string;
    description: string;
}

interface Service {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
    icon: string;
    starting_price: string | null;
    features: ServiceFeature[];
    process_steps: ServiceProcessStep[];
}

interface RelatedService {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    icon: string;
}

interface Faq {
    id: number;
    question: string;
    answer: string;
}

interface Props {
    service: Service;
    relatedServices: RelatedService[];
    faqs: Faq[];
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

export default function Show({ service, relatedServices, faqs }: Props) {
    const featuresRef = useRef(null);
    const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });

    const processRef = useRef(null);
    const processInView = useInView(processRef, { once: true, margin: '-100px' });

    const relatedRef = useRef(null);
    const relatedInView = useInView(relatedRef, { once: true, margin: '-100px' });

    const faqsRef = useRef(null);
    const faqsInView = useInView(faqsRef, { once: true, margin: '-100px' });
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

    return (
        <PublicLayout>
            <SeoHead
                title={service.seo_title || service.name}
                description={service.seo_description || service.tagline}
                keywords={service.seo_keywords ?? undefined}
            />

            {/* Compact Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-14 pb-14">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Left Column */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All Services
                            </Link>

                            <Badge variant="secondary" className="mb-3 bg-white/15 text-white border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                                IT Service
                            </Badge>

                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                                {service.name}
                            </h1>

                            <p className="text-blue-200 text-base sm:text-lg mt-3 leading-relaxed">
                                {service.tagline}
                            </p>

                            {service.starting_price && (
                                <p className="text-sm text-gray-400 mt-3">
                                    Starting from{' '}
                                    <span className="text-white font-semibold">{service.starting_price}</span>
                                </p>
                            )}

                            <div className="mt-6 flex gap-4 flex-wrap">
                                <Link href="/get-quote">
                                    <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 font-semibold">
                                        Start Your Project
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            className="hidden lg:flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            <div className="w-32 h-32 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                <ServiceIcon name={service.icon} className="h-16 w-16 text-white/80" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="bg-white py-14">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-5">About This Service</h2>
                    <p className="text-[#0F172A]/65 leading-relaxed text-lg">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-[#F8FAFC] py-20" ref={featuresRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            Key Features
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                            What's Included
                        </h2>
                        <p className="mt-3 text-[#0F172A]/55 max-w-xl mx-auto">
                            Everything you need to succeed, built into every engagement.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                        variants={stagger}
                        initial="hidden"
                        animate={featuresInView ? 'visible' : 'hidden'}
                    >
                        {service.features.map((feature, i) => {
                            const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
                            return (
                                <motion.div
                                    key={feature.id}
                                    variants={fadeUp}
                                    className={`bg-white border border-gray-100 ${color.border} rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-0.5`}
                                >
                                    <div className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center mb-4`}>
                                        <CheckCircle2 className={`h-5 w-5 ${color.icon}`} />
                                    </div>
                                    <h3 className="font-semibold text-[#0F172A] mb-2">{feature.title}</h3>
                                    <p className="text-[#0F172A]/60 text-sm leading-relaxed">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="bg-white py-20" ref={processRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            Our Process
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                            How We Work
                        </h2>
                        <p className="mt-3 text-[#0F172A]/55 max-w-xl mx-auto">
                            A structured approach that ensures quality at every stage.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Vertical line */}
                            <motion.div
                                className="absolute left-6 top-0 w-0.5 bg-blue-100 hidden sm:block origin-top"
                                style={{ bottom: 0 }}
                                initial={{ scaleY: 0 }}
                                animate={processInView ? { scaleY: 1 } : {}}
                                transition={{ duration: 0.8 }}
                            />

                            {/* Steps */}
                            {service.process_steps.map((step, idx) => (
                                <motion.div
                                    key={step.id}
                                    className={`relative flex gap-6 ${idx < service.process_steps.length - 1 ? 'mb-10' : ''}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={processInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                                >
                                    {/* Step Number Bubble */}
                                    <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10">
                                        {step.step_number}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pt-2 pb-6 sm:pb-0">
                                        <h3 className="font-bold text-[#0F172A] text-base mb-2">{step.title}</h3>
                                        <p className="text-[#0F172A]/60 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <section className="bg-[#F8FAFC] py-20" ref={relatedRef}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                                Explore More
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                                Related Services
                            </h2>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
                            variants={stagger}
                            initial="hidden"
                            animate={relatedInView ? 'visible' : 'hidden'}
                        >
                            {relatedServices.map((s, i) => {
                                const color = SERVICE_COLORS[i % SERVICE_COLORS.length];
                                return (
                                    <motion.div key={s.id} variants={fadeUp}>
                                        <Link href={`/services/${s.slug}`}>
                                            <motion.div
                                                className={`group h-full border border-gray-100 ${color.border} rounded-2xl bg-white p-6 cursor-pointer`}
                                                whileHover={{ y: -4, boxShadow: '0 14px 32px rgba(37,99,235,0.12)' }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                            >
                                                <div className={`w-10 h-10 rounded-xl ${color.bg} group-hover:bg-[#2563EB] flex items-center justify-center mb-3 transition-colors`}>
                                                    <ServiceIcon name={s.icon} className={`h-5 w-5 ${color.icon} group-hover:text-white transition-colors`} />
                                                </div>
                                                <h3 className="font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-1">
                                                    {s.name}
                                                </h3>
                                                <p className="text-[#0F172A]/60 text-sm leading-relaxed">
                                                    {s.tagline}
                                                </p>
                                                <div className="flex items-center gap-1 text-[#2563EB] mt-2">
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
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
                <section className="py-20 bg-white" ref={faqsRef}>
                    <div className="max-w-3xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                                FAQ
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={faqsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    className="border border-gray-100 rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                        className="w-full flex items-center justify-between px-6 py-4 text-left bg-[#F8FAFC] hover:bg-blue-50 transition-colors"
                                    >
                                        <span className="font-semibold text-[#0F172A]">{faq.question}</span>
                                        <motion.div animate={{ rotate: openFaq === faq.id ? 180 : 0 }} transition={{ duration: 0.25 }}>
                                            <ChevronDown className="h-5 w-5 text-[#0F172A]/50" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {openFaq === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
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

            {/* CTA — premium dark gradient with pattern */}
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
                        Ready to Get Started with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">{service.name}</span>?
                    </h2>
                    <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Let's discuss your project and build something great together.
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
