<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    public function index(): Response
    {
        $services = Service::withCount('features')->orderBy('sort_order')->get();

        return Inertia::render('Admin/Services/Index', compact('services'));
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'slug'          => ['required', 'string', 'max:255', 'unique:services,slug'],
            'tagline'       => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'icon'          => ['required', 'string', 'max:100'],
            'starting_price'=> ['nullable', 'string', 'max:100'],
            'status'        => ['required', 'in:active,inactive'],
            'sort_order'    => ['integer', 'min:0'],
            'features'      => ['array'],
            'features.*.title'       => ['required', 'string', 'max:255'],
            'features.*.description' => ['required', 'string'],
            'features.*.icon'        => ['nullable', 'string', 'max:100'],
            'process_steps' => ['array'],
            'process_steps.*.step_number' => ['required', 'integer'],
            'process_steps.*.title'       => ['required', 'string', 'max:255'],
            'process_steps.*.description' => ['required', 'string'],
        ]);

        DB::transaction(function () use ($validated) {
            $service = Service::create([
                'name'           => $validated['name'],
                'slug'           => $validated['slug'],
                'tagline'        => $validated['tagline'],
                'description'    => $validated['description'],
                'icon'           => $validated['icon'],
                'starting_price' => $validated['starting_price'] ?? null,
                'status'         => $validated['status'],
                'sort_order'     => $validated['sort_order'] ?? 0,
            ]);

            foreach ($validated['features'] ?? [] as $i => $feature) {
                $service->features()->create(array_merge($feature, ['sort_order' => $i + 1]));
            }

            foreach ($validated['process_steps'] ?? [] as $step) {
                $service->processSteps()->create($step);
            }
        });

        return redirect()->route('admin.services.index')->with('success', 'Service created successfully.');
    }

    public function edit(Service $service): Response
    {
        $service->load(['features' => fn ($q) => $q->orderBy('sort_order'), 'processSteps' => fn ($q) => $q->orderBy('step_number')]);

        return Inertia::render('Admin/Services/Edit', compact('service'));
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'slug'          => ['required', 'string', 'max:255', "unique:services,slug,{$service->id}"],
            'tagline'       => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'icon'          => ['required', 'string', 'max:100'],
            'starting_price'=> ['nullable', 'string', 'max:100'],
            'status'        => ['required', 'in:active,inactive'],
            'sort_order'    => ['integer', 'min:0'],
            'features'      => ['array'],
            'features.*.title'       => ['required', 'string', 'max:255'],
            'features.*.description' => ['required', 'string'],
            'features.*.icon'        => ['nullable', 'string', 'max:100'],
            'process_steps' => ['array'],
            'process_steps.*.step_number' => ['required', 'integer'],
            'process_steps.*.title'       => ['required', 'string', 'max:255'],
            'process_steps.*.description' => ['required', 'string'],
        ]);

        DB::transaction(function () use ($validated, $service) {
            $service->update([
                'name'           => $validated['name'],
                'slug'           => $validated['slug'],
                'tagline'        => $validated['tagline'],
                'description'    => $validated['description'],
                'icon'           => $validated['icon'],
                'starting_price' => $validated['starting_price'] ?? null,
                'status'         => $validated['status'],
                'sort_order'     => $validated['sort_order'] ?? 0,
            ]);

            $service->features()->delete();
            foreach ($validated['features'] ?? [] as $i => $feature) {
                $service->features()->create(array_merge($feature, ['sort_order' => $i + 1]));
            }

            $service->processSteps()->delete();
            foreach ($validated['process_steps'] ?? [] as $step) {
                $service->processSteps()->create($step);
            }
        });

        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Service deleted.');
    }

    public function toggleStatus(Service $service): RedirectResponse
    {
        $service->update(['status' => $service->status === 'active' ? 'inactive' : 'active']);

        return back()->with('success', 'Service status toggled.');
    }
}
