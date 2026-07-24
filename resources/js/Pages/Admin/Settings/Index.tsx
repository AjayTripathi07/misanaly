import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { CheckCircle2 } from 'lucide-react';

interface Props {
    settings: Record<string, string>;
}

interface PageProps {
    auth: { user: { id: number; name: string; email: string } };
    flash?: { success?: string };
    [key: string]: unknown;
}

interface FormFields {
    site_name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    default_meta_description: string;
    og_image_url: string;
    gst_number: string;
    cin_number: string;
    udyam_number: string;
}

export default function SettingsIndex({ settings }: Props) {
    const { props } = usePage<PageProps>();
    const flash = props.flash;

    const { data, setData, put, processing, errors } = useForm<FormFields>({
        site_name: settings.site_name ?? '',
        tagline: settings.tagline ?? '',
        email: settings.email ?? '',
        phone: settings.phone ?? '',
        address: settings.address ?? '',
        facebook: settings.facebook ?? '',
        twitter: settings.twitter ?? '',
        linkedin: settings.linkedin ?? '',
        instagram: settings.instagram ?? '',
        default_meta_description: settings.default_meta_description ?? '',
        og_image_url: settings.og_image_url ?? '',
        gst_number: settings.gst_number ?? '',
        cin_number: settings.cin_number ?? '',
        udyam_number: settings.udyam_number ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.settings.update'));
    }

    return (
        <AdminLayout title="Site Settings">
            <Head title="Site Settings" />

            <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0F172A]">Site Settings</h2>
                <p className="text-sm text-[#0F172A]/50 mt-0.5">Manage your site's global information and SEO defaults</p>
            </div>

            {flash?.success && (
                <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    {flash.success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                {/* Company Info */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-5 pb-3 border-b border-gray-100">Company Info</h3>
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="site_name">Site Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="site_name"
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                    placeholder="NobelIQ Technologies"
                                />
                                {errors.site_name && <p className="text-xs text-red-500">{errors.site_name}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="tagline">Tagline</Label>
                                <Input
                                    id="tagline"
                                    value={data.tagline}
                                    onChange={(e) => setData('tagline', e.target.value)}
                                    placeholder="Data-driven insights..."
                                />
                                {errors.tagline && <p className="text-xs text-red-500">{errors.tagline}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="hello@nobeliqtechnologies.com"
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+91 98765 43210"
                                />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="123 Business Park, Bangalore, Karnataka 560001"
                                rows={3}
                            />
                            {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-5 pb-3 border-b border-gray-100">Social Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                                id="facebook"
                                value={data.facebook}
                                onChange={(e) => setData('facebook', e.target.value)}
                                placeholder="https://facebook.com/nobeliqtechnologies"
                            />
                            {errors.facebook && <p className="text-xs text-red-500">{errors.facebook}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="twitter">Twitter / X</Label>
                            <Input
                                id="twitter"
                                value={data.twitter}
                                onChange={(e) => setData('twitter', e.target.value)}
                                placeholder="https://twitter.com/nobeliqtechnologies"
                            />
                            {errors.twitter && <p className="text-xs text-red-500">{errors.twitter}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                                id="linkedin"
                                value={data.linkedin}
                                onChange={(e) => setData('linkedin', e.target.value)}
                                placeholder="https://linkedin.com/company/nobeliqtechnologies"
                            />
                            {errors.linkedin && <p className="text-xs text-red-500">{errors.linkedin}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                                id="instagram"
                                value={data.instagram}
                                onChange={(e) => setData('instagram', e.target.value)}
                                placeholder="https://instagram.com/nobeliqtechnologies"
                            />
                            {errors.instagram && <p className="text-xs text-red-500">{errors.instagram}</p>}
                        </div>
                    </div>
                </div>

                {/* SEO Defaults */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-5 pb-3 border-b border-gray-100">SEO Defaults</h3>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="default_meta_description">Default Meta Description</Label>
                            <Textarea
                                id="default_meta_description"
                                value={data.default_meta_description}
                                onChange={(e) => setData('default_meta_description', e.target.value)}
                                placeholder="NobelIQ Technologies — data-driven insights to grow your business."
                                rows={3}
                            />
                            {errors.default_meta_description && <p className="text-xs text-red-500">{errors.default_meta_description}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="og_image_url">OG Image URL</Label>
                            <Input
                                id="og_image_url"
                                value={data.og_image_url}
                                onChange={(e) => setData('og_image_url', e.target.value)}
                                placeholder="https://nobeliqtechnologies.com/og-image.png"
                            />
                            {errors.og_image_url && <p className="text-xs text-red-500">{errors.og_image_url}</p>}
                        </div>
                    </div>
                </div>

                {/* Business Registration */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-5 pb-3 border-b border-gray-100">Business Registration</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="gst_number">GST Number</Label>
                            <Input
                                id="gst_number"
                                value={data.gst_number}
                                onChange={(e) => setData('gst_number', e.target.value)}
                                placeholder="23AAAAA0000A1Z5"
                            />
                            {errors.gst_number && <p className="text-xs text-red-500">{errors.gst_number}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="cin_number">CIN Number</Label>
                            <Input
                                id="cin_number"
                                value={data.cin_number}
                                onChange={(e) => setData('cin_number', e.target.value)}
                                placeholder="U72900MP2024PTC000000"
                            />
                            {errors.cin_number && <p className="text-xs text-red-500">{errors.cin_number}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="udyam_number">Udyam Number</Label>
                            <Input
                                id="udyam_number"
                                value={data.udyam_number}
                                onChange={(e) => setData('udyam_number', e.target.value)}
                                placeholder="UDYAM-MP-40-0050255"
                            />
                            {errors.udyam_number && <p className="text-xs text-red-500">{errors.udyam_number}</p>}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8"
                    >
                        {processing ? 'Saving…' : 'Save All Settings'}
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
