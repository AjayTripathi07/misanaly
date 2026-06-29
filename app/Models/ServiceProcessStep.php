<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceProcessStep extends Model
{
    protected $fillable = ['service_id', 'step_number', 'title', 'description'];

    protected $casts = ['step_number' => 'integer'];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
