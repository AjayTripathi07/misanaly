import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Eye, Search, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    lead_type: 'service' | 'product' | 'general';
    service_id: number | null;
    product_id: number | null;
    budget_range: string | null;
    status: string;
    created_at: string;
    service?: { id: number; name: string } | null;
    product?: { id: number; name: string } | null;
}

interface Props {
    leads: {
        data: Lead[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: { type?: string; status?: string; search?: string };
}

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    proposal: 'bg-indigo-100 text-indigo-700',
    won: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
};

const typeColors: Record<string, string> = {
    service: 'bg-cyan-100 text-cyan-700',
    product: 'bg-violet-100 text-violet-700',
    general: 'bg-gray-100 text-gray-600',
};

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function Index({ leads, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            router.get('/admin/leads', { ...filters, search: value }, { preserveState: true });
        }, 400);
    };

    const handleTypeChange = (v: string) => {
        router.get('/admin/leads', { ...filters, type: v === 'all' ? '' : v }, { preserveState: true });
    };

    const handleStatusChange = (v: string) => {
        router.get('/admin/leads', { ...filters, status: v === 'all' ? '' : v }, { preserveState: true });
    };

    const hasFilters = !!(filters.search || filters.type || filters.status);

    const clearFilters = () => {
        setSearch('');
        router.get('/admin/leads', {}, { preserveState: true });
    };

    return (
        <AdminLayout title="Leads Management">
            <Head title="Leads" />

            {/* Header row */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-bold text-[#0F172A]">All Leads</h1>
                    <p className="text-sm text-[#0F172A]/50">{leads.total} total leads</p>
                </div>
            </div>

            {/* Filter bar */}
            <Card className="bg-white border border-gray-100 shadow-sm mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0F172A]/40" />
                            <Input
                                className="pl-9"
                                placeholder="Search name or email..."
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>

                        <Select
                            value={filters.type || 'all'}
                            onValueChange={handleTypeChange}
                        >
                            <SelectTrigger className="w-full sm:w-40">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={filters.status || 'all'}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-full sm:w-44">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="proposal">Proposal</SelectItem>
                                <SelectItem value="won">Won</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                            </SelectContent>
                        </Select>

                        {hasFilters && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs whitespace-nowrap"
                                onClick={clearFilters}
                            >
                                <X className="h-3 w-3 mr-1" />
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Table card */}
            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Name</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Email</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Type</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Interest</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Budget</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Status</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Date</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {leads.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-12 text-[#0F172A]/40 text-sm">
                                            No leads found.
                                        </td>
                                    </tr>
                                ) : (
                                    leads.data.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-[#F8FAFC] transition-colors">
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-[#0F172A]">{lead.name}</p>
                                                {lead.company && (
                                                    <p className="text-xs text-[#0F172A]/50 mt-0.5">{lead.company}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-[#0F172A]/60">{lead.email}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[lead.lead_type] ?? 'bg-gray-100 text-gray-600'}`}>
                                                    {lead.lead_type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-[#0F172A]/70">
                                                {lead.service?.name ?? lead.product?.name ?? '—'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-[#0F172A]/70">
                                                {lead.budget_range ?? '—'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-[#0F172A]/50 whitespace-nowrap">
                                                {formatDate(lead.created_at)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link href={`/admin/leads/${lead.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {leads.last_page > 1 && (
                        <div className="flex justify-between items-center mt-4 px-2 pb-4">
                            <p className="text-xs text-[#0F172A]/50">
                                Showing {leads.from}–{leads.to} of {leads.total}
                            </p>
                            <div className="flex gap-1">
                                {leads.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors
                                            ${link.active
                                                ? 'bg-[#2563EB] text-white'
                                                : link.url
                                                    ? 'bg-white border border-gray-200 text-[#0F172A]/70 hover:bg-[#F8FAFC]'
                                                    : 'bg-white border border-gray-100 text-[#0F172A]/30 cursor-not-allowed'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
