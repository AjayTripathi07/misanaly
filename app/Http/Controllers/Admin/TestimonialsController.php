<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use App\Models\Testimonial;
use App\Traits\Exportable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TestimonialsController extends Controller
{
    use Exportable;

    public function index()
    {
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => Testimonial::with(['service:id,name', 'product:id,name'])
                ->latest()
                ->paginate(20),
        ]);
    }

    public function export(): StreamedResponse
    {
        $testimonials = Testimonial::with(['service:id,name', 'product:id,name'])->latest()->get();

        $rows = $testimonials->map(fn (Testimonial $t) => [
            $t->name,
            $t->company,
            $t->role,
            $t->rating,
            $t->service->name ?? $t->product->name ?? '',
            $t->created_at->format('Y-m-d H:i'),
        ]);

        return $this->exportCsv('testimonials', [
            'Name', 'Company', 'Role', 'Rating', 'Related Service/Product', 'Created At',
        ], $rows);
    }

    public function create()
    {
        return Inertia::render('Admin/Testimonials/Create', [
            'services' => Service::orderBy('name')->get(['id', 'name']),
            'products' => Product::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'company'    => ['required', 'string', 'max:255'],
            'role'       => ['required', 'string', 'max:255'],
            'quote'      => ['required', 'string'],
            'photo'      => ['nullable', 'url', 'max:500'],
            'rating'     => ['required', 'integer', 'min:1', 'max:5'],
            'service_id' => ['nullable', 'integer', 'exists:services,id'],
            'product_id' => ['nullable', 'integer', 'exists:products,id'],
        ]);

        Testimonial::create($data);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial added.');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial,
            'services'    => Service::orderBy('name')->get(['id', 'name']),
            'products'    => Product::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'company'    => ['required', 'string', 'max:255'],
            'role'       => ['required', 'string', 'max:255'],
            'quote'      => ['required', 'string'],
            'photo'      => ['nullable', 'url', 'max:500'],
            'rating'     => ['required', 'integer', 'min:1', 'max:5'],
            'service_id' => ['nullable', 'integer', 'exists:services,id'],
            'product_id' => ['nullable', 'integer', 'exists:products,id'],
        ]);

        $testimonial->update($data);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted.');
    }
}
