import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
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
import { Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    products: { id: number; name: string }[];
}

export default function RequestDemo({ products }: Props) {
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
            <SeoHead
                title="Request a Demo"
                description="See our software products in action — request a free demo of Bank2Books and our other tools today."
            />

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#E8F4FD] via-white to-[#F0F7FF] py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <Badge className="mb-4">See It Live</Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] mb-4">
                        Request a Demo
                    </h1>
                    <p className="text-lg text-[#0F172A]/60">
                        Schedule a personalised walkthrough of our products.
                    </p>
                </div>
            </section>

            {/* Two-column layout */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Left col: What to Expect */}
                    <div>
                        <h2 className="font-bold text-xl text-[#0F172A] mb-6">What to Expect</h2>

                        <div className="flex items-start gap-3 mb-5">
                            <CheckCircle2 className="h-5 w-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-[#0F172A] text-sm">Personalised Walkthrough</p>
                                <p className="text-[#0F172A]/60 text-sm mt-1">
                                    30-minute session tailored to your specific use case and questions.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mb-5">
                            <CheckCircle2 className="h-5 w-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-[#0F172A] text-sm">Live Q&amp;A</p>
                                <p className="text-[#0F172A]/60 text-sm mt-1">
                                    Ask our product experts anything about features, pricing, and implementation.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mb-5">
                            <CheckCircle2 className="h-5 w-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-[#0F172A] text-sm">Free of Charge</p>
                                <p className="text-[#0F172A]/60 text-sm mt-1">
                                    No commitment, no credit card required. Just your time and curiosity.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 mt-6">
                            <p className="text-sm text-[#2563EB]">
                                Demo sessions are available Monday–Friday, 10AM–5PM IST.
                            </p>
                        </div>
                    </div>

                    {/* Right col: Form */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Schedule Your Demo</h2>

                        {recentlySuccessful && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-3 py-6 text-center mb-6"
                            >
                                <div className="animate-success-pop">
                                    <CheckCircle2 className="h-16 w-16 text-[#10B981]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A]">Message sent!</h3>
                                <p className="text-[#0F172A]/60 text-sm">We'll get back to you within 24 hours.</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            {/* name + email */}
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

                            {/* phone + company */}
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

                            {/* Product select */}
                            <div>
                                <Label htmlFor="product_id">Product You're Interested In</Label>
                                <Select
                                    value={data.product_id}
                                    onValueChange={v => {
                                        setData('product_id', v);
                                        setData('lead_type', 'product');
                                    }}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map(p => (
                                            <SelectItem key={p.id} value={String(p.id)}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.product_id && <p className="text-red-500 text-xs mt-1">{errors.product_id}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <Label htmlFor="message">Anything Specific You'd Like to See?</Label>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="mt-1"
                                    placeholder="Any specific features you'd like to see?"
                                    rows={3}
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                                disabled={processing}
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Request Demo
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
