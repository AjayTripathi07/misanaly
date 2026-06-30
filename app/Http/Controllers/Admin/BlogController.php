<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
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
            'title'        => ['required', 'string', 'max:255'],
            'slug'         => ['required', 'string', 'max:255', 'unique:blog_posts,slug'],
            'excerpt'      => ['required', 'string', 'max:500'],
            'body'         => ['required', 'string'],
            'cover_image'  => ['nullable', 'string', 'max:1000'],
            'status'       => ['required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
            'category_id'  => ['nullable', 'exists:blog_categories,id'],
        ]);

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
            'title'        => ['required', 'string', 'max:255'],
            'slug'         => ['required', 'string', 'max:255', "unique:blog_posts,slug,{$post->id}"],
            'excerpt'      => ['required', 'string', 'max:500'],
            'body'         => ['required', 'string'],
            'cover_image'  => ['nullable', 'string', 'max:1000'],
            'status'       => ['required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
            'category_id'  => ['nullable', 'exists:blog_categories,id'],
        ]);

        if ($validated['status'] === 'published' && $post->published_at === null && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(BlogPost $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Post deleted.');
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
