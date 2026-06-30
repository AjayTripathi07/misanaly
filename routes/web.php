<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\BlogController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\LeadController;
use App\Http\Controllers\Public\ProductsController;
use App\Http\Controllers\Public\ServicesController;
use App\Http\Controllers\Public\WaitlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── Public routes ───────────────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/services', [ServicesController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServicesController::class, 'show'])->name('services.show');
Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductsController::class, 'show'])->name('products.show');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::get('/get-quote', [ContactController::class, 'quote'])->name('get-quote');
Route::get('/request-demo', [ContactController::class, 'demo'])->name('request-demo');
Route::post('/leads', [LeadController::class, 'store'])->name('leads.store');

// Blog (public)
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Waitlist
Route::post('/waitlist', [WaitlistController::class, 'store'])->name('waitlist.store');

// Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Placeholder pages
Route::get('/portfolio', fn () => Inertia::render('Placeholder', ['page' => 'Portfolio']))->name('portfolio');
Route::get('/privacy', fn () => Inertia::render('Placeholder', ['page' => 'Privacy Policy']))->name('privacy');
Route::get('/terms', fn () => Inertia::render('Placeholder', ['page' => 'Terms of Service']))->name('terms');

// ─── Auth routes ─────────────────────────────────────────────────────────────
Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ─── Admin routes ─────────────────────────────────────────────────────────────
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', fn () => redirect()->route('admin.dashboard'));

    // Dashboard
    Route::get('/dashboard', [Admin\DashboardController::class, 'index'])->name('dashboard');

    // Leads
    Route::get('/leads', [Admin\LeadsController::class, 'index'])->name('leads.index');
    Route::get('/leads/{lead}', [Admin\LeadsController::class, 'show'])->name('leads.show');
    Route::patch('/leads/{lead}/status', [Admin\LeadsController::class, 'updateStatus'])->name('leads.update-status');
    Route::patch('/leads/{lead}/notes', [Admin\LeadsController::class, 'updateNotes'])->name('leads.update-notes');

    // Services CRUD
    Route::get('/services', [Admin\ServicesController::class, 'index'])->name('services.index');
    Route::get('/services/create', [Admin\ServicesController::class, 'create'])->name('services.create');
    Route::post('/services', [Admin\ServicesController::class, 'store'])->name('services.store');
    Route::get('/services/{service}/edit', [Admin\ServicesController::class, 'edit'])->name('services.edit');
    Route::put('/services/{service}', [Admin\ServicesController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [Admin\ServicesController::class, 'destroy'])->name('services.destroy');
    Route::patch('/services/{service}/toggle-status', [Admin\ServicesController::class, 'toggleStatus'])->name('services.toggle-status');

    // Products CRUD
    Route::get('/products', [Admin\ProductsController::class, 'index'])->name('products.index');
    Route::get('/products/create', [Admin\ProductsController::class, 'create'])->name('products.create');
    Route::post('/products', [Admin\ProductsController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [Admin\ProductsController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [Admin\ProductsController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [Admin\ProductsController::class, 'destroy'])->name('products.destroy');
    Route::patch('/products/{product}/toggle-status', [Admin\ProductsController::class, 'toggleStatus'])->name('products.toggle-status');

    // Product Screenshots
    Route::post('/products/{product}/screenshots', [Admin\ProductsController::class, 'storeScreenshot'])->name('products.screenshots.store');
    Route::delete('/products/{product}/screenshots/{screenshot}', [Admin\ProductsController::class, 'destroyScreenshot'])->name('products.screenshots.destroy');
    Route::post('/products/{product}/screenshots/upload', [Admin\ProductsController::class, 'uploadScreenshot'])->name('products.screenshots.upload');

    // Blog CRUD
    Route::get('/blog', [Admin\BlogController::class, 'index'])->name('blog.index');
    Route::get('/blog/create', [Admin\BlogController::class, 'create'])->name('blog.create');
    Route::post('/blog', [Admin\BlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/{post}/edit', [Admin\BlogController::class, 'edit'])->name('blog.edit');
    Route::put('/blog/{post}', [Admin\BlogController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{post}', [Admin\BlogController::class, 'destroy'])->name('blog.destroy');
    Route::patch('/blog/{post}/toggle-publish', [Admin\BlogController::class, 'togglePublish'])->name('blog.toggle-publish');

    // Blog Categories (JSON endpoints for inline add)
    Route::get('/blog-categories', [Admin\BlogCategoryController::class, 'index'])->name('blog-categories.index');
    Route::post('/blog-categories', [Admin\BlogCategoryController::class, 'store'])->name('blog-categories.store');

    // Waitlist
    Route::get('/waitlist', [Admin\WaitlistController::class, 'index'])->name('waitlist.index');
    Route::get('/waitlist/export', [Admin\WaitlistController::class, 'export'])->name('waitlist.export');
    Route::patch('/waitlist/{waitlist}/status', [Admin\WaitlistController::class, 'updateStatus'])->name('waitlist.update-status');

});

require __DIR__.'/auth.php';
