<?php

use App\Http\Controllers\ProgressionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/login", function (Request $request) {
    $credentials = $request->validate([
        "email" => "required|email",
        "password" => "required"
    ]);

    if (!\Illuminate\Support\Facades\Auth::validate($credentials))
        return response("Wrong credentials", 401);
    $user = \App\Models\User::where("email", "=", $credentials["email"])->first();
    return [
        "token" => $user->createToken("token")->plainTextToken
    ];
});

Route::middleware("auth:sanctum")->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource("progressions", ProgressionController::class);
});
