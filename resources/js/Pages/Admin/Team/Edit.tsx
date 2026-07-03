import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
    photo: string | null;
    linkedin_url: string | null;
    sort_order: number;
}

interface FormFields {
    name: string;
    role: string;
    bio: string;
    photo: string;
    linkedin_url: string;
    sort_order: number;
}

interface Props {
    member: TeamMember;
}

export default function TeamEdit({ member }: Props) {
    const { data, setData, put, processing, errors } = useForm<FormFields>({
        name: member.name,
        role: member.role,
        bio: member.bio ?? '',
        photo: member.photo ?? '',
        linkedin_url: member.linkedin_url ?? '',
        sort_order: member.sort_order,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.team.update', member.id));
    }

    return (
        <AdminLayout title="Edit Team Member">
            <Head title="Edit Team Member" />

            <div className="mb-6">
                <Link href={route('admin.team.index')} className="inline-flex items-center gap-1.5 text-sm text-[#0F172A]/50 hover:text-[#0F172A] transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Team
                </Link>
                <h2 className="text-xl font-bold text-[#0F172A] mt-2">Edit: {member.name}</h2>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Jane Smith"
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="role">Role / Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                placeholder="Lead Data Analyst"
                            />
                            {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            placeholder="Short biography..."
                            rows={4}
                        />
                        {errors.bio && <p className="text-xs text-red-500">{errors.bio}</p>}
                    </div>

                    {/* Photo + LinkedIn */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="photo">Photo URL</Label>
                            <Input
                                id="photo"
                                type="url"
                                value={data.photo}
                                onChange={(e) => setData('photo', e.target.value)}
                                placeholder="https://..."
                            />
                            {errors.photo && <p className="text-xs text-red-500">{errors.photo}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                            <Input
                                id="linkedin_url"
                                type="url"
                                value={data.linkedin_url}
                                onChange={(e) => setData('linkedin_url', e.target.value)}
                                placeholder="https://linkedin.com/in/..."
                            />
                            {errors.linkedin_url && <p className="text-xs text-red-500">{errors.linkedin_url}</p>}
                        </div>
                    </div>

                    {/* Sort Order */}
                    <div className="space-y-1.5 max-w-xs">
                        <Label htmlFor="sort_order">Sort Order</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', parseInt(e.target.value, 10) || 0)}
                        />
                        {errors.sort_order && <p className="text-xs text-red-500">{errors.sort_order}</p>}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" disabled={processing} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                            {processing ? 'Saving…' : 'Save Changes'}
                        </Button>
                        <Link href={route('admin.team.index')}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
