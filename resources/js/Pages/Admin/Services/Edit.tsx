import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
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

interface StepRow {
    step_number: number;
    title: string;
    description: string;
}

interface ServiceData {
    id: number;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    icon: string;
    starting_price: string | null;
    status: 'active' | 'inactive';
    sort_order: number;
    features: { id?: number; title: string; description: string; icon: string }[];
    process_steps: { id?: number; step_number: number; title: string; description: string }[];
    updated_at?: string;
}

interface Props {
    service: ServiceData;
}

function toSlug(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Edit({ service }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        slug: service.slug,
        tagline: service.tagline,
        description: service.description,
        icon: service.icon,
        starting_price: service.starting_price ?? '',
        status: service.status,
        sort_order: service.sort_order,
        features: service.features.map((f) => ({
            title: f.title,
            description: f.description,
            icon: f.icon ?? '',
        })),
        process_steps: service.process_steps.map((s) => ({
            step_number: s.step_number,
            title: s.title,
            description: s.description,
        })),
    });

    function addFeature() {
        setData('features', [...data.features, { title: '', description: '', icon: '' }]);
    }

    function removeFeature(i: number) {
        setData('features', data.features.filter((_, idx) => idx !== i));
    }

    function updateFeature(i: number, key: keyof FeatureRow, val: string) {
        const updated = [...data.features];
        updated[i] = { ...updated[i], [key]: val };
        setData('features', updated);
    }

    function addStep() {
        setData('process_steps', [
            ...data.process_steps,
            { step_number: data.process_steps.length + 1, title: '', description: '' },
        ]);
    }

    function removeStep(i: number) {
        setData('process_steps', data.process_steps.filter((_, idx) => idx !== i));
    }

    function updateStep(i: number, key: keyof StepRow, val: string | number) {
        const updated = [...data.process_steps];
        updated[i] = { ...updated[i], [key]: val };
        setData('process_steps', updated);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.services.update', service.id));
    }

    const formattedUpdatedAt = service.updated_at
        ? new Date(service.updated_at).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })
        : null;

    return (
        <AdminLayout title={`Edit Service: ${service.name}`}>
            <Head title={`Edit Service: ${service.name}`} />

            <div className="mb-6">
                <Link
                    href="/admin/services"
                    className="inline-flex items-center gap-1.5 text-sm text-[#0F172A]/60 hover:text-[#0F172A] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Services
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Main Column */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Basic Details Card */}
                        <div className="bg-white border border-gray-100 rounded-xl p-6">
                            <h2 className="font-semibold text-[#0F172A] mb-5">Service Details</h2>
                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <Label htmlFor="name" className="text-sm font-medium text-[#0F172A]">
                                        Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => {
                                            setData('name', e.target.value);
                                            setData('slug', toSlug(e.target.value));
                                        }}
                                        className="mt-1"
                                        placeholder="e.g. Web Development"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Slug */}
                                <div>
                                    <Label htmlFor="slug" className="text-sm font-medium text-[#0F172A]">
                                        Slug <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        className="mt-1"
                                        placeholder="e.g. web-development"
                                    />
                                    {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                                </div>

                                {/* Tagline */}
                                <div>
                                    <Label htmlFor="tagline" className="text-sm font-medium text-[#0F172A]">
                                        Tagline
                                    </Label>
                                    <Input
                                        id="tagline"
                                        value={data.tagline}
                                        onChange={(e) => setData('tagline', e.target.value)}
                                        className="mt-1"
                                        placeholder="Short tagline for this service"
                                    />
                                    {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <Label htmlFor="description" className="text-sm font-medium text-[#0F172A]">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        rows={5}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1"
                                        placeholder="Detailed description of the service"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                                    )}
                                </div>

                                {/* Icon + Starting Price */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="icon" className="text-sm font-medium text-[#0F172A]">
                                            Icon
                                        </Label>
                                        <Input
                                            id="icon"
                                            value={data.icon}
                                            onChange={(e) => setData('icon', e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g. Globe, Smartphone, Code2"
                                        />
                                        {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="starting_price" className="text-sm font-medium text-[#0F172A]">
                                            Starting Price
                                        </Label>
                                        <Input
                                            id="starting_price"
                                            value={data.starting_price}
                                            onChange={(e) => setData('starting_price', e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g. ₹15,000"
                                        />
                                        {errors.starting_price && (
                                            <p className="text-red-500 text-xs mt-1">{errors.starting_price}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className="bg-white border border-gray-100 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-semibold text-[#0F172A]">Key Features</h2>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={addFeature}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Feature
                                </Button>
                            </div>

                            {data.features.length === 0 ? (
                                <div className="border border-dashed border-gray-200 rounded-xl py-6 text-center text-sm text-[#0F172A]/40">
                                    No features added yet
                                </div>
                            ) : (
                                data.features.map((f, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-100 rounded-xl p-4 mb-3 relative"
                                    >
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFeature(i)}
                                            className="absolute top-3 right-3 h-7 w-7 p-0"
                                        >
                                            <X className="h-4 w-4 text-red-400" />
                                        </Button>
                                        <div className="grid grid-cols-2 gap-3 pr-10">
                                            <Input
                                                placeholder="Title"
                                                value={f.title}
                                                onChange={(e) => updateFeature(i, 'title', e.target.value)}
                                            />
                                            <Input
                                                placeholder="Icon name"
                                                value={f.icon}
                                                onChange={(e) => updateFeature(i, 'icon', e.target.value)}
                                            />
                                        </div>
                                        <Textarea
                                            rows={2}
                                            placeholder="Feature description"
                                            value={f.description}
                                            onChange={(e) => updateFeature(i, 'description', e.target.value)}
                                            className="mt-2"
                                        />
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Process Steps Card */}
                        <div className="bg-white border border-gray-100 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-semibold text-[#0F172A]">Process Steps</h2>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={addStep}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Step
                                </Button>
                            </div>

                            {data.process_steps.length === 0 ? (
                                <div className="border border-dashed border-gray-200 rounded-xl py-6 text-center text-sm text-[#0F172A]/40">
                                    No process steps added yet
                                </div>
                            ) : (
                                data.process_steps.map((s, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-100 rounded-xl p-4 mb-3 relative"
                                    >
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeStep(i)}
                                            className="absolute top-3 right-3 h-7 w-7 p-0"
                                        >
                                            <X className="h-4 w-4 text-red-400" />
                                        </Button>
                                        <div className="grid grid-cols-3 gap-3 pr-10">
                                            <Input
                                                type="number"
                                                placeholder="Step #"
                                                value={s.step_number}
                                                onChange={(e) =>
                                                    updateStep(i, 'step_number', parseInt(e.target.value) || 0)
                                                }
                                            />
                                            <div className="col-span-2">
                                                <Input
                                                    placeholder="Step title"
                                                    value={s.title}
                                                    onChange={(e) => updateStep(i, 'title', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <Textarea
                                            rows={2}
                                            placeholder="Step description"
                                            value={s.description}
                                            onChange={(e) => updateStep(i, 'description', e.target.value)}
                                            className="mt-2"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="xl:col-span-1 space-y-4">
                        {/* Settings Card */}
                        <div className="bg-white border border-gray-100 rounded-xl p-5">
                            <h3 className="font-semibold text-[#0F172A] mb-4">Settings</h3>
                            <div className="space-y-4">
                                {/* Status */}
                                <div>
                                    <Label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                                        Status
                                    </Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val) =>
                                            setData('status', val as 'active' | 'inactive')
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                                    )}
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <Label
                                        htmlFor="sort_order"
                                        className="text-sm font-medium text-[#0F172A] mb-1.5 block"
                                    >
                                        Sort Order
                                    </Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    />
                                    {errors.sort_order && (
                                        <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>
                                    )}
                                </div>

                                {/* Last Updated */}
                                {formattedUpdatedAt && (
                                    <div className="pt-2 border-t border-gray-100">
                                        <p className="text-xs text-[#0F172A]/40">
                                            Last updated
                                        </p>
                                        <p className="text-xs text-[#0F172A]/60 font-medium mt-0.5">
                                            {formattedUpdatedAt}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Save Card */}
                        <div className="bg-white border border-gray-100 rounded-xl p-5">
                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                                disabled={processing}
                                onClick={handleSubmit}
                            >
                                {processing ? 'Updating…' : 'Update Service'}
                            </Button>
                            <p className="text-xs text-[#0F172A]/40 mt-2 text-center">
                                Fields marked * are required
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
