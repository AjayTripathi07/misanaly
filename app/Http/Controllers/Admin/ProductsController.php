<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function index(): Response
    {
        $products = Product::withCount('features')->orderBy('sort_order')->get();

        return Inertia::render('Admin/Products/Index', compact('products'));
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'slug'          => ['required', 'string', 'max:255', 'unique:products,slug'],
            'tagline'       => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'pricing_model' => ['required', 'string', 'max:100'],
            'demo_url'      => ['nullable', 'url', 'max:500'],
            'status'        => ['required', 'in:active,inactive'],
            'sort_order'    => ['integer', 'min:0'],
            'features'      => ['array'],
            'features.*.title'       => ['required', 'string', 'max:255'],
            'features.*.description' => ['required', 'string'],
            'features.*.icon'        => ['nullable', 'string', 'max:100'],
            'pricing_tiers' => ['array'],
            'pricing_tiers.*.name'          => ['required', 'string', 'max:100'],
            'pricing_tiers.*.price'         => ['nullable', 'numeric', 'min:0'],
            'pricing_tiers.*.features_list' => ['nullable', 'string'],
            'pricing_tiers.*.is_popular'    => ['boolean'],
        ]);

        DB::transaction(function () use ($validated) {
            $product = Product::create([
                'name'          => $validated['name'],
                'slug'          => $validated['slug'],
                'tagline'       => $validated['tagline'],
                'description'   => $validated['description'],
                'pricing_model' => $validated['pricing_model'],
                'demo_url'      => $validated['demo_url'] ?? null,
                'status'        => $validated['status'],
                'sort_order'    => $validated['sort_order'] ?? 0,
            ]);

            foreach ($validated['features'] ?? [] as $i => $feature) {
                $product->features()->create(array_merge($feature, ['sort_order' => $i + 1]));
            }

            foreach ($validated['pricing_tiers'] ?? [] as $tier) {
                $features_json = array_filter(
                    array_map('trim', explode("\n", $tier['features_list'] ?? ''))
                );
                $product->pricingTiers()->create([
                    'name'          => $tier['name'],
                    'price'         => $tier['price'] ?? null,
                    'features_json' => array_values($features_json),
                    'is_popular'    => $tier['is_popular'] ?? false,
                ]);
            }
        });

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product): Response
    {
        $product->load(['features' => fn ($q) => $q->orderBy('sort_order'), 'pricingTiers']);

        return Inertia::render('Admin/Products/Edit', compact('product'));
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'slug'          => ['required', 'string', 'max:255', "unique:products,slug,{$product->id}"],
            'tagline'       => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'pricing_model' => ['required', 'string', 'max:100'],
            'demo_url'      => ['nullable', 'url', 'max:500'],
            'status'        => ['required', 'in:active,inactive'],
            'sort_order'    => ['integer', 'min:0'],
            'features'      => ['array'],
            'features.*.title'       => ['required', 'string', 'max:255'],
            'features.*.description' => ['required', 'string'],
            'features.*.icon'        => ['nullable', 'string', 'max:100'],
            'pricing_tiers' => ['array'],
            'pricing_tiers.*.name'          => ['required', 'string', 'max:100'],
            'pricing_tiers.*.price'         => ['nullable', 'numeric', 'min:0'],
            'pricing_tiers.*.features_list' => ['nullable', 'string'],
            'pricing_tiers.*.is_popular'    => ['boolean'],
        ]);

        DB::transaction(function () use ($validated, $product) {
            $product->update([
                'name'          => $validated['name'],
                'slug'          => $validated['slug'],
                'tagline'       => $validated['tagline'],
                'description'   => $validated['description'],
                'pricing_model' => $validated['pricing_model'],
                'demo_url'      => $validated['demo_url'] ?? null,
                'status'        => $validated['status'],
                'sort_order'    => $validated['sort_order'] ?? 0,
            ]);

            $product->features()->delete();
            foreach ($validated['features'] ?? [] as $i => $feature) {
                $product->features()->create(array_merge($feature, ['sort_order' => $i + 1]));
            }

            $product->pricingTiers()->delete();
            foreach ($validated['pricing_tiers'] ?? [] as $tier) {
                $features_json = array_filter(
                    array_map('trim', explode("\n", $tier['features_list'] ?? ''))
                );
                $product->pricingTiers()->create([
                    'name'          => $tier['name'],
                    'price'         => $tier['price'] ?? null,
                    'features_json' => array_values($features_json),
                    'is_popular'    => $tier['is_popular'] ?? false,
                ]);
            }
        });

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }

    public function toggleStatus(Product $product): RedirectResponse
    {
        $product->update(['status' => $product->status === 'active' ? 'inactive' : 'active']);

        return back()->with('success', 'Product status toggled.');
    }
}
