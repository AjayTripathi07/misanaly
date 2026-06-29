import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    tagline: string;
    pricing_model: string;
    status: 'active' | 'inactive';
    sort_order: number;
    features_count: number;
}

interface Props {
    products: Product[];
}

export default function Index({ products }: Props) {
    function handleToggle(id: number) {
        if (confirm('Toggle product status?')) {
            router.patch(`/admin/products/${id}/toggle-status`);
        }
    }

    function handleDelete(id: number) {
        if (window.confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    }

    return (
        <AdminLayout title="Products">
            <Head title="Products" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-xl text-[#0F172A]">Products Management</h1>
                <Link href="/admin/products/create">
                    <Button size="sm" className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        + Add Product
                    </Button>
                </Link>
            </div>

            <Card className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
                <CardContent className="p-0">
                    {products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-[#0F172A]/40">
                            <Package className="h-12 w-12 mb-3" />
                            <p className="text-sm">No products found. Add your first product.</p>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                                    <th className="text-left px-4 py-3 font-medium text-[#0F172A]/60 text-xs uppercase tracking-wide">Order</th>
                                    <th className="text-left px-4 py-3 font-medium text-[#0F172A]/60 text-xs uppercase tracking-wide">Name</th>
                                    <th className="text-left px-4 py-3 font-medium text-[#0F172A]/60 text-xs uppercase tracking-wide">Pricing Model</th>
                                    <th className="text-left px-4 py-3 font-medium text-[#0F172A]/60 text-xs uppercase tracking-wide">Features</th>
                                    <th className="text-left px-4 py-3 font-medium text-[#0F172A]/60 text-xs uppercase tracking-wide">Status</th>
                                    <th className="text-left px-4 py-3 font-medium text-[#0F172A]/60 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-50 hover:bg-[#F8FAFC] transition-colors">
                                        <td className="px-4 py-3 text-center text-xs text-[#0F172A]/50">
                                            {product.sort_order}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-[#0F172A]">{product.name}</p>
                                            <p className="text-xs text-[#0F172A]/50">{product.tagline}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="secondary" className="text-xs capitalize">
                                                {product.pricing_model}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="secondary" className="text-xs">
                                                {product.features_count} features
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            {product.status === 'active' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-1">
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-amber-500 hover:text-amber-700 hover:bg-amber-50"
                                                    onClick={() => handleToggle(product.id)}
                                                    title="Toggle status"
                                                >
                                                    <span className="text-xs font-bold">{product.status === 'active' ? '●' : '○'}</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
