<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::apiResource('notes', NoteController::class);

Route::apiResource('users', UserController::class);

Route::apiResource('categories', CategoryController::class);