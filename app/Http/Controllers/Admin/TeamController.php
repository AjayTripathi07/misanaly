<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Team/Index', [
            'members' => TeamMember::orderBy('sort_order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Team/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'role'         => ['required', 'string', 'max:255'],
            'bio'          => ['nullable', 'string'],
            'photo'        => ['nullable', 'url', 'max:500'],
            'linkedin_url' => ['nullable', 'url', 'max:500'],
            'sort_order'   => ['integer', 'min:0'],
        ]);

        TeamMember::create($data);

        return redirect()->route('admin.team.index')->with('success', 'Team member added.');
    }

    public function edit(TeamMember $team)
    {
        return Inertia::render('Admin/Team/Edit', ['member' => $team]);
    }

    public function update(Request $request, TeamMember $team)
    {
        $data = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'role'         => ['required', 'string', 'max:255'],
            'bio'          => ['nullable', 'string'],
            'photo'        => ['nullable', 'url', 'max:500'],
            'linkedin_url' => ['nullable', 'url', 'max:500'],
            'sort_order'   => ['integer', 'min:0'],
        ]);

        $team->update($data);

        return redirect()->route('admin.team.index')->with('success', 'Team member updated.');
    }

    public function destroy(TeamMember $team)
    {
        $team->delete();

        return back()->with('success', 'Team member deleted.');
    }

    public function reorder(Request $request)
    {
        foreach ($request->order as $item) {
            TeamMember::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['ok' => true]);
    }
}
