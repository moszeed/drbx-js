(function() {

    "use strict";

    require('phantomjs-polyfill');
    require('es6-promise').polyfill();

    var test = require('tape');
    var Drbx   = null;
    var cursor = null;
    var savedMetadata = null;


    //set a generated dropbox token, from the developer console, here !
    var token = null;

    test('is token available', function(t) {
        if (token === null) {
            t.end('please set a generated dropbox token');
        } else {
            t.end();
        }
    });

    //check if require works
    test('require', function(t) {

        try {
            Drbx = require('../src/drbx.js');
        }
        catch(err) {
            t.end(err);
            return;
        }

        t.end();
    });

    //start with function tests
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

    test('readFile', function (t) {

        Drbx.readFile('/test-drbxjs.txt')
            .then(function(fileData) {
                t.ok(fileData === 'I am Test Content', 'equal content');
                t.end();
            })
            .catch(t.end);
    });

    test('saveUrl', function(t) {

        Drbx.saveUrl('https://pbs.twimg.com/media/B3TpeCkCIAAAUqL.jpg', '/bild.jpg')
            .then(function(metadata) {
                savedMetadata = metadata;
                t.ok(Object.keys(metadata).length === 2, 'has metadata');
                t.end();
            })
            .catch(t.end);
    });

    test('saveUrlJob', function(t) {

        Drbx.saveUrlJob(savedMetadata.job)
            .then(function(metadata) {
                t.ok(metadata.status, 'has metadata');
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
