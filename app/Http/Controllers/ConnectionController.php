<?php

namespace App\Http\Controllers;

class ConnectionController extends Controller
{
    public function index()
    {
        return config('database');
    }

    public function store()
    {
        file_put_contents(storage_path('database.json'), json_encode(app('request')->input()));
    }
}
