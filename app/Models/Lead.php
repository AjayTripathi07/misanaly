<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'company', 'lead_type',
        'service_id', 'product_id', 'budget_range', 'timeline',
        'message', 'source', 'status', 'notes',
    ];

    protected $casts = [
        'lead_type' => 'string',
        'status' => 'string',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
