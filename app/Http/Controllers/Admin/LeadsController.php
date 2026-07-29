<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Traits\Exportable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadsController extends Controller
{
    use Exportable;

    public function index(Request $request): Response
    {
        $query = $this->filtered($request)->with(['service:id,name', 'product:id,name'])->latest();

        $leads   = $query->paginate(20)->withQueryString();
        $filters = $request->only(['type', 'status', 'search']);

        return Inertia::render('Admin/Leads/Index', compact('leads', 'filters'));
    }

    public function export(Request $request): StreamedResponse
    {
        $leads = $this->filtered($request)->with(['service:id,name', 'product:id,name'])->latest()->get();

        $rows = $leads->map(fn (Lead $lead) => [
            $lead->name,
            $lead->email,
            $lead->phone,
            $lead->company,
            $lead->lead_type,
            $lead->service->name ?? $lead->product->name ?? '',
            $lead->budget_range,
            $lead->timeline,
            $lead->message,
            $lead->status,
            $lead->notes,
            $lead->source,
            $lead->created_at->format('Y-m-d H:i'),
        ]);

        return $this->exportXlsx('leads', [
            'Name', 'Email', 'Phone', 'Company', 'Type', 'Related Service/Product',
            'Budget Range', 'Timeline', 'Message', 'Status', 'Notes', 'Source', 'Date Received',
        ], $rows);
    }

    private function filtered(Request $request): Builder
    {
        $query = Lead::query();

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

        return $query;
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
