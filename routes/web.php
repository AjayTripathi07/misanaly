<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\LeadController;
use App\Http\Controllers\Public\ProductsController;
use App\Http\Controllers\Public\ServicesController;
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

// Placeholder pages
Route::get('/portfolio', fn () => Inertia::render('Placeholder', ['page' => 'Portfolio']))->name('portfolio');
Route::get('/blog', fn () => Inertia::render('Placeholder', ['page' => 'Blog']))->name('blog');
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
});

require __DIR__.'/auth.php';
