import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProductFeature {
    id: number;
    title: string;
    description: string;
    icon: string | null;
}

interface Product {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    pricing_model: string;
    demo_url: string | null;
    features?: ProductFeature[];
}

interface Props {
    products: Product[];
}

export default function ProductsIndex({ products }: Props) {
    return (
        <PublicLayout>
            <SeoHead
                title="Our Software Products"
                description="Discover MSI Analytics software products including Bank2Books — built for CA firms and finance teams across India."
                keywords="Bank2Books, bank statement to Tally, CA firm software, accounting automation, MSI Analytics products"
            />

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#E8F4FD] via-white to-[#F0F7FF] pt-20 pb-24 relative overflow-hidden text-center">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                        Software Products
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                        Our Products
                    </h1>
                    <p className="text-lg text-[#0F172A]/60 mt-4 max-w-2xl mx-auto">
                        Purpose-built software products designed for specific industries and workflows.
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="bg-[#F8FAFC] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Heading */}
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            Available Products
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                            Built for Real Business Problems
                        </h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-2xl mx-auto">
                            Each product is the result of years of industry experience and direct client feedback.
                        </p>
                    </div>

                    {/* Product Cards */}
                    <div className="space-y-8">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                            >
                                <CardContent className="p-0 overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-5">
                                        {/* Left Panel */}
                                        <div className="lg:col-span-2 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white p-10 flex flex-col justify-between">
                                            <div>
                                                <Badge className="mb-4 bg-white/15 text-white border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                                                    {product.pricing_model}
                                                </Badge>
                                                <h2 className="text-2xl font-bold">{product.name}</h2>
                                                <p className="text-blue-200 text-sm mt-3 leading-relaxed">
                                                    {product.tagline}
                                                </p>
                                            </div>
                                            <div className="mt-8 flex gap-3 flex-wrap">
                                                <Link href={`/products/${product.slug}`}>
                                                    <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full text-sm">
                                                        Learn More
                                                    </Button>
                                                </Link>
                                                <Link href={`/request-demo?product=${product.id}`}>
                                                    <Button
                                                        variant="outline"
                                                        className="border-white/30 text-white hover:bg-white/10 rounded-full text-sm bg-transparent"
                                                    >
                                                        Request Demo
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Right Panel */}
                                        <div className="lg:col-span-3 p-10">
                                            <h3 className="font-semibold text-[#0F172A] mb-4">Key Features</h3>
                                            {product.features && product.features.length > 0 && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {product.features.map((feature) => (
                                                        <div key={feature.id} className="flex items-start gap-3">
                                                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <div>
                                                                <p className="font-medium text-[#0F172A] text-sm">
                                                                    {feature.title}
                                                                </p>
                                                                <p className="text-[#0F172A]/55 text-xs mt-0.5">
                                                                    {feature.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <p className="mt-6 text-[#0F172A]/60 text-sm leading-relaxed line-clamp-3">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
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
