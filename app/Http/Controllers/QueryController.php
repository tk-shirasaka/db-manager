<?php

namespace App\Http\Controllers;

use Exception;
use Cache;
use NilPortugues\Sql\QueryFormatter\Formatter;

class QueryController extends Controller
{
    public function index($connection)
    {
        return $this->connect($connection, function($db) use ($connection) {
            $history = Cache::get("history.{$connection}", []);
            $history[] = $query = trim((new Formatter)->format(app('request')->input('query')));
            $history = array_unique($history);
            $result = [
                'error' => '',
                'count' => 0,
                'header' => [],
                'data' => [],
                'query' => $query,
                'history' => $history,
            ];
            try {
                $type = strtolower(trim(explode(' ', $query)[0]));
                if (!in_array($type, config("database.connections.{$connection}.permissions"))) {
                    throw new Exception('許可されていない操作です');
                }
                $type = $type === 'alter' ? 'statement' : $type;

                $data = $db->{$type}($query);
                if ($type === 'select') {
                  $result['count'] = count($data);
                  $result['data'] = $data;
                  if (count($data) > 0) $result['header'] = array_keys((array) $data[0]);
                } else {
                  $result['count'] = (int) $data;
                }
                Cache::put("history.{$connection}", $history, 3600);
            } catch (Exception $e) {
                $result['error'] = $e->getMessage();
            }
            return $result;
        });
    }
}
