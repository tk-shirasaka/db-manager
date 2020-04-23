<?php

namespace App\Http\Controllers;

class PageController extends Controller
{
    protected function query($db, $table)
    {
        return $db->table($table)->where(function($query) {
            foreach (app('request')->input('where') as $where) {
                $query->where($where);
            }
        });
    }

    public function index($connection, $table)
    {
        return $this->connect($connection, function($db) use ($table) {
            return $this->query($db, $table)->paginate(100);
        });
    }

    public function update($connection, $table)
    {
        return $this->connect($connection, function($db) use ($table) {
            return $this->query($db, $table)->update(app('request')->input('data'));
        });
    }
}
