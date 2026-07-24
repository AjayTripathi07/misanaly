<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Traits\Exportable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TeamController extends Controller
{
    use Exportable;

    public function index()
    {
        return Inertia::render('Admin/Team/Index', [
            'members' => TeamMember::orderBy('sort_order')->get(),
        ]);
    }

    public function export(): StreamedResponse
    {
        $members = TeamMember::orderBy('sort_order')->get();

        $rows = $members->map(fn (TeamMember $m) => [
            $m->name,
            $m->role,
            $m->linkedin_url,
            $m->sort_order,
        ]);

        return $this->exportCsv('team-members', [
            'Name', 'Role', 'LinkedIn URL', 'Sort Order',
        ], $rows);
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
