<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Mail\WaitlistAdminNotification;
use App\Mail\WaitlistConfirmation;
use App\Models\Product;
use App\Models\ProductWaitlist;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class WaitlistController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255'],
            'phone'      => ['required', 'string', 'max:30'],
            'company'    => ['nullable', 'string', 'max:255'],
            'remark'     => ['nullable', 'string', 'max:1000'],
            'product_id' => ['nullable', 'integer', 'exists:products,id'],
            'source'     => ['nullable', 'string', 'max:100'],
        ]);

        // Check for duplicate email (friendly message, don't block re-registration)
        $existing = ProductWaitlist::where('email', $validated['email'])->first();

        if ($existing) {
            return back()->with('waitlist_success', "You're already on the list! We'll email {$validated['email']} the moment Bank2Books launches with your free 3-month access.");
        }

        $entry = ProductWaitlist::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'phone'      => $validated['phone'],
            'company'    => $validated['company'] ?? null,
            'remark'     => $validated['remark'] ?? null,
            'product_id' => $validated['product_id'] ?? Product::where('slug', 'bank2books')->value('id'),
            'source'     => $validated['source'] ?? 'product-page',
            'status'     => 'pending',
        ]);

        // Confirmation email to user
        try {
            Mail::to($entry->email, $entry->name)->send(new WaitlistConfirmation($entry));
        } catch (\Throwable $e) {
            Log::error('Waitlist confirmation email failed', ['id' => $entry->id, 'error' => $e->getMessage()]);
        }

        // Admin notification
        try {
            Mail::to(env('ADMIN_NOTIFICATION_EMAIL', 'admin@misanaly.in'))
                ->send(new WaitlistAdminNotification($entry));
        } catch (\Throwable $e) {
            Log::error('Waitlist admin notification failed', ['id' => $entry->id, 'error' => $e->getMessage()]);
        }

        return back()->with('waitlist_success', "You're on the list! 🎉 We'll email you at {$entry->email} the moment Bank2Books launches with your free 3-month access.");
    }
}
