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
        $input = collect(app('request')->input())->sortBy(function($connection) { return $connection['description']; });
        file_put_contents(storage_path('database.json'), $input->values()->toJson());
    }
}
