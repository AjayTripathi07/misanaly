<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductWaitlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class WaitlistController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $query = ProductWaitlist::with('product:id,name,slug')
            ->latest();

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        $entries = $query->paginate(25)->withQueryString();

        $stats = [
            'total'     => ProductWaitlist::count(),
            'pending'   => ProductWaitlist::where('status', 'pending')->count(),
            'approved'  => ProductWaitlist::where('status', 'approved')->count(),
            'contacted' => ProductWaitlist::where('status', 'contacted')->count(),
        ];

        return Inertia::render('Admin/Waitlist/Index', [
            'entries' => $entries,
            'stats'   => $stats,
            'filters' => ['status' => $request->get('status', '')],
        ]);
    }

    public function updateStatus(Request $request, ProductWaitlist $waitlist): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:pending,approved,contacted'],
        ]);

        $waitlist->update(['status' => $request->status]);

        return back()->with('success', 'Status updated.');
    }

    public function export(): Response
    {
        $entries = ProductWaitlist::with('product:id,name')->latest()->get();

        $csv = "Name,Email,Phone,Company,Product,Status,Remark,Registered\n";
        foreach ($entries as $e) {
            $csv .= implode(',', [
                '"' . str_replace('"', '""', $e->name) . '"',
                '"' . $e->email . '"',
                '"' . $e->phone . '"',
                '"' . str_replace('"', '""', $e->company ?? '') . '"',
                '"' . ($e->product->name ?? 'Bank2Books') . '"',
                $e->status,
                '"' . str_replace('"', '""', $e->remark ?? '') . '"',
                '"' . $e->created_at->format('Y-m-d H:i') . '"',
            ]) . "\n";
        }

        return response($csv, 200, [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="bank2books-waitlist-' . now()->format('Y-m-d') . '.csv"',
        ]);
    }
}
