<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = ['question', 'answer', 'category', 'related_id', 'sort_order'];

    protected $casts = [
        'category' => 'string',
        'sort_order' => 'integer',
    ];
}
