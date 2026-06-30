<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Mail\LeadConfirmation;
use App\Mail\NewLeadNotification;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'email'        => ['required', 'email', 'max:255'],
            'phone'        => ['nullable', 'string', 'max:20'],
            'company'      => ['nullable', 'string', 'max:255'],
            'lead_type'    => ['required', 'in:service,product,general'],
            'service_id'   => ['nullable', 'exists:services,id'],
            'product_id'   => ['nullable', 'exists:products,id'],
            'budget_range' => ['nullable', 'string', 'max:100'],
            'timeline'     => ['nullable', 'string', 'max:100'],
            'message'      => ['required', 'string', 'max:5000'],
            'source'       => ['nullable', 'string', 'max:100'],
        ]);

        $lead = Lead::create($validated);

        // Notify admin
        try {
            $adminEmail = env('ADMIN_NOTIFICATION_EMAIL', 'admin@misanaly.in');
            Mail::to($adminEmail)->send(new NewLeadNotification($lead));
        } catch (\Throwable $e) {
            Log::error('Failed to send admin lead notification', [
                'lead_id' => $lead->id,
                'error'   => $e->getMessage(),
            ]);
        }

        // Confirm receipt to the lead
        try {
            Mail::to($lead->email, $lead->name)->send(new LeadConfirmation($lead));
        } catch (\Throwable $e) {
            Log::error('Failed to send lead confirmation email', [
                'lead_id' => $lead->id,
                'error'   => $e->getMessage(),
            ]);
        }

        return back()->with('success', "Thank you! We'll get back to you within 24 hours.");
    }
}
