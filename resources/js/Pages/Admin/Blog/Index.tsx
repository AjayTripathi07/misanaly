import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, FileText, Calendar } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { type BlogPost, type BlogCategory } from '@/types';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    posts: {
        data: BlogPost[];
        current_page: number;
        last_page: number;
        total: number;
        links: PaginationLink[];
    };
    categories: BlogCategory[];
    filters: { status?: string };
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export default function AdminBlogIndex({ posts, categories, filters }: Props) {

    function handleStatusFilter(value: string) {
        const params: Record<string, string> = {};
        if (value && value !== 'all') params.status = value;
        router.get('/admin/blog', params, { preserveState: true });
    }

    function handleDelete(id: number, title: string) {
        if (confirm(`Delete "${title}"? This cannot be undone.`)) {
            router.delete(`/admin/blog/${id}`, { preserveScroll: true });
        }
    }

    function handleTogglePublish(post: BlogPost) {
        router.patch(`/admin/blog/${post.id}/toggle-publish`, {}, { preserveScroll: true });
    }

    const pageLinks = posts.links;

    return (
        <AdminLayout title="Blog Posts">
            <Head title="Blog Posts — Admin" />

            {/* ── TOP BAR ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-bold text-[#0F172A]">Blog Posts</h1>
                    <p className="text-sm text-[#0F172A]/50 mt-0.5">
                        {posts.total} post{posts.total !== 1 ? 's' : ''} total
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Status filter */}
                    <Select
                        value={filters.status ?? 'all'}
                        onValueChange={handleStatusFilter}
                    >
                        <SelectTrigger className="w-36 text-sm">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Posts</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* New post button */}
                    <Link href="/admin/blog/create">
                        <Button className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            New Post
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ── TABLE CARD ── */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {posts.data.length === 0 ? (
                    /* Empty state */
                    <div className="text-center py-20">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-7 w-7 text-gray-300" />
                        </div>
                        <h3 className="font-semibold text-[#0F172A] mb-1">No posts found</h3>
                        <p className="text-sm text-[#0F172A]/40 mb-5">
                            {filters.status ? `No ${filters.status} posts yet.` : 'Start writing your first blog post.'}
                        </p>
                        <Link href="/admin/blog/create">
                            <Button size="sm" className="bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
                                <Plus className="h-4 w-4 mr-1.5" />
                                New Post
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/60">
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider w-16">Cover</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider">Title</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider w-32">Category</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider w-28">Status</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider w-32">Date</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider w-32">Author</th>
                                        <th className="text-right px-5 py-3 text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider w-36">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {posts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                            {/* Thumbnail */}
                                            <td className="px-5 py-3.5">
                                                {post.cover_image ? (
                                                    <img
                                                        src={post.cover_image}
                                                        alt={post.title}
                                                        className="w-10 h-7 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-7 rounded-md bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                                                        <FileText className="h-3.5 w-3.5 text-blue-300" />
                                                    </div>
                                                )}
                                            </td>

                                            {/* Title + excerpt */}
                                            <td className="px-5 py-3.5 max-w-xs">
                                                <p className="font-medium text-[#0F172A] truncate">{post.title}</p>
                                                {post.excerpt && (
                                                    <p className="text-xs text-[#0F172A]/40 mt-0.5 truncate">{post.excerpt}</p>
                                                )}
                                            </td>

                                            {/* Category */}
                                            <td className="px-5 py-3.5">
                                                {post.category ? (
                                                    <Badge className="bg-blue-50 text-[#2563EB] border border-blue-100 text-xs rounded-full font-normal">
                                                        {post.category.name}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-xs text-[#0F172A]/30">—</span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-3.5">
                                                {post.status === 'published' ? (
                                                    <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs rounded-full font-normal">
                                                        Published
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-gray-100 text-gray-500 border border-gray-200 text-xs rounded-full font-normal">
                                                        Draft
                                                    </Badge>
                                                )}
                                            </td>

                                            {/* Published date */}
                                            <td className="px-5 py-3.5">
                                                {post.published_at ? (
                                                    <span className="text-xs text-[#0F172A]/60 flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(post.published_at)}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-[#0F172A]/30">—</span>
                                                )}
                                            </td>

                                            {/* Author */}
                                            <td className="px-5 py-3.5">
                                                <span className="text-xs text-[#0F172A]/60">
                                                    {post.author?.name ?? '—'}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {/* Edit */}
                                                    <Link href={`/admin/blog/${post.id}/edit`}>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </Link>

                                                    {/* Toggle publish */}
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className={`h-8 w-8 p-0 ${
                                                            post.status === 'published'
                                                                ? 'text-green-500 hover:text-amber-500 hover:bg-amber-50'
                                                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                                        }`}
                                                        onClick={() => handleTogglePublish(post)}
                                                        title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                                                    >
                                                        {post.status === 'published' ? (
                                                            <Eye className="h-3.5 w-3.5" />
                                                        ) : (
                                                            <EyeOff className="h-3.5 w-3.5" />
                                                        )}
                                                    </Button>

                                                    {/* Delete */}
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                        onClick={() => handleDelete(post.id, post.title)}
                                                        title="Delete"
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

                        {/* Mobile cards */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {posts.data.map((post) => (
                                <div key={post.id} className="p-4">
                                    <div className="flex items-start gap-3">
                                        {post.cover_image ? (
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-12 h-9 object-cover rounded-lg flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center flex-shrink-0">
                                                <FileText className="h-4 w-4 text-blue-300" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {post.status === 'published' ? (
                                                    <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs rounded-full">
                                                        Published
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-gray-100 text-gray-500 border border-gray-200 text-xs rounded-full">
                                                        Draft
                                                    </Badge>
                                                )}
                                                {post.category && (
                                                    <Badge className="bg-blue-50 text-[#2563EB] border border-blue-100 text-xs rounded-full">
                                                        {post.category.name}
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="font-medium text-[#0F172A] text-sm truncate">{post.title}</p>
                                            <p className="text-xs text-[#0F172A]/40 mt-0.5">
                                                {post.author?.name} {post.published_at ? `· ${formatDate(post.published_at)}` : ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <Link href={`/admin/blog/${post.id}/edit`}>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-[#2563EB]">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                                                onClick={() => handleDelete(post.id, post.title)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ── PAGINATION ── */}
            {posts.last_page > 1 && (
                <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap">
                    {pageLinks.map((link, i) => {
                        const rawLabel = link.label
                            .replace(/&laquo;/g, '‹')
                            .replace(/&raquo;/g, '›')
                            .replace(/&amp;/g, '&');
                        const isPrev = i === 0;
                        const isNext = i === pageLinks.length - 1;

                        if (!link.url) {
                            return (
                                <span
                                    key={i}
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm text-gray-300 cursor-not-allowed border border-gray-100"
                                >
                                    {isPrev ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : rawLabel}
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={i}
                                href={link.url}
                                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                    link.active
                                        ? 'bg-[#2563EB] text-white shadow-sm'
                                        : 'bg-white border border-gray-200 text-[#0F172A]/70 hover:border-[#2563EB] hover:text-[#2563EB]'
                                }`}
                            >
                                {isPrev ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : rawLabel}
                            </Link>
                        );
                    })}
                </div>
            )}
        </AdminLayout>
    );
}
