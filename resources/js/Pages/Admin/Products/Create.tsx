import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface FeatureRow {
    title: string;
    description: string;
    icon: string;
}

interface PricingTierRow {
    name: string;
    price: string;
    features_list: string;
    is_popular: boolean;
}

function toSlug(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        tagline: '',
        description: '',
        pricing_model: 'one-time',
        demo_url: '',
        status: 'active' as 'active' | 'inactive',
        sort_order: 0,
        features: [] as FeatureRow[],
        pricing_tiers: [] as PricingTierRow[],
    });

    function addFeature() {
        setData('features', [...data.features, { title: '', description: '', icon: '' }]);
    }

    function removeFeature(i: number) {
        setData('features', data.features.filter((_, idx) => idx !== i));
    }

    function updateFeature(i: number, key: keyof FeatureRow, val: string) {
        const u = [...data.features];
        u[i] = { ...u[i], [key]: val };
        setData('features', u);
    }

    function addTier() {
        setData('pricing_tiers', [...data.pricing_tiers, { name: '', price: '', features_list: '', is_popular: false }]);
    }

    function removeTier(i: number) {
        setData('pricing_tiers', data.pricing_tiers.filter((_, idx) => idx !== i));
    }

    function updateTier(i: number, key: keyof PricingTierRow, val: string | boolean) {
        const u = [...data.pricing_tiers];
        u[i] = { ...u[i], [key]: val };
        setData('pricing_tiers', u);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.products.store'));
    }

    return (
        <AdminLayout title="Add New Product">
            <Head title="Add New Product" />

            <div className="mb-6">
                <Link href="/admin/products" className="inline-flex items-center text-sm text-[#0F172A]/60 hover:text-[#2563EB] mb-3">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Products
                </Link>
                <h1 className="font-bold text-xl text-[#0F172A]">Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Main Column */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* Product Details Card */}
                        <div className="bg-white border rounded-xl p-6">
                            <h2 className="font-semibold text-[#0F172A] mb-5">Product Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name" className="text-sm font-medium text-[#0F172A]">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => {
                                            setData('name', e.target.value);
                                            setData('slug', toSlug(e.target.value));
                                        }}
                                        className="mt-1"
                                        placeholder="Product name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="slug" className="text-sm font-medium text-[#0F172A]">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        className="mt-1"
                                        placeholder="product-slug"
                                    />
                                    {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="tagline" className="text-sm font-medium text-[#0F172A]">Tagline</Label>
                                    <Input
                                        id="tagline"
                                        value={data.tagline}
                                        onChange={e => setData('tagline', e.target.value)}
                                        className="mt-1"
                                        placeholder="Short tagline"
                                    />
                                    {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="description" className="text-sm font-medium text-[#0F172A]">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={6}
                                        className="mt-1"
                                        placeholder="Detailed product description..."
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-[#0F172A]">Pricing Model</Label>
                                        <Select value={data.pricing_model} onValueChange={val => setData('pricing_model', val)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select pricing model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="one-time">One-time</SelectItem>
                                                <SelectItem value="subscription">Subscription</SelectItem>
                                                <SelectItem value="freemium">Freemium</SelectItem>
                                                <SelectItem value="custom">Custom</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.pricing_model && <p className="text-red-500 text-xs mt-1">{errors.pricing_model}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="demo_url" className="text-sm font-medium text-[#0F172A]">Demo URL</Label>
                                        <Input
                                            id="demo_url"
                                            value={data.demo_url}
                                            onChange={e => setData('demo_url', e.target.value)}
                                            className="mt-1"
                                            placeholder="https://demo.example.com"
                                        />
                                        {errors.demo_url && <p className="text-red-500 text-xs mt-1">{errors.demo_url}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className="bg-white border rounded-xl p-6">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="font-semibold text-[#0F172A]">Features</h2>
                                <Button type="button" size="sm" variant="outline" onClick={addFeature}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Feature
                                </Button>
                            </div>

                            {data.features.length === 0 ? (
                                <p className="text-sm text-[#0F172A]/40 text-center py-4">No features added yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {data.features.map((feature, i) => (
                                        <div key={i} className="border rounded-xl p-4 relative">
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(i)}
                                                className="absolute top-3 right-3 text-[#0F172A]/30 hover:text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 pr-6">
                                                <div>
                                                    <Label className="text-xs font-medium text-[#0F172A]/60">Title</Label>
                                                    <Input
                                                        value={feature.title}
                                                        onChange={e => updateFeature(i, 'title', e.target.value)}
                                                        className="mt-1"
                                                        placeholder="Feature title"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-xs font-medium text-[#0F172A]/60">Icon</Label>
                                                    <Input
                                                        value={feature.icon}
                                                        onChange={e => updateFeature(i, 'icon', e.target.value)}
                                                        className="mt-1"
                                                        placeholder="e.g. CheckCircle"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-xs font-medium text-[#0F172A]/60">Description</Label>
                                                <Textarea
                                                    value={feature.description}
                                                    onChange={e => updateFeature(i, 'description', e.target.value)}
                                                    rows={3}
                                                    className="mt-1"
                                                    placeholder="Feature description..."
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pricing Tiers Card */}
                        <div className="bg-white border rounded-xl p-6">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="font-semibold text-[#0F172A]">Pricing Tiers</h2>
                                <Button type="button" size="sm" variant="outline" onClick={addTier}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Tier
                                </Button>
                            </div>

                            {data.pricing_tiers.length === 0 ? (
                                <p className="text-sm text-[#0F172A]/40 text-center py-4">No pricing tiers added yet.</p>
                            ) : (
                                <>
                                    {data.pricing_tiers.map((tier, i) => (
                                        <div key={i} className="border rounded-xl p-4 mb-3 relative">
                                            <button
                                                type="button"
                                                onClick={() => removeTier(i)}
                                                className="absolute top-3 right-3 text-[#0F172A]/30 hover:text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="grid grid-cols-3 gap-3 pr-6">
                                                <div>
                                                    <Label className="text-xs font-medium text-[#0F172A]/60">Tier Name</Label>
                                                    <Input
                                                        value={tier.name}
                                                        onChange={e => updateTier(i, 'name', e.target.value)}
                                                        className="mt-1"
                                                        placeholder="Tier name (e.g. Basic)"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-xs font-medium text-[#0F172A]/60">Price (₹)</Label>
                                                    <Input
                                                        type="number"
                                                        value={tier.price}
                                                        onChange={e => updateTier(i, 'price', e.target.value)}
                                                        className="mt-1"
                                                        placeholder="Price (₹)"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 pt-5">
                                                    <input
                                                        type="checkbox"
                                                        id={`popular_${i}`}
                                                        checked={tier.is_popular}
                                                        onChange={e => updateTier(i, 'is_popular', e.target.checked)}
                                                        className="rounded"
                                                    />
                                                    <label htmlFor={`popular_${i}`} className="text-sm text-[#0F172A]">
                                                        Most Popular
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Textarea
                                                    rows={4}
                                                    value={tier.features_list}
                                                    onChange={e => updateTier(i, 'features_list', e.target.value)}
                                                    placeholder={"One feature per line\nUnlimited entries\nPriority support"}
                                                />
                                                <p className="text-xs text-[#0F172A]/40 mt-1">Enter one feature per line</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="xl:col-span-1 space-y-4">

                        {/* Settings Card */}
                        <div className="bg-white border rounded-xl p-5">
                            <h2 className="font-semibold text-[#0F172A] mb-4">Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-[#0F172A]">Status</Label>
                                    <Select value={data.status} onValueChange={val => setData('status', val as 'active' | 'inactive')}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="sort_order" className="text-sm font-medium text-[#0F172A]">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="mt-1"
                                        placeholder="0"
                                    />
                                    {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Save Card */}
                        <div className="bg-white border rounded-xl p-5">
                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Product'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
