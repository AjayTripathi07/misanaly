import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { ServiceIcon } from '@/Components/ServiceIcon';
import { CheckCircle2, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

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

interface Props {
    service: Service;
    relatedServices: RelatedService[];
}

export default function Show({ service, relatedServices }: Props) {
    return (
        <PublicLayout>
            <Head title={service.name} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-24">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Left Column */}
                        <div>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All Services
                            </Link>

                            <Badge variant="secondary" className="mb-4 bg-white/15 text-white border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                                IT Service
                            </Badge>

                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                                {service.name}
                            </h1>

                            <p className="text-blue-200 text-lg mt-4 leading-relaxed">
                                {service.tagline}
                            </p>

                            {service.starting_price && (
                                <p className="text-sm text-gray-400 mt-3">
                                    Starting from{' '}
                                    <span className="text-white font-semibold">{service.starting_price}</span>
                                </p>
                            )}

                            <div className="mt-8 flex gap-4 flex-wrap">
                                <Link href="/get-quote">
                                    <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8 font-semibold">
                                        Get a Quote
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="w-40 h-40 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                <ServiceIcon name={service.icon} className="h-20 w-20 text-white/80" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-5">About This Service</h2>
                    <p className="text-[#0F172A]/65 leading-relaxed text-lg">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-[#F8FAFC] py-20">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {service.features.map((feature) => (
                            <Card
                                key={feature.id}
                                className="bg-white border border-gray-100 hover:border-[#2563EB]/30 hover:shadow-sm transition-all"
                            >
                                <CardContent className="p-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="h-5 w-5 text-[#2563EB]" />
                                    </div>
                                    <h3 className="font-semibold text-[#0F172A] mb-2">{feature.title}</h3>
                                    <p className="text-[#0F172A]/60 text-sm leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="bg-white py-20">
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
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-100 hidden sm:block" />

                            {/* Steps */}
                            {service.process_steps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    className={`relative flex gap-6 ${idx < service.process_steps.length - 1 ? 'mb-10' : ''}`}
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <section className="bg-[#F8FAFC] py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <Badge variant="secondary" className="mb-3 bg-blue-50 text-[#2563EB] border-0 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                                Explore More
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                                Related Services
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                            {relatedServices.map((s) => (
                                <Link key={s.id} href={`/services/${s.slug}`}>
                                    <Card className="group cursor-pointer bg-white border border-gray-100 hover:border-[#2563EB]/40 hover:shadow-md hover:-translate-y-0.5 transition-all h-full">
                                        <CardContent className="p-6">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-[#2563EB] flex items-center justify-center mb-3 transition-colors">
                                                <ServiceIcon name={s.icon} className="h-5 w-5 text-[#2563EB] group-hover:text-white transition-colors" />
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
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-[#2563EB] py-16 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold">
                        Ready to Get Started with {service.name}?
                    </h2>
                    <p className="text-blue-200 mt-2">
                        Let's discuss your project and build something great together.
                    </p>
                    <div className="mt-8">
                        <Link href="/get-quote">
                            <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 font-semibold">
                                Get a Quote
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
