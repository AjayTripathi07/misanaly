<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $teamMembers = TeamMember::orderBy('sort_order')->get();

        return Inertia::render('About', compact('teamMembers'));
    }
}
