<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class PageController extends Controller
{
    protected function query($db, $table)
    {
        return $db->table($table)->where(function($query) {
            foreach (app('request')->input('where') as $wheres) {
                foreach ($wheres as $where) {
                    $query->whereRaw("{$where['column']} {$where['condition']}");
                }
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
            $data = array_map(function($data) {
                return DB::raw($data);
            }, app('request')->input('data'));
            return $this->query($db, $table)->update($data);
        });
    }

    public function delete($connection, $table)
    {
        return $this->connect($connection, function($db) use ($table) {
            return $this->query($db, $table)->delete();
        });
    }
}
