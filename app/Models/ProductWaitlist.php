<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductWaitlist extends Model
{
    protected $table = 'product_waitlist';

    protected $fillable = [
        'name', 'email', 'phone', 'company', 'remark',
        'product_id', 'status', 'source',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
