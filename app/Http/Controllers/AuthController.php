<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use GuzzleHttp\Client;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->addClientCredentials($request);
        $request->request->add(['grant_type' => 'password']);
        return \App::call('\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken', [$request]);
    }

    public function logout(Request $request)
    {
        $this->addClientCredentials($request);
        return \App::call('\Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@destroy', [$request]);
    }

    public function refresh(Request $request)
    {
        $this->addClientCredentials($request);
        $request->request->add(['grant_type' => 'refresh_token']);
        return \App::call('\Laravel\Passport\Http\Controllers\TransientTokenController@refresh', [$request]);
    }

    private function addClientCredentials(Request &$request)
    {
        $request->request->add(['client_id' => env('OAUTH_CLIENT_ID')]);
        $request->request->add(['client_secret' => env('OAUTH_CLIENT_SECRET')]);
    }
}
