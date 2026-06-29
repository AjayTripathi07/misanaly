<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function index(): Response
    {
        $products = Product::where('status', 'active')
            ->with(['features' => fn ($q) => $q->orderBy('sort_order')->limit(3)])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Products/Index', compact('products'));
    }

    public function show(string $slug): Response
    {
        $product = Product::where('slug', $slug)
            ->where('status', 'active')
            ->with([
                'features'     => fn ($q) => $q->orderBy('sort_order'),
                'screenshots'  => fn ($q) => $q->orderBy('sort_order'),
                'pricingTiers',
            ])
            ->firstOrFail();

        $faqs = Faq::where('category', 'product')
            ->where('related_id', $product->id)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Products/Show', compact('product', 'faqs'));
    }
}
