<?php

namespace App\Http\Controllers;

class PageController extends Controller
{
    public function index($connection, $table)
    {
        return $this->connect($connection, function($db) use ($table) {
            return $db->table($table)->where(function($query) {
                foreach (app('request')->input() as $where) {
                    $query->where($where);
                }
            })->paginate(100);
        });
    }
}
