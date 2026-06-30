import { Head, Link, router } from '@inertiajs/react';
import { Users, CheckCircle2, Phone, Building2, Download, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

interface WaitlistEntry {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string | null;
    remark: string | null;
    status: 'pending' | 'approved' | 'contacted';
    source: string | null;
    created_at: string;
    product?: { id: number; name: string; slug: string } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    entries: {
        data: WaitlistEntry[];
        current_page: number;
        last_page: number;
        total: number;
        links: PaginationLink[];
    };
    stats: { total: number; pending: number; approved: number; contacted: number };
    filters: { status?: string };
}

const STATUS_STYLES: Record<string, string> = {
    pending:   'bg-amber-100 text-amber-700 border border-amber-200',
    approved:  'bg-green-100 text-green-700 border border-green-200',
    contacted: 'bg-blue-100 text-blue-700 border border-blue-200',
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function WaitlistIndex({ entries, stats, filters }: Props) {

    function handleStatusFilter(value: string) {
        const params: Record<string, string> = {};
        if (value && value !== 'all') params.status = value;
        router.get('/admin/waitlist', params, { preserveState: true });
    }

    function handleStatusChange(id: number, status: string) {
        router.patch(`/admin/waitlist/${id}/status`, { status }, { preserveScroll: true });
    }

    return (
        <AdminLayout title="Bank2Books Waitlist">
            <Head title="Waitlist — Admin" />

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-bold text-[#0F172A]">Bank2Books Waitlist</h1>
                    <p className="text-sm text-[#0F172A]/50 mt-0.5">
                        {entries.total} signup{entries.total !== 1 ? 's' : ''} total
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Select
                        value={filters.status || 'all'}
                        onValueChange={handleStatusFilter}
                    >
                        <SelectTrigger className="w-36 text-sm">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                        </SelectContent>
                    </Select>

                    <a href="/admin/waitlist/export">
                        <Button variant="outline" size="sm" className="gap-1.5">
                            <Download className="h-4 w-4" />
                            Export CSV
                        </Button>
                    </a>
                </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                            <Users className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-[#0F172A]/50">Total</p>
                            <p className="text-2xl font-bold text-[#0F172A]">{stats.total}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                            <Clock className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-[#0F172A]/50">Pending</p>
                            <p className="text-2xl font-bold text-[#0F172A]">{stats.pending}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-[#0F172A]/50">Approved</p>
                            <p className="text-2xl font-bold text-[#0F172A]">{stats.approved}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-[#0F172A]/50">Contacted</p>
                            <p className="text-2xl font-bold text-[#0F172A]">{stats.contacted}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Table ── */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                {entries.data.length === 0 ? (
                    <div className="py-20 text-center">
                        <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-[#0F172A]/40 text-sm">No waitlist signups yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Name</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden md:table-cell">Contact</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden lg:table-cell">Company</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden sm:table-cell">Registered</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {entries.data.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-[#0F172A]">{entry.name}</p>
                                            <p className="text-xs text-[#0F172A]/50 mt-0.5">{entry.email}</p>
                                            {entry.remark && (
                                                <p className="text-xs text-[#0F172A]/40 mt-1 italic line-clamp-1" title={entry.remark}>
                                                    "{entry.remark}"
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-1.5 text-[#0F172A]/70 text-xs">
                                                <Phone className="h-3 w-3 flex-shrink-0" />
                                                {entry.phone}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 hidden lg:table-cell">
                                            {entry.company ? (
                                                <div className="flex items-center gap-1.5 text-xs text-[#0F172A]/70">
                                                    <Building2 className="h-3 w-3 flex-shrink-0" />
                                                    {entry.company}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-300">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[entry.status]}`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 hidden sm:table-cell text-xs text-[#0F172A]/50">
                                            {formatDate(entry.created_at)}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Select
                                                value={entry.status}
                                                onValueChange={(val) => handleStatusChange(entry.id, val)}
                                            >
                                                <SelectTrigger className="w-28 text-xs h-7">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="approved">Approved</SelectItem>
                                                    <SelectItem value="contacted">Contacted</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ── Pagination ── */}
                {entries.last_page > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                        <p className="text-xs text-[#0F172A]/50">
                            Page {entries.current_page} of {entries.last_page}
                        </p>
                        <div className="flex gap-1">
                            {entries.links.map((link, i) => {
                                if (link.label === '&laquo; Previous') return (
                                    <Button key={i} variant="outline" size="sm" className="h-7 w-7 p-0" disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}>
                                        <ChevronLeft className="h-3 w-3" />
                                    </Button>
                                );
                                if (link.label === 'Next &raquo;') return (
                                    <Button key={i} variant="outline" size="sm" className="h-7 w-7 p-0" disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}>
                                        <ChevronRight className="h-3 w-3" />
                                    </Button>
                                );
                                return (
                                    <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm"
                                        className={`h-7 min-w-[28px] px-2 text-xs ${link.active ? 'bg-[#2563EB]' : ''}`}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}>
                                        {link.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
