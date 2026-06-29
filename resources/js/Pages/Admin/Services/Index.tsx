import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { Plus, Pencil, ToggleLeft, ToggleRight, Trash2, Package } from 'lucide-react';

interface Service {
    id: number;
    name: string;
    tagline: string;
    icon: string;
    starting_price: string | null;
    status: 'active' | 'inactive';
    sort_order: number;
    features_count: number;
}

interface Props {
    services: Service[];
}

export default function Index({ services }: Props) {
    function handleToggleStatus(id: number) {
        if (window.confirm('Toggle status for this service?')) {
            router.patch(`/admin/services/${id}/toggle-status`);
        }
    }

    function handleDelete(id: number) {
        if (window.confirm('Delete service?')) {
            router.delete(`/admin/services/${id}`);
        }
    }

    return (
        <AdminLayout title="Services">
            <Head title="Services Management" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-[#0F172A]">Services Management</h1>
                <Link href="/admin/services/create">
                    <Button size="sm" className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        Add Service
                    </Button>
                </Link>
            </div>

            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-0">
                    {services.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-[#0F172A]/40">
                            <Package className="h-10 w-10 mb-3" />
                            <p className="text-sm font-medium">No services found</p>
                            <p className="text-xs mt-1">Add your first service to get started.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Order</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Tagline</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Price</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Features</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {services.map((service) => (
                                        <tr key={service.id} className="hover:bg-[#F8FAFC] transition-colors">
                                            <td className="px-4 py-3 text-center text-xs text-[#0F172A]/50">
                                                {service.sort_order}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-xs text-[#2563EB] font-bold shrink-0">
                                                        {service.icon.slice(0, 2)}
                                                    </div>
                                                    <p className="font-medium text-[#0F172A]">{service.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-[#0F172A]/50 max-w-xs truncate">
                                                {service.tagline}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-[#2563EB] font-medium">
                                                {service.starting_price ?? '—'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="secondary" className="text-xs">
                                                    {service.features_count} features
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                        service.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-500'
                                                    }`}
                                                >
                                                    {service.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-1">
                                                    <Link href={`/admin/services/${service.id}/edit`}>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Pencil className="h-4 w-4 text-[#0F172A]/60" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleToggleStatus(service.id)}
                                                        title="Toggle status"
                                                    >
                                                        {service.status === 'active' ? (
                                                            <ToggleRight className="h-4 w-4 text-green-600" />
                                                        ) : (
                                                            <ToggleLeft className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleDelete(service.id)}
                                                        title="Delete service"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-400" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
