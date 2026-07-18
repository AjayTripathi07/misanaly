import { Link } from '@inertiajs/react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import BrandName from '@/Components/BrandName';
import { LinkedinIcon } from '@/Components/icons/SocialIcons';
import {
    Users,
    Lightbulb,
    Clock,
    LifeBuoy,
    Target,
    Heart,
    Award,
    Handshake,
    Shield,
    ArrowRight,
    CheckCircle2,
} from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo: string | null;
    linkedin_url: string | null;
}

interface Props {
    teamMembers: TeamMember[];
}

const whyUsItems = [
    { icon: Users, title: 'Expert Team', desc: 'Skilled professionals across web, mobile, AI, and cloud.' },
    { icon: Award, title: 'Proven Track Record', desc: '50+ projects delivered successfully across industries.' },
    { icon: Lightbulb, title: 'Innovation First', desc: "We stay ahead of technology trends so you don't have to." },
    { icon: Clock, title: 'On-Time Delivery', desc: 'We respect your deadlines with agile, milestone-driven delivery.' },
    { icon: LifeBuoy, title: '24/7 Support', desc: 'Round-the-clock support for critical systems.' },
    { icon: Target, title: 'Goal-Oriented', desc: 'Every decision we make is aligned with your business objectives.' },
    { icon: Heart, title: 'Client-Centric', desc: 'Your success is our success. We go the extra mile, every time.' },
    { icon: Handshake, title: 'Long-term Partnership', desc: 'We build relationships, not just software.' },
];

