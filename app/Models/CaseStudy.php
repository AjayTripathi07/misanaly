<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseStudy extends Model
{
    protected $fillable = [
        'slug', 'title', 'client_name', 'industry',
        'summary', 'challenge', 'solution', 'results',
        'cover_image', 'related_service_id',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'related_service_id');
    }
}
