<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupervisionController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserManagerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return to_route('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Proses HTTP req ke Controller
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Pengelompokan URL berdasarkan pengguna User
    Route::prefix('teacher')->name('teacher.')->group(function () {
        Route::get('/', [TeacherController::class, 'index'])->name('index');
        Route::get('/create', [TeacherController::class, 'create'])->name('create');
        Route::post('/', [TeacherController::class, 'store'])->name('store');
        Route::delete('/{teacher}', [TeacherController::class, 'destroy'])->name('destroy');
        Route::get('/edit/{teacher}', [TeacherController::class, 'edit'])->name('edit');
        Route::put('/{teacher}', [TeacherController::class, 'update'])->name('update');
    });

    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/', [UserManagerController::class, 'index'])->name('index');
        Route::get('/create', [UserManagerController::class, 'create'])->name('create');
        Route::post('/', [UserManagerController::class, 'store'])->name('store');
        Route::get('/edit/{user}', [UserManagerController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserManagerController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserManagerController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('supervision')->name('supervision.')->group(function () {
        Route::get('/', [SupervisionController::class, 'index'])->name('index');
        Route::get('/self-check', [SupervisionController::class, 'selfCheck'])->name('selfCheck');
        Route::get('/{teacher}', [SupervisionController::class, 'start'])->name('start');
        Route::post('/{teacher}', [SupervisionController::class, 'save'])->name('save');
        Route::get('/check/{teacher}', [SupervisionController::class, 'check'])->name('check');
    });
});

require __DIR__.'/auth.php';
