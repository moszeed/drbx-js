(function() {

    "use strict";

    require('phantomjs-polyfill');
    require('es6-promise').polyfill();

    var test = require('tape');

    //set a generated dropbox token, from the developer console, here !
    var token = null;
    if (token === null) {
        throw new Error('please set a generated dropbox token');
    }


    //check if require works
    test('require', function(t) {

        try {
            require('../src/drbx.js');
        }
        catch(err) {
            t.end(err);
            return;
        }

        t.end();
    });

    //start with function tests

    var Drbx   = require('../src/drbx.js');
    var cursor = null;

    test('initialize', function (t) {

        Drbx.init({
            client: { token: token }
        })
        .then(function initSuccess() {
            t.end();
        });
    });

    test('accountInfo', function (t) {

        Drbx.accountInfo()
            .then(function(userData) {
                t.ok(Object.keys(userData).length !== 0, 'no empty data');
                t.end();
            })
            .catch(t.end);
    });

    test('metadata', function (t) {

        Drbx.metadata('/')
            .then(function(folderMetaData) {
                t.ok(folderMetaData.length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });

    test('readdir', function (t) {

        Drbx.readdir('/')
            .then(function(folderMetaData) {
                t.ok(folderMetaData.length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });


    test('delta', function (t) {

        Drbx.delta()
            .then(function(currentCursor) {
                t.ok(Object.keys(currentCursor).length !== 0, 'not empty');
                cursor = currentCursor;
                t.end();
            })
            .catch(t.end);
    });

    test('writeFile', function (t) {

        Drbx.writeFile('/test-drbxjs.txt', 'I am Test Content')
            .then(function(xhr) {
                t.ok(Object.keys(xhr).length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });

    test('search', function (t) {

        Drbx.search('/', 'test-drbxjs')
            .then(function(xhrObject) {
                t.ok(xhrObject.length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });

    test('copy', function (t) {

        Drbx.copy('/test-drbxjs.txt', '/test-drbxjs-copy.txt')
            .then(function(xhrObject) {
                t.ok(xhrObject.length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });

    test('remove', function (t) {

        Drbx.remove('/test-drbxjs.txt')
            .then(function(xhrObject) {
                t.ok(xhrObject.length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });

    test('fileopsDelete', function (t) {

        Drbx.fileopsDelete('/test-drbxjs-copy.txt')
            .then(function(xhrObject) {
                t.ok(xhrObject.length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });

    test('delta-with-changed', function (t) {

        Drbx.delta(cursor)
            .then(function(currentCursor) {
                t.ok(Object.keys(currentCursor).length !== 0, 'not empty');
                t.end();
            })
            .catch(t.end);
    });

})();
