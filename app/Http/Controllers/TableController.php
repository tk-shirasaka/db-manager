<?php

namespace App\Http\Controllers;

class TableController extends Controller
{
    public function index($connection)
    {
        return $this->connect($connection, function($db) {
            return $db->getDoctrineSchemaManager()->listTableNames();
        });
    }

    public function show($connection, $table)
    {
        return $this->connect($connection, function($db) use ($table) {
            return collect($db->getDoctrineSchemaManager()->listTableDetails($table)->getColumns())->map(function($column) {
                return ['type' => $column->getType()->getName()] + $column->toArray();
            })->values();
        });
    }
}
