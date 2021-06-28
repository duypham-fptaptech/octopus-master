<?php

use App\Http\Controllers\OctopusMasterController;
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
Route::get('/index', [OctopusMasterController::class, 'index']);
Route::get('/list', [OctopusMasterController::class, 'list']);
Route::get('/form', [OctopusMasterController::class, 'form']);
Route::get('/calendar', [OctopusMasterController::class, 'calendar']);
Route::get('/uiElementsModals', [OctopusMasterController::class, 'uiElementsModals']);
