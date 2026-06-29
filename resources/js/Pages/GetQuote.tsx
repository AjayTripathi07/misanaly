import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/Components/ui/select';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
    services: { id: number; name: string }[];
}

export default function GetQuote({ services }: Props) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        lead_type: 'general' as 'general' | 'service' | 'product',
        service_id: '',
        product_id: '',
        budget_range: '',
        timeline: '',
        source: 'website',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('leads.store'), { onSuccess: () => reset() });
    }

    return (
        <PublicLayout>
            <Head title="Get a Quote" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#E8F4FD] via-white to-[#F0F7FF] py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <Badge className="mb-4">Free Consultation</Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] mb-4">
                        Get a Quote
                    </h1>
                    <p className="text-lg text-[#0F172A]/60">
                        Tell us about your project and we'll get back with a detailed proposal.
                    </p>
                </div>
            </section>

            {/* Form section */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Project Details</h2>
                        <p className="text-[#0F172A]/60 text-sm mb-6">
                            Fill in the details below and our team will prepare a tailored proposal for you.
                        </p>

                        {recentlySuccessful && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 mb-6">
                                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <p className="text-green-700 text-sm font-medium">
                                    Thank you! We'll get back to you within 24 hours.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid gap-5">
                            {/* Row 1: name + email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1"
                                        placeholder="Your name"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="mt-1"
                                        placeholder="you@example.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Row 2: phone + company */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="mt-1"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={e => setData('company', e.target.value)}
                                        className="mt-1"
                                        placeholder="Your company name"
                                    />
                                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                                </div>
                            </div>

                            {/* Service dropdown */}
                            <div>
                                <Label htmlFor="service_id">Service Interested In</Label>
                                <Select
                                    value={data.service_id}
                                    onValueChange={v => {
                                        setData('service_id', v);
                                        setData('lead_type', 'service');
                                    }}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.map(s => (
                                            <SelectItem key={s.id} value={String(s.id)}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.service_id && <p className="text-red-500 text-xs mt-1">{errors.service_id}</p>}
                            </div>

                            {/* Row 3: budget + timeline */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="budget_range">Budget Range</Label>
                                    <Select
                                        value={data.budget_range}
                                        onValueChange={v => setData('budget_range', v)}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select budget" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="under-50k">Under ₹50K</SelectItem>
                                            <SelectItem value="50k-2l">₹50K - ₹2L</SelectItem>
                                            <SelectItem value="2l-5l">₹2L - ₹5L</SelectItem>
                                            <SelectItem value="5l-plus">₹5L+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.budget_range && <p className="text-red-500 text-xs mt-1">{errors.budget_range}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="timeline">Timeline</Label>
                                    <Select
                                        value={data.timeline}
                                        onValueChange={v => setData('timeline', v)}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select timeline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="asap">ASAP</SelectItem>
                                            <SelectItem value="1-3-months">1-3 Months</SelectItem>
                                            <SelectItem value="3-6-months">3-6 Months</SelectItem>
                                            <SelectItem value="6-plus-months">6+ Months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <Label htmlFor="message">Project Description *</Label>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="mt-1"
                                    placeholder="Describe your project requirements..."
                                    rows={4}
                                    required
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                                disabled={processing}
                            >
                                Request a Quote
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
