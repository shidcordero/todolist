<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function todos()
    {
        return $this->hasMany('App\Todo');
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($user) {
             $user->todos()->delete();
        });
    }
}
