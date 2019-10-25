'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// API
Route.group(() => {
  // Auth
  Route.post('auth/register', 'UserController.register');
  Route.post('auth/login', 'UserController.login');

  // Transfer
  Route.get('transfers', 'TransferController.index').middleware('auth');
  Route.get('transfers/active', 'TransferController.index_active').middleware(
    'auth'
  );
  Route.post('transfer', 'TransferController.create').middleware('auth');
  Route.put('transfer/:uuid', 'TransferController.update').middleware('auth');
  Route.delete('transfer/:uuid', 'TransferController.delete').middleware(
    'auth'
  );
}).prefix('api');
