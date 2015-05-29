# Find the global object providing access to web APIs such
# as XMLHTTPRequest, typed arrays, base64 encoding etc.
#
# There are several common global objects depending on the context:
#
# window - Browsers and content pages in Add-ons
# self - Web workers
# global - Node.js
#
# Hybrid environments (eg. Browserify) may provide more than one
# of these, in which case we prefer window => global => self.
#
if typeof window isnt 'undefined'
  # Browser or add-on content
  DbxEnvGlobal = window
  if window.Dropbox
    # Someone's stepping on our toes. It's most likely the Chooser library.
    do ->
      Dropbox[name] = value for own name, value of window.Dropbox
  window.Dropbox = Dropbox
else if typeof global isnt 'undefined'
  # Node.js
  DbxEnvGlobal = global
else if typeof self isnt 'undefined'
  # Web-worker context
  DbxEnvGlobal = self

# Check that we have at least a global environment. If the global environment
# doesn't provide certain APIs (eg. XMLHttpRequest) we'll also need
# a require() implementation to import a polyfill.
if typeof DbxEnvGlobal is 'undefined'
  throw new Error 'dropbox.js loaded in an unsupported JavaScript environment.'

# Export Dropbox functionality when used in a CommonJS-like
# module environment
if typeof module isnt 'undefined' and 'exports' of module
  # Used in a CommonJS module (eg. Node.js or Browserify)
  module.exports = Dropbox

# Setup module imports when running in a CommonJS-like environment
if typeof self isnt 'undefined' and typeof self.importScripts isnt 'undefined'
  self.Dropbox = Dropbox
  # NOTE: browsers that implement Web Workers also implement the ES5 bind.
  DbxEnvRequire = self.importScripts.bind self

if typeof module isnt 'undefined' and typeof require isnt 'undefined'
  DbxEnvRequire = require.bind module

# Helpers for interacting with the JavaScript environment we run in.
#
# @private
class Dropbox.Env
  # The global environment object.
  @global: DbxEnvGlobal

  # Loads a module into the JavaScript environment.
  #
  # This is null in the browser. It is aliased to require in node.js and to
  # importScripts in Web Workers.
  @require: DbxEnvRequire
