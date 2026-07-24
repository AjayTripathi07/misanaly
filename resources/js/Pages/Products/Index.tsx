import { Link } from '@inertiajs/react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import StatementSimulatorPreview from '@/Components/Products/StatementSimulatorPreview';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { CheckCircle2, ArrowRight, Rocket, Star, Package, Sparkles } from 'lucide-react';
import { type Product } from '@/types';

interface Props {
    products: Product[];
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const FLAGSHIP_STATS = [
    { value: 10, suffix: '+', label: 'CA Firms', suffixClass: '' },
    { value: 100, suffix: '+', label: 'Bank Formats', suffixClass: '' },
    { value: 98.7, suffix: '%', label: 'Accuracy Rate', suffixClass: '' },
    { value: 3, suffix: 'hrs', label: 'Saved Daily', suffixClass: 'font-sans align-middle ml-1 text-lg sm:text-xl' },
];

export default function ProductsIndex({ products }: Props) {
    const featured = products.find((p) => p.is_featured) ?? products[0] ?? null;
    const rest = products.filter((p) => p.id !== featured?.id);

    const spotlightRef = useRef(null);
    const spotlightInView = useInView(spotlightRef, { once: true, margin: '-100px' });
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ once: true });
    const gridRef = useRef(null);
    const gridInView = useInView(gridRef, { once: true, margin: '-100px' });

    return (
        <PublicLayout>
            <SeoHead
                title="Our Software Products"
                description="Discover NobelIQ Technologies software products including Statement2Books — built for CA firms and finance teams across India."
                keywords="Statement2Books, bank statement to Tally, CA firm software, accounting automation, NobelIQ Technologies products"
            />

            {/* Compact header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0F172A]/40">
                    Products {products.length > 0 && <span className="text-[#0F172A]/25">· {products.length} available</span>}
                </p>
            </div>

            {/* Featured Product Spotlight */}
            {featured && (
                <section
                    ref={spotlightRef}
                    className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white mt-4 mx-4 sm:mx-6 lg:mx-8 rounded-3xl"
                >
                    {/* Decorative floating blobs */}
                    <motion.div
                        className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />

                    <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={spotlightInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                                <Star className="h-3 w-3 fill-orange-300" />
                                Our Flagship Product
                            </span>

                            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                                Meet{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    {featured.name}
                                </span>
                            </h2>

                            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-lg">
                                {featured.tagline}
                            </p>

                            {featured.features && featured.features.length > 0 && (
                                <motion.ul
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8"
                                    variants={stagger}
                                    initial="hidden"
                                    animate={spotlightInView ? 'visible' : 'hidden'}
                                >
                                    {featured.features.slice(0, 4).map((f) => (
                                        <motion.li key={f.id} variants={fadeUp} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-[#10B981] flex-shrink-0" />
                                            <span className="font-semibold text-white text-sm">{f.title}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href={`/products/${featured.slug}`}>
                                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 shadow-xl shadow-orange-900/40 font-semibold text-white">
                                        Explore {featured.name}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={`/products/${featured.slug}#waitlist`}>
                                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent font-semibold">
                                        <Rocket className="mr-2 h-4 w-4" />
                                        Join Waitlist
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex justify-center lg:justify-end"
                            initial={{ opacity: 0, x: 30 }}
                            animate={spotlightInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            {featured.slug === 'statement2books' ? (
                                <StatementSimulatorPreview />
                            ) : (
                                <div className="w-full max-w-md aspect-square rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                                    <Sparkles className="h-16 w-16 text-blue-300" />
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Stats strip — reused from the Statement2Books product page for consistency */}
                    {featured.slug === 'statement2books' && (
                        <div ref={statsRef} className="relative border-t border-white/10 py-10">
                            <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {FLAGSHIP_STATS.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <p className="font-mono text-2xl sm:text-3xl font-bold text-white">
                                            <NumberFlow value={statsVisible ? stat.value : 0} />
                                            <span className={stat.suffixClass}>{stat.suffix}</span>
                                        </p>
                                        <p className="text-gray-400 text-xs sm:text-sm mt-1.5">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* All Products Grid */}
            <section className="bg-[#F8FAFC] py-20 mt-4" ref={gridRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            All Products
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                            Built for Real Business Problems
                        </h2>
                    </div>

                    <motion.div
                        className={
                            products.length === 1
                                ? 'grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto'
                                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                        }
                        variants={stagger}
                        initial="hidden"
                        animate={gridInView ? 'visible' : 'hidden'}
                    >
                        {products.map((product) => (
                            <motion.div key={product.id} variants={fadeUp}>
                                <Link href={`/products/${product.slug}`}>
                                    <motion.div
                                        className="group h-full border border-gray-100 rounded-2xl bg-white p-6 cursor-pointer flex flex-col"
                                        whileHover={{ y: -4, boxShadow: '0 14px 32px rgba(37,99,235,0.12)' }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
                                                <Package className="h-5 w-5 text-[#2563EB]" />
                                            </div>
                                            {product.is_featured && (
                                                <Badge className="bg-orange-50 text-orange-600 border-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1">
                                                    <Star className="h-3 w-3 mr-1 fill-orange-500" />
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-[#0F172A] text-lg">{product.name}</h3>
                                        <p className="text-[#0F172A]/55 text-sm mt-1">{product.tagline}</p>

                                        {product.features && product.features.length > 0 && (
                                            <ul className="mt-4 space-y-2 flex-1">
                                                {product.features.slice(0, 3).map((f) => (
                                                    <li key={f.id} className="flex items-center gap-2 text-xs text-[#0F172A]/70">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                                        {f.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="mt-5 flex items-center gap-1 text-[#2563EB] text-sm font-medium">
                                            Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}

                        {products.length === 1 && (
                            <motion.div variants={fadeUp}>
                                <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-[#0F172A]/40 min-h-[220px]">
                                    <Package className="h-8 w-8 mb-3" />
                                    <p className="text-sm font-medium">More products coming soon</p>
                                    <p className="text-xs mt-1 max-w-[180px]">We're building the next addition to the lineup.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* CTA Strip */}
            <section className="bg-[#0F172A] py-16 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold">Need a Custom Solution Instead?</h2>
                    <p className="text-gray-400 mt-2 mb-6">
                        Our bespoke software development service is designed exactly for you.
                    </p>
                    <Link href="/services/custom-software-development">
                        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8">
                            View Custom Development
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
