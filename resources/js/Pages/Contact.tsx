import { Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
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
                title="Contact Us"
                description="Get in touch with MSI Analytics for your IT service needs or product inquiries. We respond within 24 hours."
            />

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#E8F4FD] via-white to-[#F0F7FF] py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <Badge className="mb-4">Get In Touch</Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-[#0F172A]/60">
                        We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Two-column layout */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">

                    {/* Left col */}
                    <div className="lg:col-span-2">
                        <h2 className="font-bold text-xl text-[#0F172A] mb-6">Get in Touch</h2>

                        {/* Email */}
                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                                <Mail className="h-5 w-5 text-[#2563EB]" />
                            </div>
                            <div>
                                <p className="text-xs text-[#0F172A]/50 font-medium mb-1">Email</p>
                                <a
                                    href="mailto:info@misanaly.in"
                                    className="text-[#0F172A] text-sm hover:text-[#2563EB] transition-colors"
                                >
                                    info@misanaly.in
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                                <Phone className="h-5 w-5 text-[#2563EB]" />
                            </div>
                            <div>
                                <p className="text-xs text-[#0F172A]/50 font-medium mb-1">Phone</p>
                                <p className="text-[#0F172A] text-sm">+91-XXXXXXXXXX</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="h-5 w-5 text-[#2563EB]" />
                            </div>
                            <div>
                                <p className="text-xs text-[#0F172A]/50 font-medium mb-1">Location</p>
                                <p className="text-[#0F172A] text-sm">Delhi, India</p>
                            </div>
                        </div>

                        {/* Business hours */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 mt-2">
                            <h3 className="font-semibold text-[#0F172A] text-sm mb-3">Business Hours</h3>
                            <p className="text-sm text-[#0F172A]/60">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p className="text-sm text-[#0F172A]/60">Saturday: 10:00 AM - 2:00 PM</p>
                        </div>
                    </div>

                    {/* Right col */}
                    <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Send Us a Message</h2>

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

                            <div>
                                <Label htmlFor="message">Message *</Label>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="mt-1"
                                    placeholder="How can we help you?"
                                    rows={5}
                                    required
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <input type="hidden" value="general" onChange={() => {}} />

                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                                disabled={processing}
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
