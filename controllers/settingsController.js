'use strict';
const account = require( '../models/account' );
console.log("loading the settings Controller")


// this displays all of the accounts
exports.getAllAccounts = ( req, res ) => {
  console.log('in getAllAccounts (settings controller)')
  account.find( {} )
    .exec()
    .then( ( accounts ) => {
      res.render( 'accounts', {
        accounts: accounts
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'account promise complete' );
    } );
};




exports.saveAccount = ( req, res ) => {
  console.log("in saveAccount!")
  console.dir(req.body)
  let newAccount = new account( {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    userName: req.body.username
  } )

  console.log("account = "+newAccount)

  newAccount.save()
    .then( () => {
      res.redirect( '/settings' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteAccount = (req, res) => {
  console.log("in deleteAccount")
  let accountName = req.body.deleteName
  if (typeof(accountName)=='string') {
      account.deleteOne({name:accountName})
           .exec()
           .then(()=>{res.redirect('/accounts')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(accountName)=='object'){
      account.deleteMany({name:{$in:accountName}})
           .exec()
           .then(()=>{res.redirect('/accounts')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(accountName)=='undefined'){
      console.log("This is if they didn't select a account")
      res.redirect('/accounts')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown accountName: ${accountName}`)
  }

};
