import { Head, Link, router } from '@inertiajs/react';
import { HelpCircle, Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';

interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string;
    related_id: number | null;
    sort_order: number;
}

interface Filters {
    category?: string;
}

interface Props {
    faqs: Faq[];
    filters: Filters;
}

const CATEGORY_STYLES: Record<string, string> = {
    general: 'bg-gray-100 text-gray-600',
    service: 'bg-cyan-100 text-cyan-700',
    product: 'bg-violet-100 text-violet-700',
};

function truncate(text: string, max: number): string {
    return text.length > max ? text.slice(0, max) + '…' : text;
}

export default function FaqsIndex({ faqs, filters }: Props) {
    const currentCategory = filters.category ?? '';

    function handleDelete(id: number) {
        if (!confirm('Delete this FAQ? This cannot be undone.')) return;
        router.delete(route('admin.faqs.destroy', id), { preserveScroll: true });
    }

    function handleCategoryFilter(value: string) {
        router.get(route('admin.faqs.index'), value ? { category: value } : {}, { preserveState: true });
    }

    return (
        <AdminLayout title="FAQs">
            <Head title="FAQs" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0F172A]">FAQs</h2>
                    <p className="text-sm text-[#0F172A]/50 mt-0.5">{faqs.length} question{faqs.length !== 1 ? 's' : ''}</p>
                </div>
                <Link href={route('admin.faqs.create')}>
                    <Button size="sm" className="gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                        <Plus className="h-4 w-4" />
                        Add FAQ
                    </Button>
                </Link>
            </div>

            {/* Category filter */}
            <div className="mb-4">
                <select
                    value={currentCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="">All Categories</option>
                    <option value="general">General</option>
                    <option value="service">Service</option>
                    <option value="product">Product</option>
                </select>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                {faqs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#0F172A]/40">
                        <HelpCircle className="h-10 w-10 mb-3 opacity-30" />
                        <p className="text-sm font-medium">No FAQs yet</p>
                        <p className="text-xs mt-1">Click "Add FAQ" to get started</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Question</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden sm:table-cell">Category</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden md:table-cell">Sort</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {faqs.map((faq) => (
                                    <tr key={faq.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3">
                                            <p className="font-medium text-[#0F172A]">{truncate(faq.question, 80)}</p>
                                            <p className="text-xs text-[#0F172A]/40 mt-0.5 sm:hidden capitalize">{faq.category}</p>
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${CATEGORY_STYLES[faq.category] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {faq.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-[#0F172A]/50 hidden md:table-cell">{faq.sort_order}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.faqs.edit', faq.id)}>
                                                    <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:border-red-300"
                                                    onClick={() => handleDelete(faq.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
