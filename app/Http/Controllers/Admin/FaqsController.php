<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Product;
use App\Models\Service;
use App\Traits\Exportable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FaqsController extends Controller
{
    use Exportable;

    public function export(): StreamedResponse
    {
        $faqs = Faq::orderBy('sort_order')->get();

        $rows = $faqs->map(fn (Faq $f) => [
            $f->question,
            $f->category,
            $f->sort_order,
        ]);

        return $this->exportCsv('faqs', [
            'Question', 'Category', 'Sort Order',
        ], $rows);
    }

    public function index(Request $request)
    {
        $query = Faq::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return Inertia::render('Admin/Faqs/Index', [
            'faqs'    => $query->orderBy('sort_order')->get(),
            'filters' => ['category' => $request->category],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Faqs/Create', [
            'services' => Service::orderBy('name')->get(['id', 'name']),
            'products' => Product::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question'   => ['required', 'string'],
            'answer'     => ['required', 'string'],
            'category'   => ['required', 'string', 'in:general,service,product'],
            'related_id' => ['nullable', 'integer'],
            'sort_order' => ['integer', 'min:0'],
        ]);

        Faq::create($data);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ added.');
    }

    public function edit(Faq $faq)
    {
        return Inertia::render('Admin/Faqs/Edit', [
            'faq'      => $faq,
            'services' => Service::orderBy('name')->get(['id', 'name']),
            'products' => Product::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Faq $faq)
    {
        $data = $request->validate([
            'question'   => ['required', 'string'],
            'answer'     => ['required', 'string'],
            'category'   => ['required', 'string', 'in:general,service,product'],
            'related_id' => ['nullable', 'integer'],
            'sort_order' => ['integer', 'min:0'],
        ]);

        $faq->update($data);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ updated.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return back()->with('success', 'FAQ deleted.');
    }
}
