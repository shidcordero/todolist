<?php

namespace App\Http\Controllers\User;

use App\Todo;
use App\UserAuthorizerTrait;
use App\Http\Requests\TodoRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    use UserAuthorizerTrait;

    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index(Request $request, int $userId)
    {
        return $this->getAuthorizedUser($userId)->todos->toJson();
    }

    public function store(TodoRequest $request, int $userId)
    {
        $user = $this->getAuthorizedUser($userId);
        $todo = $user->todos()->save(new Todo($request->validated()));
        return response()->json([
            'todoId' => $todo->id,
            'message' => 'Successful creation',
        ], JsonResponse::HTTP_CREATED);
    }

    public function show(Request $request, int $userId, int $todoId)
    {
        return $this->getAuthorizedUser($userId)->todos()->findOrFail($todoId)->toJson();
    }

    public function update(TodoRequest $request, int $userId, int $todoId)
    {
        $this->getAuthorizedUser($userId)->todos()->findOrFail($todoId)->update($request->validated());
        return response()->json(['message' => 'Successful update'], JsonResponse::HTTP_OK);
    }

    public function destroy(Request $request, int $userId, int $todoId)
    {
        $this->getAuthorizedUser($userId)->todos()->findOrFail($todoId)->delete();
        return response()->json(['message' => 'Successful deletion'], JsonResponse::HTTP_OK);
    }
}
