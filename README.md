# drbx-js

[![Join the chat at https://gitter.im/moszeed/drbx-js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/moszeed/drbx-js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

a promise wrapper for the (un)official dropbox.js

#### project targets
- promises for most used functions
- compatibility with browserify
- less coffescript

## modifiedDropboxBuild
drbx-js uses a modified dropbox.js file, with fixed browserify/nodejs handling  
until this get merged: https://github.com/dropbox/dropbox-js/pull/183

## how to use
install from npm

	npm i drbx-js

## available methods
#### authentication
these methods are used for initializing and connection to dropbox
##### *Drbx.init*
##### *Drbx.login*

#### save urls to dropbox
##### *Drbx.saveUrl*  
**params** url, path_in_dropbox)  
**response** Object containing: status, jobid  

##### *Drbx.saveUrlJob*  
**params** jobid  
**response** Object containing: status, error (on error status)  


#### dir, file methods
following function have matching parameters with the Dropbox Core HTTP API  
and the (un)official dropbox js api, more info can be found here:  
https://github.com/dropbox/dropbox-js/blob/stable/src/client.coffee  
https://www.dropbox.com/developers/core/docs  

##### *Drbx.accountInfo*
##### *Drbx.metadata*
##### *Drbx.readdir*
##### *Drbx.delta*
##### *Drbx.search*
##### *Drbx.writeFile*
##### *Drbx.readFile*
##### *Drbx.remove*
##### *Drbx.copy*
##### *Drbx.fileopsDelete*
##### *Drbx.fileopsCopy*

## usage examples
##### init, with popup driver and login

    var Drbx = require('../src/drbx.js');
        Drbx.init({
            client  : { key : [Dropbox API Key] },
            auth    : new Drbx.Dropbox.AuthDriver.Popup({
                receiverUrl     : [receiverUrl],
                rememberUser    : true
            })
        });

        Drbx.login()
            .then(function isLoggedIn() {
                console.log('user is logged in');
            })
            .catch(function(err) {
                console.log(err);
            });


##### get accountInfo
    Drbx.accountInfo()
        .then(function getUserData(userData) {
        	console.log(userData);
        })
        .catch(function(err) {
        	console.log(err);
        });


##### save by a given url
    Drbx.saveUrl('http://url-to-someting', '/path/in/dropbox')
        .then(function saveUrlResponse(metadata) {
        	console.log(metadata);
        })
        .catch(function(err) {
        	console.log(err);
        });


##### read root dir
    Drbx.readdir('/')
        .then(function getRootDirData(folderMetaData) {
        	console.log(folderMetaData);
        })
        .catch(function(err) {
        	console.log(err);
        });


