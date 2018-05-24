<?php

namespace App\Http\Controllers;

use Hash;
use App\User;
use App\UserAuthorizerTrait;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    use UserAuthorizerTrait;

    public function __construct() {
        $this->middleware('auth:api')->except('store');
    }

    public function index(Request $request)
    {
        return User::all()->toJson();
    }

    public function store(UserRequest $request)
    {
        $todo = new User($request->validated());
        $todo->password = Hash::make($request->password);
        $todo->save();
        return response()->json([
            'id' => $todo->id,
            'message' => 'Successful creation',
        ], JsonResponse::HTTP_CREATED);
    }

    public function show(Request $request, int $userId)
    {
        return $this->getAuthorizedUser($userId)->toJson();
    }

    public function update(UserRequest $request, int $userId)
    {
        $input = $request->validated();
        if (array_key_exists('password', $input)) {
            $input['password'] = Hash::make($input['password']);
        }
        $this->getAuthorizedUser($userId)->update($input);
        return response()->json(['message' => 'Successful update'], JsonResponse::HTTP_OK);
    }

    public function destroy(Request $request, int $userId)
    {
        $this->getAuthorizedUser($userId)->delete();
        return response()->json(['message' => 'Successful deletion'], JsonResponse::HTTP_OK);
    }
}
