import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    Building2, Share2, PanelBottom, BarChart3, MessageCircle, Search, Power,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    settings: Record<string, string>;
}

interface FormFields {
    // Company Info
    site_name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    // Business Registration
    gst_number: string;
    cin_number: string;
    udyam_number: string;
    // Social Media Links
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube_url: string;
    whatsapp_number: string;
    // Footer Content
    footer_description: string;
    footer_copyright_text: string;
    // Homepage Stats
    stat_1_number: string;
    stat_1_label: string;
    stat_2_number: string;
    stat_2_label: string;
    stat_3_number: string;
    stat_3_label: string;
    stat_4_number: string;
    stat_4_label: string;
    // Contact & Communication
    admin_notification_email: string;
    business_hours: string;
    // SEO & Tracking
    default_meta_description: string;
    og_image_url: string;
    google_analytics_id: string;
    meta_pixel_id: string;
    // Site Behavior
    maintenance_mode: string;
}

const TABS = [
    { key: 'company', label: 'Company Info', icon: Building2 },
    { key: 'registration', label: 'Business Registration', icon: Building2 },
    { key: 'social', label: 'Social Media Links', icon: Share2 },
    { key: 'footer', label: 'Footer Content', icon: PanelBottom },
    { key: 'stats', label: 'Homepage Stats', icon: BarChart3 },
    { key: 'contact', label: 'Contact & Communication', icon: MessageCircle },
    { key: 'seo', label: 'SEO & Tracking', icon: Search },
    { key: 'behavior', label: 'Site Behavior', icon: Power },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function SettingsIndex({ settings }: Props) {
    const [activeTab, setActiveTab] = useState<TabKey>('company');

    const { data, setData, put, processing, errors } = useForm<FormFields>({
        site_name: settings.site_name ?? '',
        tagline: settings.tagline ?? '',
        email: settings.email ?? '',
        phone: settings.phone ?? '',
        address: settings.address ?? '',
        gst_number: settings.gst_number ?? '',
        cin_number: settings.cin_number ?? '',
        udyam_number: settings.udyam_number ?? '',
        facebook: settings.facebook ?? '',
        twitter: settings.twitter ?? '',
        linkedin: settings.linkedin ?? '',
        instagram: settings.instagram ?? '',
        youtube_url: settings.youtube_url ?? '',
        whatsapp_number: settings.whatsapp_number ?? '',
        footer_description: settings.footer_description ?? '',
        footer_copyright_text: settings.footer_copyright_text ?? '',
        stat_1_number: settings.stat_1_number ?? '',
        stat_1_label: settings.stat_1_label ?? '',
        stat_2_number: settings.stat_2_number ?? '',
        stat_2_label: settings.stat_2_label ?? '',
        stat_3_number: settings.stat_3_number ?? '',
        stat_3_label: settings.stat_3_label ?? '',
        stat_4_number: settings.stat_4_number ?? '',
        stat_4_label: settings.stat_4_label ?? '',
        admin_notification_email: settings.admin_notification_email ?? '',
        business_hours: settings.business_hours ?? '',
        default_meta_description: settings.default_meta_description ?? '',
        og_image_url: settings.og_image_url ?? '',
        google_analytics_id: settings.google_analytics_id ?? '',
        meta_pixel_id: settings.meta_pixel_id ?? '',
        maintenance_mode: settings.maintenance_mode ?? '0',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.settings.update'));
    }

    function field(name: keyof FormFields) {
        return {
            id: name,
            value: data[name],
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData(name, e.target.value),
        };
    }

    return (
        <AdminLayout title="Site Settings">
            <Head title="Site Settings" />

            <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0F172A]">Site Settings</h2>
                <p className="text-sm text-[#0F172A]/50 mt-0.5">Your website control center — manage content, tracking and behavior without a code deploy</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Tab list */}
                    <nav className="lg:w-64 flex-shrink-0">
                        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                            {TABS.map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActiveTab(key)}
                                    className={cn(
                                        'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors text-left',
                                        activeTab === key
                                            ? 'bg-[#2563EB] text-white shadow-sm'
                                            : 'text-[#0F172A]/60 hover:bg-gray-100 hover:text-[#0F172A]',
                                    )}
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Tab content */}
                    <div className="flex-1 min-w-0 max-w-3xl">
                        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                            {activeTab === 'company' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">Company Info</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="site_name">Site Name <span className="text-red-500">*</span></Label>
                                            <Input {...field('site_name')} placeholder="NobelIQ Technologies" />
                                            {errors.site_name && <p className="text-xs text-red-500">{errors.site_name}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="tagline">Tagline</Label>
                                            <Input {...field('tagline')} placeholder="Data-driven insights..." />
                                            {errors.tagline && <p className="text-xs text-red-500">{errors.tagline}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="email">Email</Label>
                                            <Input type="email" {...field('email')} placeholder="hello@nobeliqtechnologies.com" />
                                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input {...field('phone')} placeholder="+91 98765 43210" />
                                            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="address">Address</Label>
                                        <Textarea {...field('address')} placeholder="123 Business Park, Bangalore, Karnataka 560001" rows={3} />
                                        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'registration' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">Business Registration</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="gst_number">GST Number</Label>
                                            <Input {...field('gst_number')} placeholder="23AAAAA0000A1Z5" />
                                            {errors.gst_number && <p className="text-xs text-red-500">{errors.gst_number}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="cin_number">CIN Number</Label>
                                            <Input {...field('cin_number')} placeholder="U72900MP2024PTC000000" />
                                            {errors.cin_number && <p className="text-xs text-red-500">{errors.cin_number}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="udyam_number">Udyam Number</Label>
                                            <Input {...field('udyam_number')} placeholder="UDYAM-MP-40-0050255" />
                                            {errors.udyam_number && <p className="text-xs text-red-500">{errors.udyam_number}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'social' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">Social Media Links</h3>
                                    <p className="text-xs text-[#0F172A]/50 -mt-2">Leave a field blank to hide that icon from the site footer.</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="facebook">Facebook</Label>
                                            <Input {...field('facebook')} placeholder="https://facebook.com/nobeliqtechnologies" />
                                            {errors.facebook && <p className="text-xs text-red-500">{errors.facebook}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="twitter">Twitter / X</Label>
                                            <Input {...field('twitter')} placeholder="https://twitter.com/nobeliqtechnologies" />
                                            {errors.twitter && <p className="text-xs text-red-500">{errors.twitter}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="linkedin">LinkedIn</Label>
                                            <Input {...field('linkedin')} placeholder="https://linkedin.com/company/nobeliqtechnologies" />
                                            {errors.linkedin && <p className="text-xs text-red-500">{errors.linkedin}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="instagram">Instagram</Label>
                                            <Input {...field('instagram')} placeholder="https://instagram.com/nobeliqtechnologies" />
                                            {errors.instagram && <p className="text-xs text-red-500">{errors.instagram}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="youtube_url">YouTube</Label>
                                            <Input {...field('youtube_url')} placeholder="https://youtube.com/@nobeliqtechnologies" />
                                            {errors.youtube_url && <p className="text-xs text-red-500">{errors.youtube_url}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                                            <Input {...field('whatsapp_number')} placeholder="919876543210" />
                                            <p className="text-xs text-[#0F172A]/40">Country code + number, digits only. Shows a floating chat button site-wide when filled in.</p>
                                            {errors.whatsapp_number && <p className="text-xs text-red-500">{errors.whatsapp_number}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'footer' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">Footer Content</h3>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="footer_description">Footer Description</Label>
                                        <Textarea {...field('footer_description')} placeholder="Short company blurb shown in the footer..." rows={3} />
                                        {errors.footer_description && <p className="text-xs text-red-500">{errors.footer_description}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="footer_copyright_text">Copyright Text</Label>
                                        <Input {...field('footer_copyright_text')} placeholder="© {year} NobelIQ Technologies. All rights reserved." />
                                        <p className="text-xs text-[#0F172A]/40">Use <code className="bg-gray-100 px-1 rounded">{'{year}'}</code> as a placeholder — it's replaced with the current year automatically.</p>
                                        {errors.footer_copyright_text && <p className="text-xs text-red-500">{errors.footer_copyright_text}</p>}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'stats' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">Homepage Stats</h3>
                                    <p className="text-xs text-[#0F172A]/50 -mt-2">Shown on the homepage and product page stats bar. Enter the full number including any symbol (e.g. "10+", "98.7%", "3 hrs").</p>
                                    {([1, 2, 3, 4] as const).map((i) => (
                                        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                            <div className="space-y-1.5">
                                                <Label htmlFor={`stat_${i}_number`}>Stat {i} — Number</Label>
                                                <Input {...field(`stat_${i}_number` as keyof FormFields)} placeholder="10+" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor={`stat_${i}_label`}>Stat {i} — Label</Label>
                                                <Input {...field(`stat_${i}_label` as keyof FormFields)} placeholder="CA Firms" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'contact' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">Contact & Communication</h3>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="admin_notification_email">Admin Notification Email</Label>
                                        <Input type="email" {...field('admin_notification_email')} placeholder="admin@misanaly.in" />
                                        <p className="text-xs text-[#0F172A]/40">Where new lead and waitlist notifications are sent. Leave blank to use the server default.</p>
                                        {errors.admin_notification_email && <p className="text-xs text-red-500">{errors.admin_notification_email}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="business_hours">Business Hours</Label>
                                        <Input {...field('business_hours')} placeholder="Mon-Sat, 10 AM - 7 PM IST" />
                                        {errors.business_hours && <p className="text-xs text-red-500">{errors.business_hours}</p>}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">SEO & Tracking</h3>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="default_meta_description">Default Meta Description</Label>
                                        <Textarea {...field('default_meta_description')} placeholder="NobelIQ Technologies — data-driven insights to grow your business." rows={3} />
                                        {errors.default_meta_description && <p className="text-xs text-red-500">{errors.default_meta_description}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="og_image_url">OG Image URL</Label>
                                        <Input {...field('og_image_url')} placeholder="https://nobeliqtechnologies.com/og-image.png" />
                                        {errors.og_image_url && <p className="text-xs text-red-500">{errors.og_image_url}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                                            <Input {...field('google_analytics_id')} placeholder="G-XXXXXXX" />
                                            <p className="text-xs text-[#0F172A]/40">GA4 measurement ID. Leave blank to skip loading analytics.</p>
                                            {errors.google_analytics_id && <p className="text-xs text-red-500">{errors.google_analytics_id}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="meta_pixel_id">Meta Pixel ID</Label>
                                            <Input {...field('meta_pixel_id')} placeholder="123456789012345" />
                                            <p className="text-xs text-[#0F172A]/40">Facebook/Meta Pixel ID. Leave blank to skip loading the pixel.</p>
                                            {errors.meta_pixel_id && <p className="text-xs text-red-500">{errors.meta_pixel_id}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'behavior' && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-semibold text-[#0F172A] pb-3 border-b border-gray-100">Site Behavior</h3>
                                    <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50">
                                        <input
                                            id="maintenance_mode"
                                            type="checkbox"
                                            checked={data.maintenance_mode === '1'}
                                            onChange={(e) => setData('maintenance_mode', e.target.checked ? '1' : '0')}
                                            className="mt-0.5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                                        />
                                        <label htmlFor="maintenance_mode" className="text-sm">
                                            <span className="font-medium text-[#0F172A]">Enable Maintenance Mode</span>
                                            <p className="text-xs text-[#0F172A]/60 mt-0.5">
                                                Shows a "We'll be back soon" page to all visitors. The admin panel stays reachable so you can turn this back off.
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8"
                            >
                                {processing ? 'Saving…' : 'Save All Settings'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
