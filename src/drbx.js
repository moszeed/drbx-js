(function() {

    "use strict";

    var Drbx = module.exports;

        //store original dropbox instance
        Drbx.Dropbox = require('./libs/dropbox.js');

        //storage for client/instance data
        Drbx.Client = null;

        /**
         * initialize client
         * @return {[type]} [description]
         */
        Drbx.init = function(params) {

            params = params || {};

            //client data
            params.client = params.client || {};
            if (typeof params.client.sandbox === 'undefined') {
                params.client.sandbox = true;
            }

            //configure dropbox client
            Drbx.Client = new Drbx.Dropbox.Client(params.client);

            //auth data
            if (params.auth) {
                Drbx.Client.authDriver(params.auth);
            }

            return Promise.resolve();
        };

        /**
         * login to a user account
         * @return {[type]} [description]
         */
        Drbx.login = function() {

            return new Promise(
                function doAuthenticate(resolve, reject) {

                    Drbx.Client.authenticate(function(error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                }
            );
        };


        /**
         * get the info of the logged in account
         * @return {[type]} [description]
         */
        Drbx.accountInfo = function() {

            return new Promise(
                function callAccountInfo(resolve, reject) {

                    Drbx.Client.getAccountInfo(function(err, userData) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(userData);
                        }
                    });
                }
            );
        };

        /**
         * [metadata description]
         * @return {[type]} [description]
         */
        Drbx.metadata = function(path) {

            return new Promise(
                function callStat(resolve, reject) {

                    if (!path) {
                        return reject('no path given');
                    }

                    Drbx.Client.stat(path, function(err, userData) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(userData);
                        }
                    });
                }
            );
        };

        /**
         * [readdir description]
         * @param  {[type]} path [description]
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        Drbx.readdir = function(path, opts) {

            return new Promise(
                function readDir(resolve, reject) {

                    if (!path) {
                        return reject('no path given');
                    }

                    Drbx.Client.readdir(path, opts, function(err, userData) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(userData);
                        }
                    });
                }
            );
        };

        /**
         * [delta description]
         * @param  {[type]} cursor [description]
         * @return {[type]}        [description]
         */
        Drbx.delta = function(cursor) {

            return new Promise(
                function callStat(resolve, reject) {

                    Drbx.Client.delta(cursor, function(err, userData) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(userData);
                        }
                    });
                }
            );
        };


        /**
         * [search description]
         * @return {[type]} [description]
         */
        Drbx.search = function(path, namePattern, opts) {

            return new Promise(
                function searchForFiles(resolve, reject) {

                    if (!path) {
                        return reject('no path given');
                    }

                    if (!namePattern) {
                        return reject('no namePattern given');
                    }

                    Drbx.Client.search(path, namePattern, opts, function(err, searchData) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(searchData);
                        }
                    });
                }
            );
        };

        /**
         * [writeFile description]
         * @param  {[type]} path [description]
         * @param  {[type]} data [description]
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        Drbx.writeFile = function(path, data, opts) {

            return new Promise(
                function writeAFile(resolve, reject) {

                    if (!path) {
                        return reject('no path given');
                    }

                    if (!data) {
                        return reject('no data given');
                    }

                    Drbx.Client.writeFile(path, data, opts, function(err, xhr) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(xhr);
                        }
                    });
                }
            );
        };

        /**
         * [remove description]
         * @param  {[type]} path [description]
         * @return {[type]}      [description]
         */
        Drbx.remove = function(path) {

            return new Promise(
                function removeFileOrFolder(resolve, reject) {

                    if (!path) {
                        return reject('no path given');
                    }

                    Drbx.Client.remove(path, function(err, xhr) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(xhr);
                        }
                    });
                }
            );
        };

        /**
         * [copy description]
         * @param  {[type]} fromPath [description]
         * @param  {[type]} toPath   [description]
         * @return {[type]}          [description]
         */
        Drbx.copy = function(fromPath, toPath) {

            return new Promise(
                function copyPath(resolve, reject) {

                    if (!fromPath) {
                        return reject('no fromPath given');
                    }

                    if (!toPath) {
                        return reject('no toPath given');
                    }

                    Drbx.Client.copy(fromPath, toPath, function(err, xhr) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(xhr);
                        }
                    });
                }
            );
        };

        // function aliases
        Drbx.fileopsDelete = Drbx.remove;
        Drbx.fileopsCopy   = Drbx.copy;

})();
