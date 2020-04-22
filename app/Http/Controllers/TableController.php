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
            $tableDetail = $db->getDoctrineSchemaManager()->listTableDetails($table);
            $primary = $tableDetail->getPrimaryKey();
            $primary = $primary ? $primary->getColumns() : [];
            return collect($tableDetail->getColumns())->map(function($column, $key) use ($primary) {
                $type = $column->getType()->getName();
                $primary = in_array($key, $primary);
                return compact('type', 'primary') + $column->toArray();
            })->values();
        });
    }
}
