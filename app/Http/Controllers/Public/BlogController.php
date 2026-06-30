<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('category');

        $query = BlogPost::where('status', 'published')
            ->with(['category', 'author'])
            ->orderByDesc('published_at');

        if ($categorySlug && $categorySlug !== 'all') {
            $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
        }

        $posts = $query->paginate(10)->withQueryString();

        $categories = BlogCategory::withCount(['posts' => fn ($q) => $q->where('status', 'published')])->get();

        return Inertia::render('Blog/Index', [
            'posts'           => $posts,
            'categories'      => $categories,
            'activeCategory'  => $categorySlug ?? 'all',
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::where('slug', $slug)
            ->where('status', 'published')
            ->with(['category', 'author'])
            ->firstOrFail();

        $related = BlogPost::where('status', 'published')
            ->where('id', '!=', $post->id)
            ->where('category_id', $post->category_id)
            ->with(['category', 'author'])
            ->orderByDesc('published_at')
            ->limit(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post'    => $post,
            'related' => $related,
        ]);
    }
}
