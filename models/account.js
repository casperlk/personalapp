'use strict';
const mongoose = require( 'mongoose' );

var accountSchema = mongoose.Schema( {
  userName: String,
  firstName: String,
  lastName: String
} );

module.exports = mongoose.model( 'account', accountSchema );
