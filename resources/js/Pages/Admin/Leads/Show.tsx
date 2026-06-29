import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { ArrowLeft, Mail, Phone, Building2, Calendar } from 'lucide-react';

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
    timeline: string | null;
    message: string;
    source: string | null;
    status: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    service?: { id: number; name: string; slug: string } | null;
    product?: { id: number; name: string; slug: string } | null;
}

interface Props {
    lead: Lead;
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
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function Show({ lead }: Props) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        status: lead.status,
    });

    const notesForm = useForm({
        notes: lead.notes ?? '',
    });

    const submitStatus = () => {
        post(route('admin.leads.update-status', lead.id), {
            onSuccess: () => {},
        });
    };

    const saveNotes = () => {
        notesForm.post(route('admin.leads.update-notes', lead.id));
    };

    return (
        <AdminLayout title="Lead Details">
            <Head title={`Lead - ${lead.name}`} />

            {/* Back link */}
            <Link
                href="/admin/leads"
                className="inline-flex items-center gap-1 text-sm text-[#0F172A]/50 hover:text-[#2563EB] mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Leads
            </Link>

            {/* Header card */}
            <Card className="bg-white border border-gray-100 shadow-sm mb-6">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                                {lead.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#0F172A]">{lead.name}</h1>
                                <p className="text-sm text-[#0F172A]/60">{lead.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[lead.lead_type] ?? 'bg-gray-100 text-gray-600'}`}>
                                        {lead.lead_type}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>
                                        {lead.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-[#0F172A]/40 whitespace-nowrap">
                            Received {formatDate(lead.created_at)}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Two-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left col */}
                <div className="lg:col-span-2">

                    {/* Lead Details Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 mb-6">
                        <h2 className="font-semibold text-[#0F172A] mb-4">Lead Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Phone</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium flex items-center gap-1">
                                    {lead.phone ? (
                                        <>
                                            <Phone className="h-3.5 w-3.5 text-[#0F172A]/40" />
                                            {lead.phone}
                                        </>
                                    ) : '—'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Company</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium flex items-center gap-1">
                                    {lead.company ? (
                                        <>
                                            <Building2 className="h-3.5 w-3.5 text-[#0F172A]/40" />
                                            {lead.company}
                                        </>
                                    ) : '—'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Service / Product Interest</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium">
                                    {lead.service ? (
                                        <Link
                                            href={`/admin/services/${lead.service.id}`}
                                            className="text-[#2563EB] hover:underline"
                                        >
                                            {lead.service.name}
                                        </Link>
                                    ) : lead.product ? (
                                        <Link
                                            href={`/admin/products/${lead.product.id}`}
                                            className="text-[#2563EB] hover:underline"
                                        >
                                            {lead.product.name}
                                        </Link>
                                    ) : '—'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Budget Range</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium">{lead.budget_range ?? '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Timeline</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium flex items-center gap-1">
                                    {lead.timeline ? (
                                        <>
                                            <Calendar className="h-3.5 w-3.5 text-[#0F172A]/40" />
                                            {lead.timeline}
                                        </>
                                    ) : '—'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Source</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium capitalize">{lead.source ?? '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Lead Type</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium capitalize">{lead.lead_type}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#0F172A]/40 uppercase tracking-wide">Submitted</p>
                                <p className="text-sm text-[#0F172A] mt-0.5 font-medium">{formatDate(lead.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Message Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
                        <h2 className="font-semibold text-[#0F172A] mb-3">Message</h2>
                        <p className="text-sm text-[#0F172A]/70 leading-relaxed bg-[#F8FAFC] rounded-lg p-4">
                            {lead.message}
                        </p>
                    </div>
                </div>

                {/* Right col */}
                <div>

                    {/* Status Update Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 mb-5">
                        <h3 className="font-semibold text-[#0F172A] mb-4">Update Status</h3>
                        <Select
                            value={data.status}
                            onValueChange={(v) => setData('status', v)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="proposal">Proposal</SelectItem>
                                <SelectItem value="won">Won</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            className="mt-3 w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                            size="sm"
                            disabled={processing}
                            onClick={submitStatus}
                        >
                            {processing ? 'Saving...' : 'Save Status'}
                        </Button>
                        {recentlySuccessful && (
                            <p className="text-xs text-green-600 mt-2 text-center">Status updated successfully.</p>
                        )}
                    </div>

                    {/* Notes Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5">
                        <h3 className="font-semibold text-[#0F172A] mb-3">Internal Notes</h3>
                        <Textarea
                            value={notesForm.data.notes}
                            onChange={(e) => notesForm.setData('notes', e.target.value)}
                            rows={6}
                            placeholder="Add internal notes..."
                            className="resize-none text-sm"
                        />
                        <Button
                            className="mt-3 w-full"
                            variant="outline"
                            size="sm"
                            disabled={notesForm.processing}
                            onClick={saveNotes}
                        >
                            {notesForm.processing ? 'Saving...' : 'Save Notes'}
                        </Button>
                        {notesForm.recentlySuccessful && (
                            <p className="text-xs text-green-600 mt-2 text-center">Notes saved successfully.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
