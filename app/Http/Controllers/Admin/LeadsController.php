<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeadsController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Lead::with(['service:id,name', 'product:id,name'])->latest();

        if ($request->filled('type')) {
            $query->where('lead_type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(fn ($q) => $q->where('name', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%"));
        }

        $leads   = $query->paginate(20)->withQueryString();
        $filters = $request->only(['type', 'status', 'search']);

        return Inertia::render('Admin/Leads/Index', compact('leads', 'filters'));
    }

    public function show(Lead $lead): Response
    {
        $lead->load(['service:id,name,slug', 'product:id,name,slug']);

        return Inertia::render('Admin/Leads/Show', compact('lead'));
    }

    public function updateStatus(Request $request, Lead $lead): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:new,contacted,qualified,proposal,won,lost'],
        ]);

        $lead->update(['status' => $request->status]);

        return back()->with('success', 'Lead status updated.');
    }

    public function updateNotes(Request $request, Lead $lead): RedirectResponse
    {
        $request->validate([
            'notes' => ['nullable', 'string', 'max:5000'],
        ]);

        $lead->update(['notes' => $request->notes]);

        return back()->with('success', 'Notes saved.');
    }
}
