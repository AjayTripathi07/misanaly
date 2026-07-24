import { Head, Link, router } from '@inertiajs/react';
import { Users, Plus, Pencil, Trash2, Download } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
    photo: string | null;
    linkedin_url: string | null;
    sort_order: number;
}

interface Props {
    members: TeamMember[];
}

function initials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

const BG_COLORS = [
    'bg-blue-500', 'bg-violet-500', 'bg-cyan-500',
    'bg-emerald-500', 'bg-amber-500', 'bg-rose-500',
];

export default function TeamIndex({ members }: Props) {
    function handleDelete(id: number, name: string) {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
        router.delete(route('admin.team.destroy', id), { preserveScroll: true });
    }

    return (
        <AdminLayout title="Team Members">
            <Head title="Team Members" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0F172A]">Team Members</h2>
                    <p className="text-sm text-[#0F172A]/50 mt-0.5">{members.length} member{members.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                    <a href={route('admin.team.export')}>
                        <Button variant="outline" size="sm" className="gap-1.5">
                            <Download className="h-4 w-4" />
                            Export CSV
                        </Button>
                    </a>
                    <Link href={route('admin.team.create')}>
                        <Button size="sm" className="gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                            <Plus className="h-4 w-4" />
                            Add Member
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                {members.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#0F172A]/40">
                        <Users className="h-10 w-10 mb-3 opacity-30" />
                        <p className="text-sm font-medium">No team members yet</p>
                        <p className="text-xs mt-1">Click "Add Member" to get started</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Member</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden sm:table-cell">Role</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider hidden md:table-cell">Sort</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {members.map((member, idx) => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                {member.photo ? (
                                                    <img
                                                        src={member.photo}
                                                        alt={member.name}
                                                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${BG_COLORS[idx % BG_COLORS.length]}`}>
                                                        {initials(member.name)}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-[#0F172A]">{member.name}</p>
                                                    <p className="text-xs text-[#0F172A]/50 sm:hidden">{member.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[#0F172A]/70 hidden sm:table-cell">{member.role}</td>
                                        <td className="px-4 py-3 text-[#0F172A]/50 hidden md:table-cell">{member.sort_order}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.team.edit', member.id)}>
                                                    <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:border-red-300"
                                                    onClick={() => handleDelete(member.id, member.name)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
