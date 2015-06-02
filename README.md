#drbx-js
a promise wrapper for the (un)official dropbox.js

####project targets
- promises for most used functions
- compatibility with browserify
- less coffescript

####modifiedDropboxBuild
drbx-js uses a modified dropbox.js file, with fixed browserify/nodejs handling  
until this get merged: https://github.com/dropbox/dropbox-js/pull/183

##available methods

### authentication
**Drbx.init**
**Drbx.login**

### dir, file

following function have matching parameters with the Dropbox Core HTTP API
and the (un)official dropbox js api, more info can be found here:
https://github.com/dropbox/dropbox-js/blob/stable/src/client.coffee
https://www.dropbox.com/developers/core/docs

**Drbx.accountInfo**  
**Drbx.metadata**  
**Drbx.readdir**  
**Drbx.delta**  
**Drbx.search**  
**Drbx.writeFile**  
**Drbx.remove**  
**Drbx.copy**  
**Drbx.fileopsDelete**  
**Drbx.fileopsCopy**  
