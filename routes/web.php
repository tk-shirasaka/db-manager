<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/* Apis */
$router->group(['prefix' => 'api'], function() use ($router) {
    $router->get('/connections', 'ConnectionController@index');
    $router->post('/connections', 'ConnectionController@store');
    $router->get('/tables/{connection}', 'TableController@index');
    $router->get('/tables/{connection}/{table}', 'TableController@show');
    $router->post('/query/{connection}', 'QueryController@index');
});

/* Default Route */
$router->get('/{any:.*}', function () use ($router) {
    return file_get_contents('../public/index.html');
});
