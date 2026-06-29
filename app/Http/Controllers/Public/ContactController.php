<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Contact');
    }

    public function quote(): Response
    {
        $services = Service::where('status', 'active')
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        return Inertia::render('GetQuote', compact('services'));
    }

    public function demo(): Response
    {
        $products = Product::where('status', 'active')
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        return Inertia::render('RequestDemo', compact('products'));
    }
}
