<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductPricingTier extends Model
{
    protected $fillable = ['product_id', 'name', 'price', 'features_json', 'is_popular'];

    protected $casts = [
        'price' => 'decimal:2',
        'features_json' => 'array',
        'is_popular' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
