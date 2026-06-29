<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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

        Lead::create($validated);

        return back()->with('success', "Thank you! We'll get back to you within 24 hours.");
    }
}
