import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    MessageSquare, Briefcase, Package, FileText,
    TrendingUp, AlertCircle, Plus, ArrowRight, Eye,
    Users, ChevronRight,
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/Components/ui/card';
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

interface StatCardConfig {
    key: keyof Stats;
    label: string;
    icon: React.ElementType;
    gradient: string;
    bg: string;
    iconColor: string;
    ring: string;
}

/* ─── stat card config ─── */
const STAT_CARDS: StatCardConfig[] = [
    { key: 'total_leads', label: 'Total Leads', icon: Users, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', iconColor: 'text-blue-600', ring: 'ring-blue-100' },
    { key: 'new_leads_week', label: 'New This Week', icon: TrendingUp, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', iconColor: 'text-amber-600', ring: 'ring-amber-100' },
    { key: 'new_status_leads', label: 'Needs Attention', icon: AlertCircle, gradient: 'from-red-500 to-rose-500', bg: 'bg-red-50', iconColor: 'text-red-600', ring: 'ring-red-100' },
    { key: 'active_services', label: 'Active Services', icon: Briefcase, gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', ring: 'ring-emerald-100' },
    { key: 'active_products', label: 'Active Products', icon: Package, gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', iconColor: 'text-violet-600', ring: 'ring-violet-100' },
    { key: 'published_posts', label: 'Published Posts', icon: FileText, gradient: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', iconColor: 'text-pink-600', ring: 'ring-pink-100' },
];

const STATUS_COLORS: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-amber-100 text-amber-700',
    qualified: 'bg-violet-100 text-violet-700',
    proposal: 'bg-indigo-100 text-indigo-700',
    converted: 'bg-emerald-100 text-emerald-700',
    won: 'bg-emerald-100 text-emerald-700',
    lost: 'bg-red-100 text-red-700',
};

const AVATAR_COLORS = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-violet-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-rose-500',
];

/* ─── animated count-up hook ─── */
function useCountUp(target: number, duration = 1200) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return { count, ref };
}

/* ─── stat card ─── */
function StatCard({ config, value }: { config: StatCardConfig; value: number }) {
    const { count, ref } = useCountUp(value);
    const Icon = config.icon;
    return (
        <motion.div
            ref={ref}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 relative overflow-hidden group cursor-default"
        >
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${config.gradient} rounded-l-2xl`} />
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider mb-1">{config.label}</p>
                    <p className="text-3xl font-extrabold text-[#0F172A]">{count}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl ${config.bg} ring-4 ${config.ring} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${config.iconColor}`} />
                </div>
            </div>
        </motion.div>
    );
}

export default function Dashboard({ stats, recentLeads }: Props) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {STAT_CARDS.map((c) => (
                    <StatCard key={c.key} config={c} value={stats[c.key]} />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Recent leads */}
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
                                        <th className="text-left px-4 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide hidden md:table-cell">Interest</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide">Status</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-[#0F172A]/50 uppercase tracking-wide hidden lg:table-cell">Date</th>
                                        <th className="px-4 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentLeads.map((lead, idx) => {
                                        const initial = lead.name?.charAt(0)?.toUpperCase() ?? '?';
                                        const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                                        return (
                                            <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                                                            {initial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-medium text-[#0F172A] text-sm truncate">{lead.name}</p>
                                                            <p className="text-xs text-[#0F172A]/50 truncate">{lead.email}</p>
                                                        </div>
                                                    </div>
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
                                        );
                                    })}
                                    {recentLeads.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-10 text-center text-sm text-[#0F172A]/40">
                                                No leads yet. They'll appear here once enquiries come in.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Sidebar column */}
                <div className="space-y-4">
                    {/* Quick Actions */}
                    <Card className="bg-white border border-gray-100 shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-[#0F172A] text-sm">Quick Actions</h2>
                        </div>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: 'View Leads', href: '/admin/leads', icon: MessageSquare, bg: 'bg-blue-100 group-hover:bg-blue-200', hover: 'hover:bg-blue-50', color: 'text-blue-600' },
                                    { label: 'Add Service', href: '/admin/services/create', icon: Plus, bg: 'bg-emerald-100 group-hover:bg-emerald-200', hover: 'hover:bg-emerald-50', color: 'text-emerald-600' },
                                    { label: 'Add Product', href: '/admin/products/create', icon: Package, bg: 'bg-violet-100 group-hover:bg-violet-200', hover: 'hover:bg-violet-50', color: 'text-violet-600' },
                                    { label: 'New Post', href: '/admin/blog/create', icon: FileText, bg: 'bg-pink-100 group-hover:bg-pink-200', hover: 'hover:bg-pink-50', color: 'text-pink-600' },
                                ].map(({ label, href, icon: Icon, bg, hover, color }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl ${hover} transition-all group hover:scale-105`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center transition-colors`}>
                                            <Icon className={`h-5 w-5 ${color}`} />
                                        </div>
                                        <span className="text-xs font-medium text-[#0F172A]/70 text-center">{label}</span>
                                    </Link>
                                ))}
                            </div>
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

                    {/* Small nav helper */}
                    <Link
                        href="/admin/services"
                        className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors group"
                    >
                        <span className="text-sm font-medium text-[#0F172A]/80">Manage all services</span>
                        <ChevronRight className="h-4 w-4 text-[#0F172A]/30 group-hover:text-[#2563EB] transition-colors" />
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
