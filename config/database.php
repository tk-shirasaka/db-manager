<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => 0,

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => file_exists(storage_path('database.json'))
      ? json_decode(file_get_contents(storage_path('database.json')), true) : [],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => 'predis',

        'default' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => env('REDIS_DB', 0),
        ],

        'cache' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => env('REDIS_CACHE_DB', 1),
        ],

    ],

    'types' => [
        'sqlite' => [
            'name' => 'sqlite',
            'fields' => [
                ['name' => 'database', 'type' => 'text', 'label' => 'データファイルパス'],
                ['name' => 'prefix', 'type' => 'hidden', 'value' => ''],
            ],
        ],
        'mysql' => [
            'name' => 'mysql',
            'quote' => ['`', '`'],
            'fields' => [
                ['name' => 'host', 'type' => 'text', 'label' => '接続先'],
                ['name' => 'port', 'type' => 'text', 'label' => 'ポート番号', 'value' => 3306],
                ['name' => 'database', 'type' => 'text', 'label' => 'DB名'],
                ['name' => 'username', 'type' => 'text', 'label' => 'ユーザー名'],
                ['name' => 'password', 'type' => 'text', 'label' => 'パスワード'],
                ['name' => 'unix_socket', 'type' => 'hidden', 'value' => ''],
                ['name' => 'charset', 'type' => 'text', 'label' => '文字コード', 'value' => 'utf8mb4'],
                ['name' => 'collation', 'type' => 'hidden', 'value' => 'utf8mb4_unicode_ci'],
                ['name' => 'prefix', 'type' => 'hidden', 'value' => ''],
                ['name' => 'strict', 'type' => 'hidden', 'value' => 1],
                ['name' => 'engine', 'type' => 'hidden', 'value' => ''],
            ],
        ],
        'pgsql' => [
            'name' => 'pgsql',
            'quote' => ['"', '"'],
            'fields' => [
                ['name' => 'host', 'type' => 'text', 'label' => '接続先'],
                ['name' => 'port', 'type' => 'text', 'label' => 'ポート番号', 'value' => 5432],
                ['name' => 'database', 'type' => 'text', 'label' => 'DB名'],
                ['name' => 'username', 'type' => 'text', 'label' => 'ユーザー名'],
                ['name' => 'password', 'type' => 'text', 'label' => 'パスワード'],
                ['name' => 'charset', 'type' => 'text', 'label' => '文字コード', 'value' => 'utf8'],
                ['name' => 'prefix', 'type' => 'hidden', 'value' => ''],
                ['name' => 'schema', 'type' => 'hidden', 'value' => 'public'],
                ['name' => 'sslmode', 'type' => 'hidden', 'value' => 'prefer'],
            ],
        ],
        'sqlsrv' => [
            'name' => 'sqlsrv',
            'quote' => ['[', ']'],
            'fields' => [
                ['name' => 'host', 'type' => 'text', 'label' => '接続先'],
                ['name' => 'port', 'type' => 'text', 'label' => 'ポート番号', 'value' => 1433],
                ['name' => 'database', 'type' => 'text', 'label' => 'DB名'],
                ['name' => 'username', 'type' => 'text', 'label' => 'ユーザー名'],
                ['name' => 'password', 'type' => 'text', 'label' => 'パスワード'],
                ['name' => 'charset', 'type' => 'text', 'label' => '文字コード', 'value' => 'utf8'],
                ['name' => 'prefix', 'type' => 'hidden', 'value' => ''],
            ],
        ],
    ],
];
