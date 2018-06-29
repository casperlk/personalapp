'use strict';
const mongoose = require( 'mongoose' );

var accountSchema = mongoose.Schema( {
  firstName: String,
  lastName: String,
  userName: String
} );

module.exports = mongoose.model( 'account', accountSchema );
