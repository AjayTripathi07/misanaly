import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { ServiceIcon } from '@/Components/ServiceIcon';
import { CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

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

export default function Index({ services }: Props) {
    return (
        <PublicLayout>
            <Head title="Our Services" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F4FD] via-white to-[#F0F7FF] pt-20 pb-24">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                        What We Offer
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                        Our Services
                    </h1>
                    <p className="text-lg text-[#0F172A]/60 max-w-2xl mx-auto mt-5">
                        From web and mobile development to AI solutions and cloud infrastructure — we deliver end-to-end technology services.
                    </p>

                    {/* Stats Row */}
                    <div className="inline-flex flex-wrap bg-white/80 rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mt-10 mx-auto divide-x divide-gray-100">
                        <div className="text-center px-5">
                            <p className="text-2xl font-bold text-[#2563EB]">10+</p>
                            <p className="text-xs text-[#0F172A]/60 mt-0.5">Services</p>
                        </div>
                        <div className="text-center px-5">
                            <p className="text-2xl font-bold text-[#2563EB]">50+</p>
                            <p className="text-xs text-[#0F172A]/60 mt-0.5">Clients Served</p>
                        </div>
                        <div className="text-center px-5">
                            <p className="text-2xl font-bold text-[#2563EB]">3+</p>
                            <p className="text-xs text-[#0F172A]/60 mt-0.5">Years Experience</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="bg-[#F8FAFC] py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                            All Services
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                            Everything You Need
                        </h2>
                        <p className="mt-3 text-[#0F172A]/55 max-w-xl mx-auto">
                            Choose the service that fits your needs, or combine several for a complete digital transformation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {services.map((service) => (
                            <Link key={service.id} href={`/services/${service.slug}`}>
                                <Card className="group h-full bg-white border border-gray-100 hover:border-[#2563EB]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                    <CardContent className="p-7 flex flex-col h-full">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-[#2563EB] flex items-center justify-center mb-5 transition-colors">
                                            <ServiceIcon name={service.icon} className="h-7 w-7 text-[#2563EB] group-hover:text-white transition-colors" />
                                        </div>

                                        {/* Name */}
                                        <h3 className="font-bold text-[#0F172A] text-lg group-hover:text-[#2563EB] transition-colors mb-2">
                                            {service.name}
                                        </h3>

                                        {/* Tagline */}
                                        <p className="text-[#0F172A]/55 text-sm leading-relaxed">
                                            {service.tagline}
                                        </p>

                                        {/* Starting Price */}
                                        {service.starting_price && (
                                            <p className="mt-2 text-xs font-semibold text-[#2563EB]">
                                                From {service.starting_price}
                                            </p>
                                        )}

                                        {/* Features */}
                                        {service.features && service.features.length > 0 && (
                                            <ul className="mt-4 space-y-2">
                                                {service.features.slice(0, 3).map((feature) => (
                                                    <li key={feature.id} className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                        <span className="text-xs text-[#0F172A]/60">{feature.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Learn More */}
                                        <div className="mt-auto pt-4 flex items-center gap-1 text-[#2563EB] text-sm font-semibold">
                                            Learn More
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#0F172A] py-16 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold">Not sure which service you need?</h2>
                    <p className="text-gray-400 mt-2">Talk to our experts for a free consultation.</p>
                    <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/get-quote">
                            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 font-semibold">
                                Get a Quote
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
