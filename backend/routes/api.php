<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::apiResource('notes', NoteController::class);
Route::get('/notes/user/{id}', [NoteController::class, 'byUserId']);
Route::post('/notes/{id}', [NoteController::class, 'updateNote']);

Route::apiResource('users', UserController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('categories', CategoryController::class);
Route::get('/categories/user/{id}', [CategoryController::class, 'byUserId']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});