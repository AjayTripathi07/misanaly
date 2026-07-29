<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Traits\Exportable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BlogController extends Controller
{
    use Exportable;

    public function export(): StreamedResponse
    {
        $posts = BlogPost::with(['category', 'author'])->orderByDesc('created_at')->get();

        $rows = $posts->map(fn (BlogPost $p) => [
            $p->title,
            $p->slug,
            $p->category->name ?? '',
            $p->status,
            $p->author->name ?? '',
            $p->published_at?->format('Y-m-d H:i'),
            $p->created_at->format('Y-m-d H:i'),
        ]);

        return $this->exportCsv('blog-posts', [
            'Title', 'Slug', 'Category', 'Status', 'Author', 'Published At', 'Created At',
        ], $rows);
    }

    public function index(Request $request): Response
    {
        $query = BlogPost::with(['category', 'author'])
            ->orderByDesc('created_at');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $posts = $query->paginate(15)->withQueryString();
        $categories = BlogCategory::orderBy('name')->get();

        return Inertia::render('Admin/Blog/Index', [
            'posts'      => $posts,
            'categories' => $categories,
            'filters'    => $request->only('status'),
        ]);
    }

    public function create(): Response
    {
        $categories = BlogCategory::orderBy('name')->get();

        return Inertia::render('Admin/Blog/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'             => ['required', 'string', 'max:255'],
            'slug'              => ['required', 'string', 'max:255', 'unique:blog_posts,slug'],
            'excerpt'           => ['required', 'string', 'max:500'],
            'body'              => ['required', 'string'],
            'cover_image'       => ['nullable', 'string', 'max:1000'],
            'cover_image_file'  => ['nullable', 'image', 'max:2048'],
            'status'            => ['required', 'in:draft,published'],
            'published_at'      => ['nullable', 'date'],
            'category_id'       => ['nullable', 'exists:blog_categories,id'],
        ]);

        if ($request->hasFile('cover_image_file')) {
            $path = $request->file('cover_image_file')->store('blog', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }
        unset($validated['cover_image_file']);

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        BlogPost::create(array_merge($validated, [
            'author_id' => auth()->id(),
        ]));

        return redirect()->route('admin.blog.index')->with('success', 'Post created successfully.');
    }

    public function edit(BlogPost $post): Response
    {
        $categories = BlogCategory::orderBy('name')->get();

        return Inertia::render('Admin/Blog/Edit', [
            'post'       => $post->load(['category', 'author']),
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, BlogPost $post): RedirectResponse
    {
        $validated = $request->validate([
            'title'             => ['required', 'string', 'max:255'],
            'slug'              => ['required', 'string', 'max:255', "unique:blog_posts,slug,{$post->id}"],
            'excerpt'           => ['required', 'string', 'max:500'],
            'body'              => ['required', 'string'],
            'cover_image'       => ['nullable', 'string', 'max:1000'],
            'cover_image_file'  => ['nullable', 'image', 'max:2048'],
            'status'            => ['required', 'in:draft,published'],
            'published_at'      => ['nullable', 'date'],
            'category_id'       => ['nullable', 'exists:blog_categories,id'],
        ]);

        if ($request->hasFile('cover_image_file')) {
            $this->deleteLocalCoverImage($post->cover_image);
            $path = $request->file('cover_image_file')->store('blog', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        } elseif (($validated['cover_image'] ?? null) !== $post->cover_image) {
            // Admin switched away from a local upload to a different/blank URL — clean up the orphaned file.
            $this->deleteLocalCoverImage($post->cover_image);
        }
        unset($validated['cover_image_file']);

        if ($validated['status'] === 'published' && $post->published_at === null && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(BlogPost $post): RedirectResponse
    {
        $this->deleteLocalCoverImage($post->cover_image);
        $post->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Post deleted.');
    }

    private function deleteLocalCoverImage(?string $path): void
    {
        if ($path && str_starts_with($path, '/storage/blog/')) {
            Storage::disk('public')->delete(Str::after($path, '/storage/'));
        }
    }

    public function togglePublish(BlogPost $post): RedirectResponse
    {
        if ($post->status === 'published') {
            $post->update(['status' => 'draft']);
        } else {
            $post->update([
                'status'       => 'published',
                'published_at' => $post->published_at ?? now(),
            ]);
        }

        return back()->with('success', 'Post status updated.');
    }
}
