'use strict'

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
const Route = use('Route')

// API
Route.group(() => {
  // Auth
  Route.post('auth/register', 'SecurityController.register').validator('StoreUser')
  Route.post('auth/login', 'SecurityController.login')
  Route.get('auth/user', 'SecurityController.user').middleware(['auth'])

  // Transfers
  Route.get('transfers', 'TransferController.index').middleware(['auth'])
  Route.get('transfers/active', 'TransferController.index_active').middleware(['auth'])
  Route.post('transfer', 'TransferController.create')
    .middleware(['auth'])
    .validator('StoreTransfer')
  Route.put('transfer/:id', 'TransferController.update')
    .middleware(['auth'])
    .validator('UpdateTransfer')
  Route.delete('transfer/:id', 'TransferController.delete')
    .middleware(['auth'])
    .validator('DeleteTransfer')
}).prefix('api')
