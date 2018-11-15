<?php

namespace App\Http\Controllers;

use DB;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    protected function connect($connection, $callback)
    {
        return $callback(DB::connection($connection));
    }
}
