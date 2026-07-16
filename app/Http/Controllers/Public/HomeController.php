<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Product;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $activeServicesCount = Service::where('status', 'active')->count();

        $services = Service::where('status', 'active')
            ->orderBy('sort_order')
            ->limit(8)
            ->get(['id', 'slug', 'name', 'tagline', 'icon', 'starting_price']);

        $featuredProduct = Product::where('is_featured', true)
            ->with([
                'features' => fn ($q) => $q->orderBy('sort_order'),
            ])
            ->first();

        $testimonials = Testimonial::latest()->limit(3)->get();

        $latestPosts = BlogPost::where('status', 'published')
            ->orderByDesc('published_at')
            ->limit(3)
            ->get(['id', 'title', 'slug', 'excerpt', 'cover_image', 'published_at']);

        return Inertia::render('Home', [
            'services'        => $services,
            'hasMoreServices' => $activeServicesCount > $services->count(),
            'featuredProduct' => $featuredProduct,
            'testimonials'    => $testimonials,
            'latestPosts'     => $latestPosts,
        ]);
    }
}
