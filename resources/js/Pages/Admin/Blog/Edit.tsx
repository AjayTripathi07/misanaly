import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import TiptapEditor from '@/Components/TiptapEditor';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { type BlogPost, type BlogCategory } from '@/types';

interface Props {
    post: BlogPost;
    categories: BlogCategory[];
}

function toSlug(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Format a JS Date or ISO string to YYYY-MM-DD for <input type="date">
function toDateInputValue(dateStr: string | null): string {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().slice(0, 10);
}

export default function AdminBlogEdit({ post, categories: initialCategories }: Props) {
    const [categories, setCategories] = useState<BlogCategory[]>(initialCategories);
    const [showNewCat, setShowNewCat] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [savingCat, setSavingCat] = useState(false);
    const [catError, setCatError] = useState('');

    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        body: post.body ?? '',
        cover_image: post.cover_image ?? '',
        status: post.status,
        published_at: toDateInputValue(post.published_at),
        category_id: post.category_id !== null ? post.category_id : ('' as string | number),
    });

    function handleTitleChange(val: string) {
        setData('title', val);
        setData('slug', toSlug(val));
    }

    function handleSubmit(e: React.FormEvent, status: 'draft' | 'published') {
        e.preventDefault();
        put(`/admin/blog/${post.id}`, {
            data: { ...data, status },
        } as Parameters<typeof put>[1]);
    }

    async function handleSaveCategory() {
        if (!newCatName.trim()) {
            setCatError('Category name is required.');
            return;
        }
        setSavingCat(true);
        setCatError('');
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
            const res = await fetch('/admin/blog-categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                body: JSON.stringify({ name: newCatName.trim() }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                setCatError(err?.message ?? 'Failed to create category.');
                return;
            }
            const cat: BlogCategory = await res.json();
            setCategories((prev) => [...prev, cat]);
            setData('category_id', cat.id);
            setNewCatName('');
            setShowNewCat(false);
        } catch {
            setCatError('Network error. Please try again.');
        } finally {
            setSavingCat(false);
        }
    }

    return (
        <AdminLayout title={`Edit: ${post.title}`}>
            <Head title={`Edit Post — ${post.title}`} />

            {/* Back link */}
            <div className="mb-6">
                <Link
                    href="/admin/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-[#0F172A]/60 hover:text-[#0F172A] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog Posts
                </Link>
            </div>

            <form onSubmit={(e) => handleSubmit(e, data.status)}>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* ── LEFT: Main Content (2/3) ── */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* Title + Slug + Excerpt */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h2 className="font-semibold text-[#0F172A] mb-5">Post Details</h2>
                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <Label htmlFor="title" className="text-sm font-medium text-[#0F172A]">
                                        Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        className="mt-1 text-lg font-medium"
                                        placeholder="Your post title…"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div>
                                    <Label htmlFor="slug" className="text-sm font-medium text-[#0F172A]">
                                        Slug <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="mt-1 flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB]/20 focus-within:border-[#2563EB]">
                                        <span className="px-3 py-2 bg-gray-50 text-xs text-[#0F172A]/40 border-r border-gray-200 flex-shrink-0">
                                            /blog/
                                        </span>
                                        <input
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="flex-1 px-3 py-2 text-sm text-[#0F172A] bg-white outline-none"
                                            placeholder="your-post-slug"
                                        />
                                    </div>
                                    {errors.slug && (
                                        <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
                                    )}
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <Label htmlFor="excerpt" className="text-sm font-medium text-[#0F172A]">
                                            Excerpt
                                        </Label>
                                        <span className={`text-xs ${data.excerpt.length > 160 ? 'text-red-500' : 'text-[#0F172A]/40'}`}>
                                            {data.excerpt.length}/160
                                        </span>
                                    </div>
                                    <Textarea
                                        id="excerpt"
                                        rows={3}
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        placeholder="Brief summary shown in listing pages…"
                                    />
                                    <p className="text-xs text-[#0F172A]/40 mt-1">
                                        Recommended: under 160 characters for SEO
                                    </p>
                                    {errors.excerpt && (
                                        <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Body editor — key={post.id} forces re-mount if post changes */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <Label className="text-sm font-medium text-[#0F172A] mb-3 block">
                                Content <span className="text-red-500">*</span>
                            </Label>
                            <TiptapEditor
                                key={post.id}
                                content={data.body}
                                onChange={(html) => setData('body', html)}
                            />
                            {errors.body && (
                                <p className="text-red-500 text-xs mt-1">{errors.body}</p>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: Sidebar (1/3) ── */}
                    <div className="xl:col-span-1 space-y-5">

                        {/* Publish actions */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-semibold text-[#0F172A] mb-4">Update Post</h3>
                            <div className="space-y-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full border-gray-200 text-[#0F172A]/70 hover:border-[#2563EB] hover:text-[#2563EB]"
                                    disabled={processing}
                                    onClick={(e) => handleSubmit(e, 'draft')}
                                >
                                    {processing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Save as Draft
                                </Button>
                                <Button
                                    type="button"
                                    className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                                    disabled={processing}
                                    onClick={(e) => handleSubmit(e, 'published')}
                                >
                                    {processing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Save &amp; Publish
                                </Button>
                            </div>
                            <p className="text-xs text-[#0F172A]/40 mt-3 text-center">
                                Fields marked * are required
                            </p>
                        </div>

                        {/* Status (radio) */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-semibold text-[#0F172A] mb-4">Status</h3>
                            <div className="space-y-2">
                                {(['draft', 'published'] as const).map((s) => (
                                    <label
                                        key={s}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border transition-colors ${
                                            data.status === s
                                                ? 'border-[#2563EB] bg-blue-50'
                                                : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={s}
                                            checked={data.status === s}
                                            onChange={() => setData('status', s)}
                                            className="accent-[#2563EB]"
                                        />
                                        <span className={`text-sm font-medium capitalize ${data.status === s ? 'text-[#2563EB]' : 'text-[#0F172A]/70'}`}>
                                            {s}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {/* Published At */}
                            {data.status === 'published' && (
                                <div className="mt-4">
                                    <Label htmlFor="published_at" className="text-sm font-medium text-[#0F172A] mb-1 block">
                                        Publish Date
                                    </Label>
                                    <Input
                                        id="published_at"
                                        type="date"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                    />
                                    {errors.published_at && (
                                        <p className="text-red-500 text-xs mt-1">{errors.published_at}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-semibold text-[#0F172A] mb-4">Category</h3>
                            <Select
                                value={data.category_id ? String(data.category_id) : 'none'}
                                onValueChange={(val) => setData('category_id', val === 'none' ? '' : parseInt(val))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No category</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && (
                                <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>
                            )}

                            {/* Inline new category */}
                            {showNewCat ? (
                                <div className="mt-3 space-y-2">
                                    <Input
                                        placeholder="Category name"
                                        value={newCatName}
                                        onChange={(e) => setNewCatName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSaveCategory())}
                                        autoFocus
                                    />
                                    {catError && <p className="text-red-500 text-xs">{catError}</p>}
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] flex-1"
                                            onClick={handleSaveCategory}
                                            disabled={savingCat}
                                        >
                                            {savingCat ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Save'}
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => { setShowNewCat(false); setNewCatName(''); setCatError(''); }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowNewCat(true)}
                                    className="mt-2 flex items-center gap-1 text-xs text-[#2563EB] hover:underline"
                                >
                                    <Plus className="h-3 w-3" />
                                    Add new category
                                </button>
                            )}
                        </div>

                        {/* Cover image */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-semibold text-[#0F172A] mb-4">Cover Image</h3>
                            <Label htmlFor="cover_image" className="text-sm font-medium text-[#0F172A] mb-1 block">
                                Image URL
                            </Label>
                            <Input
                                id="cover_image"
                                type="url"
                                value={data.cover_image}
                                onChange={(e) => setData('cover_image', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            {data.cover_image && (
                                <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                                    <img
                                        src={data.cover_image}
                                        alt="Cover preview"
                                        className="w-full h-28 object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>
                            )}
                            {errors.cover_image && (
                                <p className="text-red-500 text-xs mt-1">{errors.cover_image}</p>
                            )}
                        </div>

                        {/* Meta info */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-xs text-[#0F172A]/50 space-y-1.5">
                            <p><span className="font-medium text-[#0F172A]/70">Post ID:</span> #{post.id}</p>
                            <p><span className="font-medium text-[#0F172A]/70">Author:</span> {post.author?.name ?? '—'}</p>
                            {post.published_at && (
                                <p>
                                    <span className="font-medium text-[#0F172A]/70">Published:</span>{' '}
                                    {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
