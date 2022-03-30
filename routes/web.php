<?php

use App\Http\Controllers\UploadController;
use App\Http\Controllers\DeleteFileController;
use App\Http\Controllers\GetAllFilesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/files', [GetAllFilesController::class, 'getAll']);

Route::post('/api/upload', [UploadController::class, 'upload']);

Route::delete('/api/upload', [DeleteFileController::class, 'delete']);
