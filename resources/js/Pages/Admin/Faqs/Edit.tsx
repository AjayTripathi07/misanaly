import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface FaqRecord {
    id: number;
    question: string;
    answer: string;
    category: string;
    related_id: number | null;
    sort_order: number;
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
    faq: FaqRecord;
    services: ServiceOption[];
    products: ProductOption[];
}

interface FormFields {
    question: string;
    answer: string;
    category: string;
    related_id: string;
    sort_order: number;
}

export default function FaqsEdit({ faq, services, products }: Props) {
    const { data, setData, put, processing, errors } = useForm<FormFields>({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        related_id: faq.related_id ? String(faq.related_id) : '',
        sort_order: faq.sort_order,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.faqs.update', faq.id));
    }

    function handleCategoryChange(value: string) {
        setData((prev) => ({ ...prev, category: value, related_id: '' }));
    }

    return (
        <AdminLayout title="Edit FAQ">
            <Head title="Edit FAQ" />

            <div className="mb-6">
                <Link href={route('admin.faqs.index')} className="inline-flex items-center gap-1.5 text-sm text-[#0F172A]/50 hover:text-[#0F172A] transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to FAQs
                </Link>
                <h2 className="text-xl font-bold text-[#0F172A] mt-2">Edit FAQ</h2>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Question */}
                    <div className="space-y-1.5">
                        <Label htmlFor="question">Question <span className="text-red-500">*</span></Label>
                        <Input
                            id="question"
                            value={data.question}
                            onChange={(e) => setData('question', e.target.value)}
                        />
                        {errors.question && <p className="text-xs text-red-500">{errors.question}</p>}
                    </div>

                    {/* Answer */}
                    <div className="space-y-1.5">
                        <Label htmlFor="answer">Answer <span className="text-red-500">*</span></Label>
                        <Textarea
                            id="answer"
                            value={data.answer}
                            onChange={(e) => setData('answer', e.target.value)}
                            rows={5}
                        />
                        {errors.answer && <p className="text-xs text-red-500">{errors.answer}</p>}
                    </div>

                    {/* Category + Sort Order */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="general">General</option>
                                <option value="service">Service</option>
                                <option value="product">Product</option>
                            </select>
                            {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="sort_order">Sort Order</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                min={0}
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', parseInt(e.target.value, 10) || 0)}
                            />
                            {errors.sort_order && <p className="text-xs text-red-500">{errors.sort_order}</p>}
                        </div>
                    </div>

                    {/* Related ID — conditional */}
                    {data.category === 'service' && (
                        <div className="space-y-1.5">
                            <Label htmlFor="related_id">Related Service</Label>
                            <select
                                id="related_id"
                                value={data.related_id}
                                onChange={(e) => setData('related_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">— None —</option>
                                {services.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            {errors.related_id && <p className="text-xs text-red-500">{errors.related_id}</p>}
                        </div>
                    )}
                    {data.category === 'product' && (
                        <div className="space-y-1.5">
                            <Label htmlFor="related_id">Related Product</Label>
                            <select
                                id="related_id"
                                value={data.related_id}
                                onChange={(e) => setData('related_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">— None —</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            {errors.related_id && <p className="text-xs text-red-500">{errors.related_id}</p>}
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" disabled={processing} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                            {processing ? 'Saving…' : 'Save Changes'}
                        </Button>
                        <Link href={route('admin.faqs.index')}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
