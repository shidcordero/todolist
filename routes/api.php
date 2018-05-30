<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('users/{userId}/todos', 'User\TodoController', [
    'except' => ['create', 'edit'],
    'parameters' => ['todo' => 'todoId'],
]);

Route::resource('/users', 'UserController', [
    'except' => ['create', 'edit'],
    'parameters' => ['user' => 'userId'],
]);

Route::post('/auth/login', 'AuthController@login');
Route::get('/auth/user', 'AuthController@user');
Route::post('/auth/logout', 'AuthController@logout');
Route::post('/auth/refresh', 'AuthController@refresh');
