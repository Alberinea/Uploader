<?php

use App\Http\Controllers\UploadController;
use App\Http\Controllers\DeleteFileController;
use App\Http\Controllers\GetAllFilesController;
use App\Http\Controllers\GetOneFileController;
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

Route::put('/api/files', [GetOneFileController::class, 'resize']);

Route::delete('/api/files', [DeleteFileController::class, 'delete']);

Route::get('/api/files/{name}', [GetOneFileController::class, 'getOne']);

Route::post('/api/upload', [UploadController::class, 'upload']);