import { Head, Link } from '@inertiajs/react';
import {
    MessageSquare, Briefcase, Package, FileText,
    TrendingUp, AlertCircle, Plus, ArrowRight, Eye,
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';

/* ─── types ─── */
interface Stats {
    total_leads: number;
    new_leads_week: number;
    new_status_leads: number;
    service_leads: number;
    product_leads: number;
    general_leads: number;
    active_services: number;
    active_products: number;
    published_posts: number;
}

interface RecentLead {
    id: number;
    name: string;
    email: string;
    lead_type: 'service' | 'product' | 'general';
    service_id: number | null;
    product_id: number | null;
    status: string;
    created_at: string;
    service?: { id: number; name: string } | null;
    product?: { id: number; name: string } | null;
}

interface Props {
    stats: Stats;
    recentLeads: RecentLead[];
}

/* ─── helpers ─── */
const STATUS_COLORS: Record<string, string> = {
    new:       'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    proposal:  'bg-indigo-100 text-indigo-700',
    won:       'bg-green-100 text-green-700',
    lost:      'bg-red-100 text-red-700',
};

const TYPE_COLORS: Record<string, string> = {
    service: 'bg-cyan-100 text-cyan-700',
    product: 'bg-violet-100 text-violet-700',
    general: 'bg-gray-100 text-gray-600',
};

function StatCard({
    label, value, sub, icon: Icon, color,
}: {
    label: string; value: number; sub?: string; icon: React.ElementType; color: string;
}) {
    return (
        <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide">{label}</p>
                        <p className="text-3xl font-bold text-[#0F172A] mt-1">{value}</p>
                        {sub && <p className="text-xs text-[#0F172A]/40 mt-1">{sub}</p>}
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Dashboard({ stats, recentLeads }: Props) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* ── Stats grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <StatCard label="Total Leads"    value={stats.total_leads}     sub={`${stats.new_leads_week} this week`}  icon={MessageSquare} color="bg-blue-100 text-blue-600" />
                <StatCard label="New / Unread"   value={stats.new_status_leads} sub="need attention"                       icon={AlertCircle}   color="bg-amber-100 text-amber-600" />
                <StatCard label="Service Leads"  value={stats.service_leads}                                                icon={Briefcase}     color="bg-cyan-100 text-cyan-600" />
                <StatCard label="Product Leads"  value={stats.product_leads}                                                icon={Package}       color="bg-violet-100 text-violet-600" />
                <StatCard label="Active Services" value={stats.active_services}                                             icon={TrendingUp}    color="bg-green-100 text-green-600" />
                <StatCard label="Published Posts" value={stats.published_posts}                                             icon={FileText}      color="bg-pink-100 text-pink-600" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* ── Recent leads table ── */}
                <div className="xl:col-span-2">
                    <Card className="bg-white border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-[#0F172A] text-sm">Recent Leads</h2>
                            <Link href="/admin/leads">
                                <Button variant="ghost" size="sm" className="text-[#2563EB] text-xs gap-1 h-7">
                                    View All <ArrowRight className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left px-6 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide">Name</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide hidden sm:table-cell">Type</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide hidden md:table-cell">Interest</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide">Status</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide hidden lg:table-cell">Date</th>
                                        <th className="px-4 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3">
                                                <p className="font-medium text-[#0F172A] text-sm">{lead.name}</p>
                                                <p className="text-xs text-[#0F172A]/50">{lead.email}</p>
                                            </td>
                                            <td className="px-4 py-3 hidden sm:table-cell">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${TYPE_COLORS[lead.lead_type]}`}>
                                                    {lead.lead_type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-[#0F172A]/60 hidden md:table-cell">
                                                {lead.service?.name ?? lead.product?.name ?? '—'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-[#0F172A]/50 hidden lg:table-cell">
                                                {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link href={`/admin/leads/${lead.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#0F172A]/40 hover:text-[#2563EB]">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentLeads.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-sm text-[#0F172A]/40">
                                                No leads yet. They'll appear here once enquiries come in.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* ── Quick Actions ── */}
                <div className="space-y-4">
                    <Card className="bg-white border border-gray-100 shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-[#0F172A] text-sm">Quick Actions</h2>
                        </div>
                        <CardContent className="p-4 space-y-2">
                            {[
                                { label: 'Add New Service', href: '/admin/services/create', icon: Plus, color: 'text-cyan-600' },
                                { label: 'Add New Product', href: '/admin/products/create', icon: Plus, color: 'text-violet-600' },
                                { label: 'View All Leads',  href: '/admin/leads',          icon: MessageSquare, color: 'text-blue-600' },
                                { label: 'Manage Services', href: '/admin/services',       icon: Briefcase, color: 'text-green-600' },
                            ].map(({ label, href, icon: Icon, color }) => (
                                <Link key={href} href={href}>
                                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                                        <div className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center ${color} opacity-80`}
                                             style={{ background: 'rgba(0,0,0,0.04)' }}>
                                            <Icon className={`h-4 w-4 ${color}`} />
                                        </div>
                                        <span className="text-sm font-medium text-[#0F172A]">{label}</span>
                                        <ChevronRight className="h-4 w-4 text-[#0F172A]/30 ml-auto" />
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Lead breakdown */}
                    <Card className="bg-white border border-gray-100 shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-[#0F172A] text-sm">Lead Breakdown</h2>
                        </div>
                        <CardContent className="p-4 space-y-3">
                            {[
                                { label: 'Service Enquiries', value: stats.service_leads, total: stats.total_leads, color: 'bg-cyan-500' },
                                { label: 'Product Enquiries', value: stats.product_leads, total: stats.total_leads, color: 'bg-violet-500' },
                                { label: 'General Enquiries', value: stats.general_leads, total: stats.total_leads, color: 'bg-gray-400' },
                            ].map(({ label, value, total, color }) => (
                                <div key={label}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-[#0F172A]/70 font-medium">{label}</span>
                                        <span className="text-[#0F172A]/50">{value}</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full">
                                        <div
                                            className={`h-full ${color} rounded-full transition-all`}
                                            style={{ width: total > 0 ? `${(value / total) * 100}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M9 18l6-6-6-6" />
        </svg>
    );
}
