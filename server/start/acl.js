'use strict'

const Gate = use('Gate')

Gate.policy('App/Models/Transfer', 'App/Policies/TransferPolicy')
