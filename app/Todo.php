<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'text',
        'due_date',
        'priority',
        'is_completed',
    ];

    protected $casts = [
        'id' => 'integer',
        'priority' => 'integer',
        'is_completed' => 'boolean',
    ];

    protected $dates = [
        'due_date',
        'created_at',
        'updated_at',
    ];

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