const values = [
    { icon: Shield, title: 'Integrity', desc: 'We operate with complete transparency and honesty in everything we do.' },
    { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards in code quality, design, and service.' },
    { icon: Lightbulb, title: 'Innovation', desc: 'We constantly explore new technologies to bring fresh perspectives to old problems.' },
    { icon: Target, title: 'Impact', desc: 'We measure our success by the tangible business outcomes we create for clients.' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

/* Shared accent palette — matches the SERVICE_COLORS rotation used on Home/Services */
const ACCENT_COLORS = [
    { bg: 'bg-blue-500/10', icon: 'text-[#2563EB]', border: 'border-blue-500/20', ring: 'ring-blue-500/25', grad: 'from-blue-400 to-blue-600' },
    { bg: 'bg-teal-500/10', icon: 'text-[#0D9488]', border: 'border-teal-500/20', ring: 'ring-teal-500/25', grad: 'from-teal-400 to-teal-600' },
    { bg: 'bg-violet-500/10', icon: 'text-[#6366F1]', border: 'border-violet-500/20', ring: 'ring-violet-500/25', grad: 'from-violet-400 to-violet-600' },
    { bg: 'bg-amber-500/10', icon: 'text-[#D97706]', border: 'border-amber-500/20', ring: 'ring-amber-500/25', grad: 'from-amber-400 to-amber-600' },
];

export default function About({ teamMembers }: Props) {
    const teamRef = useRef(null);
    const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

    const whyRef = useRef(null);
    const whyInView = useInView(whyRef, { once: true, margin: '-100px' });

    const valuesRef = useRef(null);
    const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });

    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

    const whyRows = [whyUsItems.slice(0, 4), whyUsItems.slice(4, 8)];

    return (
        <PublicLayout>
            <SeoHead
                title="About Us"
                description="Learn about NobelIQ Technologies — our mission, team, and commitment to delivering quality IT solutions and software products for Indian businesses."
            />

            {/* Compact Hero */}
            <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-14 pb-14 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <Badge className="mb-4 bg-white/15 border-0 text-white">Our Story</Badge>
                    <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                        Building the Future of Business Technology
                    </h1>
                    <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
                        We are a team of passionate technologists dedicated to empowering Indian businesses
                        with world-class digital solutions that drive real growth.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-white py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-4">
                    <div className="rounded-2xl bg-[#F8FAFC] p-8 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center mb-4">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="font-bold text-xl text-[#0F172A]">Our Mission</h2>
                        <p className="text-[#0F172A]/60 leading-relaxed mt-3">
                            To empower businesses of all sizes with cutting-edge technology solutions that are
                            accessible, affordable, and built for the Indian market.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8FAFC] p-8 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center mb-4">
                            <Lightbulb className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="font-bold text-xl text-[#0F172A]">Our Vision</h2>
                        <p className="text-[#0F172A]/60 leading-relaxed mt-3">
                            To be India's most trusted IT partner, known for delivering innovative solutions
                            that create measurable impact for every client we serve.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team section */}
            <section className="bg-[#F8FAFC] py-20" ref={teamRef}>
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                            The People
                        </span>
                        <h2 className="text-3xl font-bold text-[#0F172A]">Meet Our Team</h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            The talented individuals behind <BrandName accent={false} className="text-inherit" /> who make it all happen.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                        variants={stagger}
                        initial="hidden"
                        animate={teamInView ? 'visible' : 'hidden'}
                    >
                        {teamMembers.map((member, i) => {
                            const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
                            return (
                                <motion.div key={member.id} variants={fadeUp} className="h-full">
                                    <motion.div
                                        className={`group h-full bg-white border border-gray-100 hover:border-transparent rounded-2xl overflow-hidden flex flex-col transition-colors`}
                                        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15,23,42,0.12)' }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    >
                                        {/* Top accent bar */}
                                        <div className={`h-1.5 w-full bg-gradient-to-r ${color.grad}`} />

                                        <div className="flex-1 flex flex-col items-center text-center px-6 pt-8 pb-6">
                                            {/* Avatar */}
                                            <div className={`w-24 h-24 rounded-full ring-4 ${color.ring} border-2 border-white shadow-md overflow-hidden flex-shrink-0`}>
                                                {member.photo ? (
                                                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <img
                                                        src="/images/team/placeholder-avatar.png"
                                                        alt={member.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>

                                            <h3 className="font-bold text-[#0F172A] text-lg mt-4">{member.name}</h3>
                                            <p className={`text-sm font-semibold mt-0.5 ${color.icon}`}>{member.role}</p>
                                            <p className="text-[#0F172A]/60 text-sm mt-3 leading-relaxed line-clamp-4">
                                                {member.bio}
                                            </p>

                                            {member.linkedin_url && (
                                                <a
                                                    href={member.linkedin_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`mt-auto pt-4 inline-flex items-center justify-center w-9 h-9 rounded-full ${color.bg} ${color.icon} hover:scale-110 transition-transform`}
                                                    aria-label={`${member.name} on LinkedIn`}
                                                >
                                                    <LinkedinIcon className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us — connected path, reused from Home's "Why Choose Us" pattern, split into two rows for 8 items */}
            <section className="py-20 sm:py-24 bg-white overflow-hidden" ref={whyRef}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={whyInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                            Why Us
                        </span>
                        <h2 className="text-3xl font-bold text-[#0F172A]">
                            8 Reasons to Choose <BrandName accent={false} className="text-inherit font-bold" />
                        </h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            We bring together expertise, commitment, and results to every engagement.
                        </p>
                    </motion.div>

                    {/* ── Desktop: two connected path rows (S-curve) ── */}
                    <div className="hidden md:block space-y-4">
                        {whyRows.map((row, rowIdx) => (
                            <div key={rowIdx} className={`flex items-start ${rowIdx === 1 ? 'flex-row-reverse justify-between' : 'justify-between'}`}>
                                {row.map((item, j) => {
                                    const globalIdx = rowIdx * 4 + j;
                                    const color = ACCENT_COLORS[globalIdx % ACCENT_COLORS.length];
                                    const isLastInRow = j === row.length - 1;
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className={isLastInRow ? 'flex items-start flex-shrink-0' : `flex items-start flex-1 ${rowIdx === 1 ? 'flex-row-reverse' : ''}`}>
                                            <motion.div
                                                className="flex flex-col items-center text-center w-36 lg:w-44 group/node"
                                                initial={{ opacity: 0, y: 24 }}
                                                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ duration: 0.5, delay: globalIdx * 0.1 }}
                                            >
                                                <div className="relative">
                                                    <motion.div
                                                        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full ${color.bg} border-2 ${color.border} flex items-center justify-center shadow-sm transition-transform duration-200 group-hover/node:scale-110`}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        <Icon className={`h-7 w-7 lg:h-8 lg:w-8 ${color.icon}`} />
                                                    </motion.div>
                                                    <motion.span
                                                        className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 ${color.border} ${color.icon} text-[11px] font-bold flex items-center justify-center`}
                                                        initial={{ scale: 0 }}
                                                        animate={whyInView ? { scale: 1 } : {}}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: globalIdx * 0.1 + 0.2 }}
                                                    >
                                                        {globalIdx + 1}
                                                    </motion.span>
                                                </div>
                                                <h3 className="text-sm lg:text-base font-bold text-[#0F172A] mt-4">{item.title}</h3>
                                                <p className="text-[#0F172A]/55 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                                            </motion.div>

                                            {!isLastInRow && (
                                                <motion.div
                                                    className="h-0.5 flex-1 mt-8 lg:mt-10 bg-gradient-to-r from-[#2563EB] to-violet-500 origin-left"
                                                    initial={{ scaleX: 0 }}
                                                    animate={whyInView ? { scaleX: 1 } : {}}
                                                    transition={{ duration: 0.5, delay: globalIdx * 0.1 + 0.3 }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        {/* Connector between the two rows, dropping from the end of row 1 to the start of row 2 */}
                        <div className="flex justify-end pr-[52px] lg:pr-[68px] -my-2 pointer-events-none">
                            <motion.div
                                className="w-0.5 h-8 bg-gradient-to-b from-[#2563EB] to-violet-500 origin-top"
                                initial={{ scaleY: 0 }}
                                animate={whyInView ? { scaleY: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.45 }}
                            />
                        </div>
                    </div>

                    {/* ── Mobile/tablet: single vertical path ── */}
                    <div className="md:hidden relative">
                        <motion.div
                            className="absolute left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#2563EB] to-violet-500 origin-top"
                            initial={{ scaleY: 0 }}
                            animate={whyInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 0.8 }}
                        />
                        <div className="space-y-10">
                            {whyUsItems.map((item, i) => {
                                const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.title}
                                        className="relative flex gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={whyInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                    >
                                        <div className="relative flex-shrink-0 z-10">
                                            <div className={`w-10 h-10 rounded-full ${color.bg} border-2 ${color.border} flex items-center justify-center shadow-sm`}>
                                                <Icon className={`h-5 w-5 ${color.icon}`} />
                                            </div>
                                            <span className={`absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-white border ${color.border} ${color.icon} text-[9px] font-bold flex items-center justify-center`}>
                                                {i + 1}
                                            </span>
                                        </div>
                                        <div className="pt-1">
                                            <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
                                            <p className="text-[#0F172A]/55 text-sm mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values section */}
            <section className="bg-[#F8FAFC] py-20" ref={valuesRef}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-4">
                        <Badge className="mb-4">Our Values</Badge>
                        <h2 className="text-3xl font-bold text-[#0F172A]">What We Stand For</h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            Our values guide every decision, every line of code, and every client interaction.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
                        variants={stagger}
                        initial="hidden"
                        animate={valuesInView ? 'visible' : 'hidden'}
                    >
                        {values.map((value, i) => {
                            const Icon = value.icon;
                            const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
                            return (
                                <motion.div key={value.title} variants={fadeUp}>
                                    <Card className="bg-white border border-gray-100 p-8 rounded-2xl text-center h-full">
                                        <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center mx-auto mb-4`}>
                                            <Icon className={`h-6 w-6 ${color.icon}`} />
                                        </div>
                                        <h3 className="font-bold text-[#0F172A] mb-2">{value.title}</h3>
                                        <p className="text-[#0F172A]/60 text-sm leading-relaxed">{value.desc}</p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

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
                    className="relative max-w-2xl mx-auto px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
                        Work{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">With Us</span>
                    </h2>
                    <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Join 50+ businesses that trust <BrandName variant="onDark" accent={false} className="text-inherit" /> to power their technology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/get-quote">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                                <Button size="lg" className="bg-white text-[#2563EB] hover:bg-gray-50 rounded-full px-10 shadow-xl shadow-blue-950/30 font-bold text-base">
                                    Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/contact">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                                <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 bg-transparent font-semibold">
                                    Say Hello
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
