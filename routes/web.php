<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\PermissionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('posts', PostController::class)->middleware('auth');
Route::resource('lists',ListController::class);
// Route::resource('tasks',TaskController::class);
// Route::resource('permissions', PermissionController::class);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
