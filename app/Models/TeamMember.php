<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'role', 'bio', 'photo', 'linkedin_url', 'sort_order',
    ];

    protected $casts = ['sort_order' => 'integer'];
}
