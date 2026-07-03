import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Star } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface TestimonialRecord {
    id: number;
    name: string;
    company: string;
    role: string;
    quote: string;
    photo: string | null;
    rating: number;
    service_id: number | null;
    product_id: number | null;
}

interface ServiceOption {
    id: number;
    name: string;
}

interface ProductOption {
    id: number;
    name: string;
}

interface Props {
    testimonial: TestimonialRecord;
    services: ServiceOption[];
    products: ProductOption[];
}

interface FormFields {
    name: string;
    company: string;
    role: string;
    quote: string;
    photo: string;
    rating: number;
    service_id: string;
    product_id: string;
}

export default function TestimonialsEdit({ testimonial, services, products }: Props) {
    const { data, setData, put, processing, errors } = useForm<FormFields>({
        name: testimonial.name,
        company: testimonial.company,
        role: testimonial.role,
        quote: testimonial.quote,
        photo: testimonial.photo ?? '',
        rating: testimonial.rating,
        service_id: testimonial.service_id ? String(testimonial.service_id) : '',
        product_id: testimonial.product_id ? String(testimonial.product_id) : '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.testimonials.update', testimonial.id));
    }

    return (
        <AdminLayout title="Edit Testimonial">
            <Head title="Edit Testimonial" />

            <div className="mb-6">
                <Link href={route('admin.testimonials.index')} className="inline-flex items-center gap-1.5 text-sm text-[#0F172A]/50 hover:text-[#0F172A] transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Testimonials
                </Link>
                <h2 className="text-xl font-bold text-[#0F172A] mt-2">Edit: {testimonial.name}</h2>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
                            <Input
                                id="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                            />
                            {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                        </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-1.5">
                        <Label htmlFor="role">Role / Title <span className="text-red-500">*</span></Label>
                        <Input
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                        />
                        {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                    </div>

                    {/* Quote */}
                    <div className="space-y-1.5">
                        <Label htmlFor="quote">Quote <span className="text-red-500">*</span></Label>
                        <Textarea
                            id="quote"
                            value={data.quote}
                            onChange={(e) => setData('quote', e.target.value)}
                            rows={4}
                        />
                        {errors.quote && <p className="text-xs text-red-500">{errors.quote}</p>}
                    </div>

                    {/* Photo + Rating */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="photo">Photo URL</Label>
                            <Input
                                id="photo"
                                type="url"
                                value={data.photo}
                                onChange={(e) => setData('photo', e.target.value)}
                                placeholder="https://..."
                            />
                            {errors.photo && <p className="text-xs text-red-500">{errors.photo}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label>Rating <span className="text-red-500">*</span></Label>
                            <div className="flex items-center gap-1 pt-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setData('rating', s)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`h-6 w-6 transition-colors ${s <= data.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 hover:text-amber-200'}`}
                                        />
                                    </button>
                                ))}
                                <span className="text-sm text-[#0F172A]/50 ml-1">{data.rating}/5</span>
                            </div>
                            {errors.rating && <p className="text-xs text-red-500">{errors.rating}</p>}
                        </div>
                    </div>

                    {/* Service + Product */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="service_id">Related Service</Label>
                            <select
                                id="service_id"
                                value={data.service_id}
                                onChange={(e) => setData('service_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">— None —</option>
                                {services.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            {errors.service_id && <p className="text-xs text-red-500">{errors.service_id}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="product_id">Related Product</Label>
                            <select
                                id="product_id"
                                value={data.product_id}
                                onChange={(e) => setData('product_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">— None —</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            {errors.product_id && <p className="text-xs text-red-500">{errors.product_id}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" disabled={processing} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                            {processing ? 'Saving…' : 'Save Changes'}
                        </Button>
                        <Link href={route('admin.testimonials.index')}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
