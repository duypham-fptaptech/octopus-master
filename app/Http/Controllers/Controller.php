<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function index(){
        return view('index');
    }
    public function list(){
        return view('list');
    }
    public function form(){
        return view('form');
    }
    public function calendar(){
        return view('calendar');
    }
    public function uiElementsModals(){
        return view('ui-elements-modals');
    }
}
