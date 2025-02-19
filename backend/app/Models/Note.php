<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id',
        'category_id',
        'created_at',
        'updated_at'
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
