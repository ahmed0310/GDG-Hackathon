<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'product',
        'quantity',
        'price',
        'additional_Notes',
    ];
}
