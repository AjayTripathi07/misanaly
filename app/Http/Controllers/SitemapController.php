<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $services = Service::where('status', 'active')->get(['slug', 'updated_at']);
        $products = Product::where('status', 'active')->get(['slug', 'updated_at']);
        $posts    = BlogPost::where('status', 'published')->get(['slug', 'published_at', 'updated_at']);

        $xml = view('sitemap', compact('services', 'products', 'posts'))->render();

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
