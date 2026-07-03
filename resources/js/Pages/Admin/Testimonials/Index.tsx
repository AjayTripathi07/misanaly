import { Head, Link, router } from '@inertiajs/react';
import { Star, Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';

interface ServiceRef {
    id: number;
    name: string;
}

interface ProductRef {
    id: number;
    name: string;
}

interface Testimonial {
    id: number;
    name: string;
    company: string;
    role: string;
    quote: string;
    photo: string | null;
    rating: number;
    service_id: number | null;
    product_id: number | null;
    service?: ServiceRef | null;
    product?: ProductRef | null;
}

interface Pagination {
    data: Testimonial[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Props {
    testimonials: Pagination;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                />
            ))}
        </div>
    );
}

export default function TestimonialsIndex({ testimonials }: Props) {
    const { data, current_page, last_page, next_page_url, prev_page_url } = testimonials;

    function handleDelete(id: number, name: string) {
        if (!confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return;
        router.delete(route('admin.testimonials.destroy', id), { preserveScroll: true });
    }

    return (
        <AdminLayout title="Testimonials">
            <Head title="Testimonials" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0F172A]">Testimonials</h2>
                    <p className="text-sm text-[#0F172A]/50 mt-0.5">{data.length} on this page</p>
                </div>
                <Link href={route('admin.testimonials.create')}>
                    <Button size="sm" className="gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                        <Plus className="h-4 w-4" />
                        Add Testimonial
                    </Button>
                </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#0F172A]/40">
                        <Star className="h-10 w-10 mb-3 opacity-30" />
                        <p className="text-sm font-medium">No testimonials yet</p>
                        <p className="text-xs mt-1">Click "Add Testimonial" to get started</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Name / Company</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden sm:table-cell">Role</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Rating</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden md:table-cell">Linked To</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3">
                                            <p className="font-medium text-[#0F172A]">{t.name}</p>
                                            <p className="text-xs text-[#0F172A]/50">{t.company}</p>
                                        </td>
                                        <td className="px-4 py-3 text-[#0F172A]/70 hidden sm:table-cell">{t.role}</td>
                                        <td className="px-4 py-3">
                                            <StarRating rating={t.rating} />
                                        </td>
                                        <td className="px-4 py-3 text-xs text-[#0F172A]/60 hidden md:table-cell">
                                            {t.service ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-medium">
                                                    {t.service.name}
                                                </span>
                                            ) : t.product ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">
                                                    {t.product.name}
                                                </span>
                                            ) : (
                                                <span className="text-[#0F172A]/30">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.testimonials.edit', t.id)}>
                                                    <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:border-red-300"
                                                    onClick={() => handleDelete(t.id, t.name)}
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

                {/* Pagination */}
                {last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
                        <p className="text-xs text-[#0F172A]/50">Page {current_page} of {last_page}</p>
                        <div className="flex gap-2">
                            {prev_page_url && (
                                <Link href={prev_page_url}>
                                    <Button variant="outline" size="sm">Previous</Button>
                                </Link>
                            )}
                            {next_page_url && (
                                <Link href={next_page_url}>
                                    <Button variant="outline" size="sm">Next</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
