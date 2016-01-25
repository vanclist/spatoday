/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Version = __webpack_require__(14);

	module.exports = {

	    el: '#update',

	    data: function () {
	        return _.extend({
	            view: 'index',
	            status: 'success',
	            finished: false,
	            update: false,
	            output: '',
	            progress: 0,
	            errors: []
	        }, window.$data);
	    },

	    created: function () {
	        this.getVersions();
	    },

	    computed: {

	        hasUpdate: function () {
	            return this.update && Version.compare(this.update.version, this.version, '>');
	        }

	    },

	    methods: {

	        getVersions: function () {

	            this.$http.get(this.api + '/api/update').then(
	                    function (res) {
	                        var data = res.data;
	                        var channel = data[this.channel == 'nightly' ? 'nightly' : 'latest'];

	                        if (channel) {
	                            this.$set('update', channel);
	                        } else {
	                            this.error(this.$trans('Cannot obtain versions. Please try again later.'));
	                        }
	                    }, function () {
	                        this.error(this.$trans('Cannot connect to the server. Please try again later.'));
	                    });

	        },

	        install: function () {
	            this.$set('view', 'installation');
	            this.doDownload(this.update);
	        },

	        doDownload: function (update) {
	            this.$set('progress', 33);
	            this.$http.post('admin/system/update/download', {url: update.url, shasum: update.shasum}).then(this.doInstall, this.error);
	        },

	        doInstall: function () {
	            var vm = this;

	            this.$set('progress', 66);
	            this.$http.get('admin/system/update/update', null, {
	                xhr: {
	                    onprogress: function () {
	                        vm.setOutput(this.responseText);
	                    }
	                }
	            }).then(this.doMigration, this.error);
	        },

	        doMigration: function () {
	            this.$set('progress', 100);
	            if (this.status === 'success') {
	                this.$http.get('admin/system/migration/migrate').then(function (res) {
	                    var data = res.data;
	                    this.output += "\n\n" + data.message;
	                    this.finished = true;
	                }, this.error);
	            } else {
	                this.error();
	            }
	        },

	        setOutput: function (output) {
	            var lines = output.split("\n");
	            var match = lines[lines.length - 1].match(/^status=(success|error)$/);

	            if (match) {
	                this.status = match[1];
	                delete lines[lines.length - 1];
	                this.output = lines.join("\n");
	            } else {
	                this.output = output;
	            }

	        },

	        error: function (error) {
	            this.errors.push(error || this.$trans('Whoops, something went wrong.'));

	            this.status = 'error';
	            this.finished = true;
	        }

	    }

	};

	Vue.ready(module.exports);


/***/ },

/***/ 14:
/***/ function(module, exports) {

	// https://raw.githubusercontent.com/kvz/phpjs/master/functions/info/version_compare.js
	exports.compare = function (v1, v2, operator) {
	  //       discuss at: http://phpjs.org/functions/version_compare/
	  //      original by: Philippe Jausions (http://pear.php.net/user/jausions)
	  //      original by: Aidan Lister (http://aidanlister.com/)
	  // reimplemented by: Kankrelune (http://www.webfaktory.info/)
	  //      improved by: Brett Zamir (http://brett-zamir.me)
	  //      improved by: Scott Baker
	  //      improved by: Theriault
	  //        example 1: version_compare('8.2.5rc', '8.2.5a');
	  //        returns 1: 1
	  //        example 2: version_compare('8.2.50', '8.2.52', '<');
	  //        returns 2: true
	  //        example 3: version_compare('5.3.0-dev', '5.3.0');
	  //        returns 3: -1
	  //        example 4: version_compare('4.1.0.52','4.01.0.51');
	  //        returns 4: 1

	  this.php_js = this.php_js || {};
	  this.php_js.ENV = this.php_js.ENV || {};
	  // END REDUNDANT
	  // Important: compare must be initialized at 0.
	  var i,
	    x,
	    compare = 0,
	    // vm maps textual PHP versions to negatives so they're less than 0.
	    // PHP currently defines these as CASE-SENSITIVE. It is important to
	    // leave these as negatives so that they can come before numerical versions
	    // and as if no letters were there to begin with.
	    // (1alpha is < 1 and < 1.1 but > 1dev1)
	    // If a non-numerical value can't be mapped to this table, it receives
	    // -7 as its value.
	    vm = {
	      'dev': -6,
	      'alpha': -5,
	      'a': -5,
	      'beta': -4,
	      'b': -4,
	      'RC': -3,
	      'rc': -3,
	      '#': -2,
	      'p': 1,
	      'pl': 1
	    },
	    // This function will be called to prepare each version argument.
	    // It replaces every _, -, and + with a dot.
	    // It surrounds any nonsequence of numbers/dots with dots.
	    // It replaces sequences of dots with a single dot.
	    //    version_compare('4..0', '4.0') == 0
	    // Important: A string of 0 length needs to be converted into a value
	    // even less than an unexisting value in vm (-7), hence [-8].
	    // It's also important to not strip spaces because of this.
	    //   version_compare('', ' ') == 1
	    prepVersion = function (v) {
	      v = ('' + v)
	        .replace(/[_\-+]/g, '.');
	      v = v.replace(/([^.\d]+)/g, '.$1.')
	        .replace(/\.{2,}/g, '.');
	      return (!v.length ? [-8] : v.split('.'));
	    },
	  // This converts a version component to a number.
	  // Empty component becomes 0.
	  // Non-numerical component becomes a negative number.
	  // Numerical component becomes itself as an integer.
	  numVersion = function (v) {
	    return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
	  };
	  v1 = prepVersion(v1);
	  v2 = prepVersion(v2);
	  x = Math.max(v1.length, v2.length);
	  for (i = 0; i < x; i++) {
	    if (v1[i] == v2[i]) {
	      continue;
	    }
	    v1[i] = numVersion(v1[i]);
	    v2[i] = numVersion(v2[i]);
	    if (v1[i] < v2[i]) {
	      compare = -1;
	      break;
	    } else if (v1[i] > v2[i]) {
	      compare = 1;
	      break;
	    }
	  }
	  if (!operator) {
	    return compare;
	  }

	  // Important: operator is CASE-SENSITIVE.
	  // "No operator" seems to be treated as "<."
	  // Any other values seem to make the function return null.
	  switch (operator) {
	  case '>':
	  case 'gt':
	    return (compare > 0);
	  case '>=':
	  case 'ge':
	    return (compare >= 0);
	  case '<=':
	  case 'le':
	    return (compare <= 0);
	  case '==':
	  case '=':
	  case 'eq':
	    return (compare === 0);
	  case '<>':
	  case '!=':
	  case 'ne':
	    return (compare !== 0);
	  case '':
	  case '<':
	  case 'lt':
	    return (compare < 0);
	  default:
	    return null;
	  }
	};


/***/ }

/******/ });