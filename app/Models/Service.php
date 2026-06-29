<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    protected $fillable = [
        'slug', 'name', 'tagline', 'description', 'icon',
        'status', 'starting_price', 'sort_order',
    ];

    protected $casts = [
        'status' => 'string',
        'sort_order' => 'integer',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function features(): HasMany
    {
        return $this->hasMany(ServiceFeature::class)->orderBy('sort_order');
    }

    public function processSteps(): HasMany
    {
        return $this->hasMany(ServiceProcessStep::class)->orderBy('step_number');
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(Testimonial::class);
    }

    public function caseStudies(): HasMany
    {
        return $this->hasMany(CaseStudy::class, 'related_service_id');
    }
}
