<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductWaitlist;
use App\Traits\Exportable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;

class WaitlistController extends Controller
{
    use Exportable;

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

    public function export(Request $request): StreamedResponse
    {
        $query = ProductWaitlist::latest();

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        $entries = $query->get();

        $rows = $entries->map(fn (ProductWaitlist $e) => [
            $e->name,
            $e->email,
            $e->phone,
            $e->company,
            $e->remark,
            $e->status,
            $e->created_at->format('Y-m-d H:i'),
        ]);

        return $this->exportXlsx('waitlist', [
            'Name', 'Email', 'Phone', 'Company', 'Remark', 'Status', 'Date Registered',
        ], $rows);
    }
}
