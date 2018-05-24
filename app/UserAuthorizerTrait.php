<?php

namespace App;

use Auth;
use Illuminate\Auth\Access\AuthorizationException;

trait UserAuthorizerTrait
{
    private function getAuthorizedUser(int $userId)
    {
        if (Auth::id() === $userId) {
            return Auth::user();
        } else {
            throw new AuthorizationException("Resource doesn't belongs to user!");
        }
    }
}
