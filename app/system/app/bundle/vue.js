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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	function install (Vue) {

	    var config = window.$pagekit;

	    Vue.config.debug = false;

	    Vue.prototype.$session = window.sessionStorage || {};
	    Vue.prototype.$cache = __webpack_require__(1);
	    Vue.cache = __webpack_require__(1);

	    /**
	     * Libraries
	     */

	    __webpack_require__(2);
	    __webpack_require__(10);
	    __webpack_require__(18);
	    __webpack_require__(42)(Vue);
	    __webpack_require__(43)(Vue);
	    __webpack_require__(44)(Vue);
	    __webpack_require__(45)(Vue);
	    __webpack_require__(46)(Vue);

	    /**
	     * Components
	     */

	    Vue.component('v-loader', __webpack_require__(47));
	    Vue.component('v-modal', __webpack_require__(50));
	    Vue.component('v-pagination', __webpack_require__(53));
	    Vue.component('input-filter', __webpack_require__(54));

	    __webpack_require__(57);
	    __webpack_require__(60);
	    __webpack_require__(63);
	    __webpack_require__(66);

	    /**
	     * Directives
	     */

	    Vue.directive('check-all', __webpack_require__(69));
	    Vue.directive('confirm', __webpack_require__(70));
	    Vue.directive('gravatar', __webpack_require__(71));
	    Vue.directive('order', __webpack_require__(73));
	    Vue.directive('lazy-background', __webpack_require__(74));
	    Vue.directive('stack-margin', __webpack_require__(75));
	    Vue.directive('var', __webpack_require__(76));

	    /**
	     * Resource
	     */

	    Vue.url.options.root = config.url.replace(/\/index.php$/i, '');
	    Vue.http.options.root = config.url;
	    Vue.http.options.emulateHTTP = true;

	    Vue.url.route = function (url, params) {

	        var options = url;

	        if (!_.isPlainObject(options)) {
	            options = {url: url, params: params};
	        }

	        Vue.util.extend(options, {
	            root: Vue.http.options.root
	        });

	        return this(options);
	    };

	    Vue.url.current = Vue.url.parse(window.location.href);

	    Vue.ready = function (fn) {

	        if (Vue.util.isObject(fn)) {

	            var options = fn;

	            fn = function () {
	                new Vue(options);
	            };

	        }

	        var handle = function () {
	            document.removeEventListener('DOMContentLoaded', handle);
	            window.removeEventListener('load', handle);
	            fn();
	        };

	        if (document.readyState === 'complete') {
	            fn();
	        } else {
	            document.addEventListener('DOMContentLoaded', handle);
	            window.addEventListener('load', handle);
	        }

	    };
	}

	if (window.Vue) {
	    Vue.use(install);
	}

	window.history.pushState = window.history.pushState || function() {};
	window.history.replaceState = window.history.replaceState || function() {};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * lscache library
	 * Copyright (c) 2011, Pamela Fox
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *       http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/* jshint undef:true, browser:true, node:true */
	/* global define */

	(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== "undefined" && module.exports) {
	        // CommonJS/Node module
	        module.exports = factory();
	    } else {
	        // Browser globals
	        root.lscache = factory();
	    }
	}(this, function () {

	  // Prefix for all lscache keys
	  var CACHE_PREFIX = 'lscache-';

	  // Suffix for the key name on the expiration items in localStorage
	  var CACHE_SUFFIX = '-cacheexpiration';

	  // expiration date radix (set to Base-36 for most space savings)
	  var EXPIRY_RADIX = 10;

	  // time resolution in minutes
	  var EXPIRY_UNITS = 60 * 1000;

	  // ECMAScript max Date (epoch + 1e8 days)
	  var MAX_DATE = Math.floor(8.64e15/EXPIRY_UNITS);

	  var cachedStorage;
	  var cachedJSON;
	  var cacheBucket = '';
	  var warnings = false;

	  // Determines if localStorage is supported in the browser;
	  // result is cached for better performance instead of being run each time.
	  // Feature detection is based on how Modernizr does it;
	  // it's not straightforward due to FF4 issues.
	  // It's not run at parse-time as it takes 200ms in Android.
	  function supportsStorage() {
	    var key = '__lscachetest__';
	    var value = key;

	    if (cachedStorage !== undefined) {
	      return cachedStorage;
	    }

	    try {
	      setItem(key, value);
	      removeItem(key);
	      cachedStorage = true;
	    } catch (e) {
	        if (isOutOfSpace(e)) {    // If we hit the limit, then it means we have support, 
	            cachedStorage = true; // just maxed it out and even the set test failed.
	        } else {
	            cachedStorage = false;
	        }
	    }
	    return cachedStorage;
	  }

	  // Check to set if the error is us dealing with being out of space
	  function isOutOfSpace(e) {
	    if (e && e.name === 'QUOTA_EXCEEDED_ERR' || 
	            e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || 
	            e.name === 'QuotaExceededError') {
	        return true;
	    }
	    return false;
	  }

	  // Determines if native JSON (de-)serialization is supported in the browser.
	  function supportsJSON() {
	    /*jshint eqnull:true */
	    if (cachedJSON === undefined) {
	      cachedJSON = (window.JSON != null);
	    }
	    return cachedJSON;
	  }

	  /**
	   * Returns the full string for the localStorage expiration item.
	   * @param {String} key
	   * @return {string}
	   */
	  function expirationKey(key) {
	    return key + CACHE_SUFFIX;
	  }

	  /**
	   * Returns the number of minutes since the epoch.
	   * @return {number}
	   */
	  function currentTime() {
	    return Math.floor((new Date().getTime())/EXPIRY_UNITS);
	  }

	  /**
	   * Wrapper functions for localStorage methods
	   */

	  function getItem(key) {
	    return localStorage.getItem(CACHE_PREFIX + cacheBucket + key);
	  }

	  function setItem(key, value) {
	    // Fix for iPad issue - sometimes throws QUOTA_EXCEEDED_ERR on setItem.
	    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
	    localStorage.setItem(CACHE_PREFIX + cacheBucket + key, value);
	  }

	  function removeItem(key) {
	    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
	  }

	  function eachKey(fn) {
	    var prefixRegExp = new RegExp('^' + CACHE_PREFIX + cacheBucket + '(.*)');
	    // Loop in reverse as removing items will change indices of tail
	    for (var i = localStorage.length-1; i >= 0 ; --i) {
	      var key = localStorage.key(i);
	      key = key && key.match(prefixRegExp);
	      key = key && key[1];
	      if (key && key.indexOf(CACHE_SUFFIX) < 0) {
	        fn(key, expirationKey(key));
	      }
	    }
	  }

	  function flushItem(key) {
	    var exprKey = expirationKey(key);

	    removeItem(key);
	    removeItem(exprKey);
	  }

	  function flushExpiredItem(key) {
	    var exprKey = expirationKey(key);
	    var expr = getItem(exprKey);

	    if (expr) {
	      var expirationTime = parseInt(expr, EXPIRY_RADIX);

	      // Check if we should actually kick item out of storage
	      if (currentTime() >= expirationTime) {
	        removeItem(key);
	        removeItem(exprKey);
	        return true;
	      }
	    }
	  }

	  function warn(message, err) {
	    if (!warnings) return;
	    if (!('console' in window) || typeof window.console.warn !== 'function') return;
	    window.console.warn("lscache - " + message);
	    if (err) window.console.warn("lscache - The error was: " + err.message);
	  }

	  var lscache = {
	    /**
	     * Stores the value in localStorage. Expires after specified number of minutes.
	     * @param {string} key
	     * @param {Object|string} value
	     * @param {number} time
	     */
	    set: function(key, value, time) {
	      if (!supportsStorage()) return;

	      // If we don't get a string value, try to stringify
	      // In future, localStorage may properly support storing non-strings
	      // and this can be removed.
	      if (typeof value !== 'string') {
	        if (!supportsJSON()) return;
	        try {
	          value = JSON.stringify(value);
	        } catch (e) {
	          // Sometimes we can't stringify due to circular refs
	          // in complex objects, so we won't bother storing then.
	          return;
	        }
	      }

	      try {
	        setItem(key, value);
	      } catch (e) {
	        if (isOutOfSpace(e)) {
	          // If we exceeded the quota, then we will sort
	          // by the expire time, and then remove the N oldest
	          var storedKeys = [];
	          var storedKey;
	          eachKey(function(key, exprKey) {
	            var expiration = getItem(exprKey);
	            if (expiration) {
	              expiration = parseInt(expiration, EXPIRY_RADIX);
	            } else {
	              // TODO: Store date added for non-expiring items for smarter removal
	              expiration = MAX_DATE;
	            }
	            storedKeys.push({
	              key: key,
	              size: (getItem(key) || '').length,
	              expiration: expiration
	            });
	          });
	          // Sorts the keys with oldest expiration time last
	          storedKeys.sort(function(a, b) { return (b.expiration-a.expiration); });

	          var targetSize = (value||'').length;
	          while (storedKeys.length && targetSize > 0) {
	            storedKey = storedKeys.pop();
	            warn("Cache is full, removing item with key '" + key + "'");
	            flushItem(storedKey.key);
	            targetSize -= storedKey.size;
	          }
	          try {
	            setItem(key, value);
	          } catch (e) {
	            // value may be larger than total quota
	            warn("Could not add item with key '" + key + "', perhaps it's too big?", e);
	            return;
	          }
	        } else {
	          // If it was some other error, just give up.
	          warn("Could not add item with key '" + key + "'", e);
	          return;
	        }
	      }

	      // If a time is specified, store expiration info in localStorage
	      if (time) {
	        setItem(expirationKey(key), (currentTime() + time).toString(EXPIRY_RADIX));
	      } else {
	        // In case they previously set a time, remove that info from localStorage.
	        removeItem(expirationKey(key));
	      }
	    },

	    /**
	     * Retrieves specified value from localStorage, if not expired.
	     * @param {string} key
	     * @return {string|Object}
	     */
	    get: function(key) {
	      if (!supportsStorage()) return null;

	      // Return the de-serialized item if not expired
	      if (flushExpiredItem(key)) { return null; }

	      // Tries to de-serialize stored value if its an object, and returns the normal value otherwise.
	      var value = getItem(key);
	      if (!value || !supportsJSON()) {
	        return value;
	      }

	      try {
	        // We can't tell if its JSON or a string, so we try to parse
	        return JSON.parse(value);
	      } catch (e) {
	        // If we can't parse, it's probably because it isn't an object
	        return value;
	      }
	    },

	    /**
	     * Removes a value from localStorage.
	     * Equivalent to 'delete' in memcache, but that's a keyword in JS.
	     * @param {string} key
	     */
	    remove: function(key) {
	      if (!supportsStorage()) return;

	      flushItem(key);
	    },

	    /**
	     * Returns whether local storage is supported.
	     * Currently exposed for testing purposes.
	     * @return {boolean}
	     */
	    supported: function() {
	      return supportsStorage();
	    },

	    /**
	     * Flushes all lscache items and expiry markers without affecting rest of localStorage
	     */
	    flush: function() {
	      if (!supportsStorage()) return;

	      eachKey(function(key) {
	        flushItem(key);
	      });
	    },

	    /**
	     * Flushes expired lscache items and expiry markers without affecting rest of localStorage
	     */
	    flushExpired: function() {
	      if (!supportsStorage()) return;

	      eachKey(function(key) {
	        flushExpiredItem(key);
	      });
	    },

	    /**
	     * Appends CACHE_PREFIX so lscache will partition data in to different buckets.
	     * @param {string} bucket
	     */
	    setBucket: function(bucket) {
	      cacheBucket = bucket;
	    },

	    /**
	     * Resets the string being appended to CACHE_PREFIX so lscache will use the default storage behavior.
	     */
	    resetBucket: function() {
	      cacheBucket = '';
	    },

	    /**
	     * Sets whether to display warnings when an item is removed from the cache or not.
	     */
	    enableWarnings: function(enabled) {
	      warnings = enabled;
	    }
	  };

	  // Return the module
	  return lscache;
	}));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */

	module.exports = function (Vue) {

	    var _ = __webpack_require__(3)(Vue);
	    var field = __webpack_require__(4)(_, Vue);
	    var validator = __webpack_require__(7)(_);

	    Vue.field = field;
	    Vue.mixin(field.mixin);

	    Vue.validator = validator;
	    Vue.filter('valid', validator.filter);
	    Vue.directive('validator', validator.directive);
	    Vue.directive('validate', __webpack_require__(9)(_));

	};

	if (window.Vue) {
	    Vue.use(module.exports);
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */

	module.exports = function (Vue) {

	    var _ = Vue.util.extend({}, Vue.util), config = Vue.config;

	    _.warn = function (msg) {
	        if (window.console && (!config.silent || config.debug)) {
	            console.warn('[VueForm warn]: ' + msg);
	        }
	    };

	    _.each = function (obj, iterator, context) {

	        var i, key;

	        if (typeof obj.length == 'number') {
	            for (i = 0; i < obj.length; i++) {
	                iterator.call(context || obj[i], obj[i], i);
	            }
	        } else if (_.isObject(obj)) {
	            for (key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    iterator.call(context || obj[key], obj[key], key);
	                }
	            }
	        }

	        return obj;
	    };

	    _.pull = function (arr, value) {
	        arr.splice(arr.indexOf(value), 1);
	    };

	    _.attr = function (el, attr) {
	        return el ? el.getAttribute(attr) : null;
	    };

	    _.trigger = function (el, event) {

	        var e = document.createEvent('HTMLEvents');

	        e.initEvent(event, true, false);
	        el.dispatchEvent(e);
	    };

	    _.isString = function (value) {
	        return typeof value === 'string';
	    };

	    return _;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (_, Vue) {

	    function Fields(options) {

	        return {

	            name: 'fields',

	            props: {

	                config: {
	                    default: ''
	                },

	                model: {
	                    default: ''
	                },

	                template: {
	                    type: String,
	                    default: 'default'
	                }

	            },

	            created: function () {

	                if (!this.fields || !this.values) {
	                    _.warn('Invalid config or model provided');
	                    this.$options.template = '';
	                    return;
	                }

	                if (!this.$options.template) {
	                    this.$options.template = Fields.templates[this.template];
	                }

	            },

	            computed: {

	                fields: function () {

	                    var vm = this;

	                    if (_.isObject(this.config)) {
	                        return this.filterFields(this.config);
	                    }

	                    do {

	                        if (_.isObject(vm.$options[this.config])) {
	                            return this.filterFields(vm.$options[this.config]);
	                        }

	                        vm = vm.$parent;

	                    } while (vm);

	                },

	                values: function () {

	                    var vm = this;

	                    if (_.isObject(this.model)) {
	                        return this.model;
	                    }

	                    do {

	                        if (_.isObject(vm.$get(this.model))) {
	                            return vm.$get(this.model);
	                        }

	                        vm = vm.$parent;

	                    } while (vm);

	                }

	            },

	            methods: {

	                filterFields: function (fields) {

	                    var arr = _.isArray(fields), flds = [];

	                    _.each(fields, function (field, name) {

	                        if (!_.isString(field.name) && !arr) {
	                            field.name = name;
	                        }

	                        if (_.isString(field.name)) {
	                            flds.push(field);
	                        } else {
	                            _.warn('Field name missing ' + JSON.stringify(field));
	                        }

	                    });

	                    return flds;
	                }

	            },

	            components: {
	                field: __webpack_require__(5)(_, _.extend(options.fields || {}, Fields.types))
	            }

	        };

	    }

	    Fields.mixin = {

	        created: function () {
	            this.$options.components.fields = Vue.extend(Fields(this.$options));
	        }

	    };

	    Fields.types = {
	        text:       '<input type="text" v-bind="attrs" v-model="value">',
	        textarea:   '<textarea v-bind="attrs" v-model="value"></textarea>',
	        radio:      '<template v-for="option in options | options">' +
	                        '<input type="radio" v-bind="attrs" :value="option.value" v-model="value"> <label>{{ option.text }}</label>' +
	                    '</template>',
	        checkbox:   '<input type="checkbox" v-bind="attrs" v-model="value">',
	        select:     '<select v-bind="attrs" v-model="value">' +
	                        '<template v-for="option in options | options">' +
	                            '<optgroup :label="option.label" v-if="option.label">' +
	                                '<option v-for="opt in option.options" :value="opt.value">{{ opt.text }}</option>' +
	                            '</optgroup>' +
	                            '<option :value="option.value" v-else>{{ option.text }}</option>' +
	                        '</template>' +
	                    '</select>'
	    };

	    Fields.templates = {
	        default: __webpack_require__(6)
	    };

	    return Fields;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function (_, types) {

	    var Field = {

	        name: 'field',

	        props: ['config', 'values', 'class'],

	        template: '<partial :name="type"></partial>',

	        data: function () {
	            return _.extend({
	                key: '',
	                name: '',
	                type: 'text',
	                label: '',
	                attrs: {},
	                options: []
	            }, this.config);
	        },

	        created: function () {
	            this.$set('key', '["' + this.name.replace('.', '"]["') + '"]');
	            this.attrs.class = this.attrs.class || this.class;
	        },

	        computed: {

	            value: {

	                get: function () {
	                    return this.$get('values' + this.key);
	                },

	                set: function (value) {
	                    this.$set('values' + this.key, value);
	                }

	            }

	        },

	        methods: {

	            filterOptions: function (options) {

	                var opts = [];

	                if (!options) {
	                    _.warn('Invalid options provided for ' + this.name);
	                    return opts;
	                }

	                _.each(options, function (value, name) {
	                    if (_.isObject(value)) {
	                        opts.push({label: name, options: this.filterOptions(value)});
	                    } else {
	                        opts.push({text: name, value: value});
	                    }
	                }, this);

	                return opts;
	            }

	        },

	        filters: {

	            options: function (options) {
	                return this.filterOptions(options);
	            }

	        },

	        partials: {},

	        components: {}

	    };

	    _.each(types, function (type, name) {
	        if (_.isString(type)) {
	            Field.partials[name] = type;
	        } else if (_.isObject(type)) {
	            Field.partials[name] = '<component :is="type" :config="config" :value.sync="value"></component>';
	            Field.components[name] = function (resolve) {
	                resolve(type);
	            };
	        }
	    });

	    return Field;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div v-for=\"field in fields\">\n    <label v-if=\"field.type != 'checkbox'\">{{ field.label }}</label>\n    <field :config=\"field\" :values.sync=\"values\"></field>\n</div>\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Validator for input validation.
	 */

	module.exports = function (_) {

	    return _.validator = {

	        dirs: [],

	        types: __webpack_require__(8),

	        add: function (dir) {
	            this.dirs.push(dir);
	        },

	        remove: function (dir) {
	            _.pull(this.dirs, dir);
	        },

	        instance: function (el) {

	            do {

	                if (el._validator) {
	                    return el._validator;
	                }

	                el = el.parentElement;

	            } while (el);

	        },

	        validate: function (el, submit) {

	            var validator = this.instance(el), results = {valid: true};

	            if (!validator) {
	                return;
	            }

	            this.dirs.forEach(function (dir) {

	                var valid = dir.validate(), el = dir.el, name = dir.name;

	                if (this.instance(el) !== validator) {
	                    return;
	                }

	                if (!el._touched && submit) {
	                    el._touched = true;
	                }

	                if (!el._touched && !valid) {
	                    valid = true;
	                    results.valid = false;
	                }

	                if (!results[name]) {
	                    results[name] = {
	                        valid: true,
	                        invalid: false,
	                        dirty: el._dirty,
	                        touched: el._touched
	                    };
	                }

	                results[name][dir.type] = !valid;

	                if (submit && results.valid && !valid) {
	                    el.focus();
	                }

	                if (results[name].valid && !valid) {
	                    results[name].valid = false;
	                    results[name].invalid = true;
	                    results.valid = false;
	                }

	            }, this);

	            results.invalid = !results.valid;

	            validator.results(results);

	            if (submit && results.invalid) {
	                _.trigger(validator.el, 'invalid');
	            }

	            return results.valid;
	        },

	        filter: function (fn) {
	            return function (e) {
	                e.preventDefault();

	                if (_.validator.validate(e.target, true)) {
	                    fn(e);
	                }

	            }.bind(this);
	        },

	        directive: {

	            bind: function () {

	                var self = this, name = this.arg || this.expression;

	                this.name = _.camelize(name);
	                this.el._validator = this;

	                this.vm.$set(this.name);
	                this.vm.$on('hook:compiled', function () {
	                    _.validator.validate(self.el);
	                });
	            },

	            unbind: function () {
	                this.vm.$delete(this.name);
	            },

	            results: function (results) {
	                this.vm.$set(this.name, _.extend({
	                    validate: this.validate.bind(this)
	                }, results));
	            },

	            validate: function () {
	                return _.validator.validate(this.el, true);
	            }

	        }

	    };

	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Validator functions.
	 */

	exports.required = function (value, arg) {

	    if (!(typeof arg == 'boolean')) {
	        arg = true;
	    }

	    if (typeof value == 'boolean') {
	        return !arg || value;
	    }

	    return !arg || !((value === null) || (value.length === 0));
	};

	exports.numeric = function (value) {
	    return /^[-+]?[0-9]+$/.test(value);
	};

	exports.integer = function (value) {
	    return /^(?:[-+]?(?:0|[1-9][0-9]*))$/.test(value);
	};

	exports.float = function (value) {
	    return /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/.test(value);
	};

	exports.alpha = function (value) {
	    return /^([A-Z]+)?$/i.test(value);
	};

	exports.alphanum = function (value) {
	    return /^([0-9A-Z]+)?$/i.test(value);
	};

	exports.email = function (value) {
	    return /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*)?$/i.test(value || 'a@a.aa');
	};

	exports.url = function (value) {
	    return /^((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)?$/.test(value);
	};

	exports.minlength = function (value, arg) {
	    return value && value.length && value.length >= +arg;
	};

	exports.maxlength = function (value, arg) {
	    return value && value.length && value.length <= +arg;
	};

	exports.length = function (value) {
	    return value && value.length == +arg;
	};

	exports.min = function (value, arg) {
	    return value >= +arg;
	};

	exports.max = function (value, arg) {
	    return value <= +arg;
	};

	exports.pattern = function (value, arg) {
	    var match = arg.match(new RegExp('^/(.*?)/([gimy]*)$'));
	    var regex = new RegExp(match[1], match[2]);
	    return regex.test(value);
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Validate directive.
	 */

	module.exports = function (_) {

	    return {

	        priority: 500,

	        bind: function () {

	            var name = _.attr(this.el, 'name');

	            if (!name) {
	                return;
	            }

	            this.name = _.camelize(name);
	            this.type = this.arg;
	            this.value = this.el.value;

	            this.el._dirty = false;
	            this.el._touched = false;

	            _.on(this.el, 'blur', this.listener.bind(this));
	            _.on(this.el, 'input', this.listener.bind(this));

	            _.validator.add(this);
	        },

	        unbind: function () {

	            _.off(this.el, 'blur', this.listener);
	            _.off(this.el, 'input', this.listener);

	            _.validator.remove(this);
	        },

	        update: function (value) {
	            this.args = value;
	        },

	        listener: function (e) {

	            if (e.relatedTarget && (e.relatedTarget.tagName === 'A' || e.relatedTarget.tagName === 'BUTTON')) {
	                return;
	            }

	            if (e.type == 'blur') {
	                this.el._touched = true;
	            }

	            if (this.el.value != this.value) {
	                this.el._dirty = true;
	            }

	            _.validator.validate(this.el);
	        },

	        validate: function () {

	            var validator = this.validator();

	            if (validator) {
	                return validator.call(this.vm, this.el.value, this.args);
	            }
	        },

	        validator: function () {

	            var vm = this.vm, validators;

	            do {

	                validators = vm.$options.validators || {};

	                if (validators[this.type]) {
	                    return validators[this.type];
	                }

	                vm = vm.$parent;

	            } while (vm);

	            return _.validator.types[this.type];
	        }

	    };

	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */

	function install(Vue) {

	    var v = Vue.prototype,
	        _ = __webpack_require__(11)(Vue);

	    __webpack_require__(12)(_);

	    if (!v.$locale) {
	        v.$locale = __webpack_require__(13);
	    }

	    v.$date = __webpack_require__(14)(_);
	    v.$number = __webpack_require__(15)(_);
	    v.$currency = __webpack_require__(16)(_);
	    v.$relativeDate = __webpack_require__(17)(_);

	    Vue.filter('date', v.$date);
	    Vue.filter('number', v.$number);
	    Vue.filter('currency', v.$currency);
	    Vue.filter('relativeDate', v.$relativeDate);
	}

	if (window.Vue) {
	    Vue.use(install);
	}

	module.exports = install;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */

	module.exports = function (Vue) {

	    var a = Array.prototype,
	        o = Object.prototype,
	        _ = Vue.util.extend({}, Vue.util);

	    _.isString = function (value) {
	        return typeof value === 'string';
	    };

	    _.isNumber = function (value) {
	        return typeof value === 'number';
	    };

	    _.isUndefined = function (value) {
	        return typeof value === 'undefined';
	    };

	    _.isDate = function (value) {
	        return o.toString.call(value) === '[object Date]';
	    };

	    _.toInt = function (value) {
	        return parseInt(value, 10);
	    };

	    _.concat = function (arr1, arr2, index) {
	        return arr1.concat(a.slice.call(arr2, index));
	    };

	    _.uppercase = function (str) {
	        return _.isString(str) ? str.toUpperCase() : str;
	    };

	    return _;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Pluralization rules.
	 */

	module.exports = function (_) {

	    function getDecimals(n) {
	      n = n + '';
	      var i = n.indexOf('.');
	      return (i == -1) ? 0 : n.length - i - 1;
	    }

	    function getVF(n, precision) {
	      var v = precision;

	      if (undefined === v) {
	        v = Math.min(getDecimals(n), 3);
	      }

	      var base = Math.pow(10, v);
	      var f = ((n * base) | 0) % base;
	      return {v: v, f: f};
	    }

	    var PLURAL_CACHE = {};
	    var PLURAL_CATEGORY = {ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other'};
	    var PLURAL_LOCALES = [['en'],['af','az','bg','chr','el','es','eu','gsw','haw','hu','ka','kk','ky','ml','mn','nb','ne','no','or','sq','ta','te','tr','uz'],['am','bn','fa','gu','hi','kn','mr','zu'],['ar'],['be'],['br'],['bs','hr','sr'],['cs','sk'],['cy'],['da'],['fil','tl'],['fr','hy'],['ga'],['he','iw'],['id','in','ja','km','ko','lo','my','th','vi','zh'],['is'],['ln','pa'],['lt'],['lv'],['mk'],['ms'],['mt'],['pl'],['pt'],['ro'],['ru','uk'],['si'],['sl']]; // END LOCALES
	    var PLURAL_RULES = [function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  if (i == 0 || n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n == 0) {    return PLURAL_CATEGORY.ZERO;  }  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  if (n == 2) {    return PLURAL_CATEGORY.TWO;  }  if (n % 100 >= 3 && n % 100 <= 10) {    return PLURAL_CATEGORY.FEW;  }  if (n % 100 >= 11 && n % 100 <= 99) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n % 10 == 1 && n % 100 != 11) {    return PLURAL_CATEGORY.ONE;  }  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  if (n % 10 == 0 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 11 && n % 100 <= 14) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n % 10 == 1 && n % 100 != 11 && n % 100 != 71 && n % 100 != 91) {    return PLURAL_CATEGORY.ONE;  }  if (n % 10 == 2 && n % 100 != 12 && n % 100 != 72 && n % 100 != 92) {    return PLURAL_CATEGORY.TWO;  }  if ((n % 10 >= 3 && n % 10 <= 4 || n % 10 == 9) && (n % 100 < 10 || n % 100 > 19) && (n % 100 < 70 || n % 100 > 79) && (n % 100 < 90 || n % 100 > 99)) {    return PLURAL_CATEGORY.FEW;  }  if (n != 0 && n % 1000000 == 0) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11 || vf.f % 10 == 1 && vf.f % 100 != 11) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14) || vf.f % 10 >= 2 && vf.f % 10 <= 4 && (vf.f % 100 < 12 || vf.f % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  if (i >= 2 && i <= 4 && vf.v == 0) {    return PLURAL_CATEGORY.FEW;  }  if (vf.v != 0) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n == 0) {    return PLURAL_CATEGORY.ZERO;  }  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  if (n == 2) {    return PLURAL_CATEGORY.TWO;  }  if (n == 3) {    return PLURAL_CATEGORY.FEW;  }  if (n == 6) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  var wt = getWT(vf.v, vf.f);  if (n == 1 || wt.t != 0 && (i == 0 || i == 1)) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (vf.v == 0 && (i == 1 || i == 2 || i == 3) || vf.v == 0 && i % 10 != 4 && i % 10 != 6 && i % 10 != 9 || vf.v != 0 && vf.f % 10 != 4 && vf.f % 10 != 6 && vf.f % 10 != 9) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  if (i == 0 || i == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  if (n == 2) {    return PLURAL_CATEGORY.TWO;  }  if (n >= 3 && n <= 6) {    return PLURAL_CATEGORY.FEW;  }  if (n >= 7 && n <= 10) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  if (i == 2 && vf.v == 0) {    return PLURAL_CATEGORY.TWO;  }  if (vf.v == 0 && (n < 0 || n > 10) && n % 10 == 0) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  var wt = getWT(vf.v, vf.f);  if (wt.t == 0 && i % 10 == 1 && i % 100 != 11 || wt.t != 0) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n >= 0 && n <= 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var vf = getVF(n, precision);  if (n % 10 == 1 && (n % 100 < 11 || n % 100 > 19)) {    return PLURAL_CATEGORY.ONE;  }  if (n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19)) {    return PLURAL_CATEGORY.FEW;  }  if (vf.f != 0) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var vf = getVF(n, precision);  if (n % 10 == 0 || n % 100 >= 11 && n % 100 <= 19 || vf.v == 2 && vf.f % 100 >= 11 && vf.f % 100 <= 19) {    return PLURAL_CATEGORY.ZERO;  }  if (n % 10 == 1 && n % 100 != 11 || vf.v == 2 && vf.f % 10 == 1 && vf.f % 100 != 11 || vf.v != 2 && vf.f % 10 == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (vf.v == 0 && i % 10 == 1 || vf.f % 10 == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n) {  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  if (n == 0 || n % 100 >= 2 && n % 100 <= 10) {    return PLURAL_CATEGORY.FEW;  }  if (n % 100 >= 11 && n % 100 <= 19) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  if (vf.v == 0 && i != 1 && i % 10 >= 0 && i % 10 <= 1 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 12 && i % 100 <= 14) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  if (n >= 0 && n <= 2 && n != 2) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v != 0 || n == 0 || n != 1 && n % 100 >= 1 && n % 100 <= 19) {    return PLURAL_CATEGORY.FEW;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {    return PLURAL_CATEGORY.FEW;  }  if (vf.v == 0 && i % 10 == 0 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 11 && i % 100 <= 14) {    return PLURAL_CATEGORY.MANY;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if ((n == 0 || n == 1) || i == 0 && vf.f == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},function (n, precision) {  var i = n | 0;  var vf = getVF(n, precision);  if (vf.v == 0 && i % 100 == 1) {    return PLURAL_CATEGORY.ONE;  }  if (vf.v == 0 && i % 100 == 2) {    return PLURAL_CATEGORY.TWO;  }  if (vf.v == 0 && i % 100 >= 3 && i % 100 <= 4 || vf.v != 0) {    return PLURAL_CATEGORY.FEW;  }  return PLURAL_CATEGORY.OTHER;}]; // END RULES

	    PLURAL_LOCALES.map(function (locales, i) {
	        locales.map(function (locale) {
	            PLURAL_CACHE[locale] = PLURAL_RULES[i];
	        });
	    });

	    _.pluralCat = function (id, num, precision) {

	        var match = id.match(/^\w+/i);

	        if (match) {
	            id = match[0];
	        }

	        if (!PLURAL_CACHE[id]) {
	            id = 'en';
	        }

	        return PLURAL_CACHE[id](num, precision);
	    };

	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
		"DATETIME_FORMATS": {
			"AMPMS": [
				"AM",
				"PM"
			],
			"DAY": [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			],
			"ERANAMES": [
				"Before Christ",
				"Anno Domini"
			],
			"ERAS": [
				"BC",
				"AD"
			],
			"FIRSTDAYOFWEEK": 6,
			"MONTH": [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			],
			"SHORTDAY": [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			"SHORTMONTH": [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			"WEEKENDRANGE": [
				5,
				6
			],
			"fullDate": "EEEE, MMMM d, y",
			"longDate": "MMMM d, y",
			"medium": "MMM d, y h:mm:ss a",
			"mediumDate": "MMM d, y",
			"mediumTime": "h:mm:ss a",
			"short": "M/d/yy h:mm a",
			"shortDate": "M/d/yy",
			"shortTime": "h:mm a"
		},
		"NUMBER_FORMATS": {
			"CURRENCY_SYM": "$",
			"DECIMAL_SEP": ".",
			"GROUP_SEP": ",",
			"PATTERNS": [
				{
					"gSize": 3,
					"lgSize": 3,
					"maxFrac": 3,
					"minFrac": 0,
					"minInt": 1,
					"negPre": "-",
					"negSuf": "",
					"posPre": "",
					"posSuf": ""
				},
				{
					"gSize": 3,
					"lgSize": 3,
					"maxFrac": 2,
					"minFrac": 2,
					"minInt": 1,
					"negPre": "-¤",
					"negSuf": "",
					"posPre": "¤",
					"posSuf": ""
				}
			]
		},
		"id": "en",
		"TIMESPAN_FORMATS": {
			"ago": {
				"second": {
					"default": {
						"one": "{0} second ago",
						"other": "{0} seconds ago"
					}
				},
				"minute": {
					"default": {
						"one": "{0} minute ago",
						"other": "{0} minutes ago"
					}
				},
				"hour": {
					"default": {
						"one": "{0} hour ago",
						"other": "{0} hours ago"
					}
				},
				"day": {
					"default": {
						"one": "{0} day ago",
						"other": "{0} days ago"
					}
				},
				"week": {
					"default": {
						"one": "{0} week ago",
						"other": "{0} weeks ago"
					}
				},
				"month": {
					"default": {
						"one": "{0} month ago",
						"other": "{0} months ago"
					}
				},
				"year": {
					"default": {
						"one": "{0} year ago",
						"other": "{0} years ago"
					}
				}
			},
			"until": {
				"second": {
					"default": {
						"one": "In {0} second",
						"other": "In {0} seconds"
					}
				},
				"minute": {
					"default": {
						"one": "In {0} minute",
						"other": "In {0} minutes"
					}
				},
				"hour": {
					"default": {
						"one": "In {0} hour",
						"other": "In {0} hours"
					}
				},
				"day": {
					"default": {
						"one": "In {0} day",
						"other": "In {0} days"
					}
				},
				"week": {
					"default": {
						"one": "In {0} week",
						"other": "In {0} weeks"
					}
				},
				"month": {
					"default": {
						"one": "In {0} month",
						"other": "In {0} months"
					}
				},
				"year": {
					"default": {
						"one": "In {0} year",
						"other": "In {0} years"
					}
				}
			},
			"none": {
				"second": {
					"default": {
						"one": "{0} second",
						"other": "{0} seconds"
					},
					"short": {
						"one": "{0} sec",
						"other": "{0} secs"
					},
					"abbreviated": {
						"one": "{0}s",
						"other": "{0}s"
					}
				},
				"minute": {
					"default": {
						"one": "{0} minute",
						"other": "{0} minutes"
					},
					"short": {
						"one": "{0} min",
						"other": "{0} mins"
					},
					"abbreviated": {
						"one": "{0}m",
						"other": "{0}m"
					}
				},
				"hour": {
					"default": {
						"one": "{0} hour",
						"other": "{0} hours"
					},
					"short": {
						"one": "{0} hr",
						"other": "{0} hrs"
					},
					"abbreviated": {
						"one": "{0}h",
						"other": "{0}h"
					}
				},
				"day": {
					"default": {
						"one": "{0} day",
						"other": "{0} days"
					},
					"short": {
						"one": "{0} day",
						"other": "{0} days"
					},
					"abbreviated": {
						"one": "{0}d",
						"other": "{0}d"
					}
				},
				"week": {
					"default": {
						"one": "{0} week",
						"other": "{0} weeks"
					},
					"short": {
						"one": "{0} wk",
						"other": "{0} wks"
					}
				},
				"month": {
					"default": {
						"one": "{0} month",
						"other": "{0} months"
					},
					"short": {
						"one": "{0} mth",
						"other": "{0} mths"
					}
				},
				"year": {
					"default": {
						"one": "{0} year",
						"other": "{0} years"
					},
					"short": {
						"one": "{0} yr",
						"other": "{0} yrs"
					}
				}
			}
		}
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Date and time formatting.
	 * Based on: https://docs.angularjs.org/api/ng/filter/date
	 */

	module.exports = function (_) {

	    var NUMBER_STRING = /^\-?\d+$/;
	    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
	    var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/;
	    var DATE_FORMATS = {
	        yyyy: dateGetter('FullYear', 4),
	        yy: dateGetter('FullYear', 2, 0, true),
	        y: dateGetter('FullYear', 1),
	        MMMM: dateStrGetter('Month'),
	        MMM: dateStrGetter('Month', true),
	        MM: dateGetter('Month', 2, 1),
	        M: dateGetter('Month', 1, 1),
	        dd: dateGetter('Date', 2),
	        d: dateGetter('Date', 1),
	        HH: dateGetter('Hours', 2),
	        H: dateGetter('Hours', 1),
	        hh: dateGetter('Hours', 2, -12),
	        h: dateGetter('Hours', 1, -12),
	        mm: dateGetter('Minutes', 2),
	        m: dateGetter('Minutes', 1),
	        ss: dateGetter('Seconds', 2),
	        s: dateGetter('Seconds', 1),
	        sss: dateGetter('Milliseconds', 3),
	        EEEE: dateStrGetter('Day'),
	        EEE: dateStrGetter('Day', true),
	        a: ampmGetter,
	        Z: timeZoneGetter,
	        ww: weekGetter(2),
	        w: weekGetter(1),
	        G: eraGetter,
	        GG: eraGetter,
	        GGG: eraGetter,
	        GGGG: longEraGetter
	    };

	    function padNumber(num, digits, trim) {
	        var neg = '';
	        if (num < 0) {
	            neg = '-';
	            num = -num;
	        }
	        num = '' + num;
	        while (num.length < digits) num = '0' + num;
	        if (trim) {
	            num = num.substr(num.length - digits);
	        }
	        return neg + num;
	    }

	    function dateGetter(name, size, offset, trim) {
	        offset = offset || 0;
	        return function (date) {
	            var value = date['get' + name]();
	            if (offset > 0 || value > -offset) {
	                value += offset;
	            }
	            if (value === 0 && offset == -12) value = 12;
	            return padNumber(value, size, trim);
	        };
	    }

	    function dateStrGetter(name, shortForm) {
	        return function (date, formats) {
	            var value = date['get' + name]();
	            var get = _.uppercase(shortForm ? ('SHORT' + name) : name);

	            return formats[get][value];
	        };
	    }

	    function timeZoneGetter(date, formats, offset) {
	        var zone = -1 * offset;
	        var paddedZone = (zone >= 0) ? "+" : "";

	        paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) +
	            padNumber(Math.abs(zone % 60), 2);

	        return paddedZone;
	    }

	    function getFirstThursdayOfYear(year) {
	        // 0 = index of January
	        var dayOfWeekOnFirst = (new Date(year, 0, 1)).getDay();
	        // 4 = index of Thursday (+1 to account for 1st = 5)
	        // 11 = index of *next* Thursday (+1 account for 1st = 12)
	        return new Date(year, 0, ((dayOfWeekOnFirst <= 4) ? 5 : 12) - dayOfWeekOnFirst);
	    }

	    function getThursdayThisWeek(datetime) {
	        return new Date(datetime.getFullYear(), datetime.getMonth(),
	            // 4 = index of Thursday
	            datetime.getDate() + (4 - datetime.getDay()));
	    }

	    function weekGetter(size) {
	        return function (date) {
	            var firstThurs = getFirstThursdayOfYear(date.getFullYear()),
	                thisThurs = getThursdayThisWeek(date);

	            var diff = +thisThurs - +firstThurs,
	                result = 1 + Math.round(diff / 6.048e8); // 6.048e8 ms per week

	            return padNumber(result, size);
	        };
	    }

	    function ampmGetter(date, formats) {
	        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
	    }

	    function eraGetter(date, formats) {
	        return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1];
	    }

	    function longEraGetter(date, formats) {
	        return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1];
	    }

	    function jsonStringToDate(string) {
	        var match;
	        if (match = string.match(R_ISO8601_STR)) {
	            var date = new Date(0),
	                tzHour = 0,
	                tzMin = 0,
	                dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
	                timeSetter = match[8] ? date.setUTCHours : date.setHours;

	            if (match[9]) {
	                tzHour = _.toInt(match[9] + match[10]);
	                tzMin = _.toInt(match[9] + match[11]);
	            }
	            dateSetter.call(date, _.toInt(match[1]), _.toInt(match[2]) - 1, _.toInt(match[3]));
	            var h = _.toInt(match[4] || 0) - tzHour;
	            var m = _.toInt(match[5] || 0) - tzMin;
	            var s = _.toInt(match[6] || 0);
	            var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
	            timeSetter.call(date, h, m, s, ms);
	            return date;
	        }
	        return string;
	    }

	    function timezoneToOffset(timezone, fallback) {
	        var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
	        return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
	    }

	    function addDateMinutes(date, minutes) {
	        date = new Date(date.getTime());
	        date.setMinutes(date.getMinutes() + minutes);
	        return date;
	    }

	    function convertTimezoneToLocal(date, timezone, reverse) {
	        reverse = reverse ? -1 : 1;
	        var timezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
	        return addDateMinutes(date, reverse * (timezoneOffset - date.getTimezoneOffset()));
	    }

	    return function (date, format, timezone) {

	        var text = '',
	            parts = [],
	            formats = this.$locale.DATETIME_FORMATS,
	            fn, match;

	        format = format || 'mediumDate';
	        format = formats[format] || format;

	        if (_.isString(date)) {
	            date = NUMBER_STRING.test(date) ? _.toInt(date) : jsonStringToDate(date);
	        }

	        if (_.isNumber(date)) {
	            date = new Date(date);
	        }

	        if (!_.isDate(date) || !isFinite(date.getTime())) {
	            return date;
	        }

	        while (format) {
	            match = DATE_FORMATS_SPLIT.exec(format);
	            if (match) {
	                parts = _.concat(parts, match, 1);
	                format = parts.pop();
	            } else {
	                parts.push(format);
	                format = null;
	            }
	        }

	        var dateTimezoneOffset = date.getTimezoneOffset();

	        if (timezone) {
	            dateTimezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
	            date = convertTimezoneToLocal(date, timezone, true);
	        }

	        parts.forEach(function (value) {
	            fn = DATE_FORMATS[value];
	            text += fn ? fn(date, formats, dateTimezoneOffset) : value.replace(/(^'|'$)/g, '').replace(/''/g, "'");
	        });

	        return text;
	    };

	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Number formatting.
	 * Based on: https://docs.angularjs.org/api/ng/filter/number
	 */

	module.exports = function (_) {

	    var DECIMAL_SEP = '.';

	    _.formatNumber = function (number, pattern, groupSep, decimalSep, fractionSize) {

	        if (_.isObject(number)) {
	            return '';
	        }

	        var isNegative = number < 0;
	        number = Math.abs(number);

	        var isInfinity = number === Infinity;
	        if (!isInfinity && !isFinite(number)) return '';

	        var numStr = number + '',
	            formatedText = '',
	            hasExponent = false,
	            parts = [];

	        if (isInfinity) {
	            formatedText = '\u221e';
	        }

	        if (!isInfinity && numStr.indexOf('e') !== -1) {
	            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
	            if (match && match[2] == '-' && match[3] > fractionSize + 1) {
	                number = 0;
	            } else {
	                formatedText = numStr;
	                hasExponent = true;
	            }
	        }

	        if (!isInfinity && !hasExponent) {

	            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;

	            // determine fractionSize if it is not specified
	            if (_.isUndefined(fractionSize)) {
	                fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
	            }

	            // safely round numbers in JS without hitting imprecisions of floating-point arithmetics
	            // inspired by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
	            number = +(Math.round(+(number.toString() + 'e' + fractionSize)).toString() + 'e' + -fractionSize);

	            var fraction = ('' + number).split(DECIMAL_SEP);
	            var whole = fraction[0];
	            fraction = fraction[1] || '';

	            var i, pos = 0,
	                lgroup = pattern.lgSize,
	                group = pattern.gSize;

	            if (whole.length >= (lgroup + group)) {
	                pos = whole.length - lgroup;
	                for (i = 0; i < pos; i++) {
	                    if ((pos - i) % group === 0 && i !== 0) {
	                        formatedText += groupSep;
	                    }
	                    formatedText += whole.charAt(i);
	                }
	            }

	            for (i = pos; i < whole.length; i++) {
	                if ((whole.length - i) % lgroup === 0 && i !== 0) {
	                    formatedText += groupSep;
	                }
	                formatedText += whole.charAt(i);
	            }

	            // format fraction part.
	            while (fraction.length < fractionSize) {
	                fraction += '0';
	            }

	            if (fractionSize && fractionSize !== '0') {
	                formatedText += decimalSep + fraction.substr(0, fractionSize);
	            }

	        } else {
	            if (fractionSize > 0 && number < 1) {
	                formatedText = number.toFixed(fractionSize);
	                number = parseFloat(formatedText);
	            }
	        }

	        if (number === 0) {
	            isNegative = false;
	        }

	        parts.push(isNegative ? pattern.negPre : pattern.posPre, formatedText, isNegative ? pattern.negSuf : pattern.posSuf);

	        return parts.join('');
	    };

	    return function (number, fractionSize) {

	        var formats = this.$locale.NUMBER_FORMATS;

	        // if null or undefined pass it through
	        return (number == null) ? number : _.formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
	    };

	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Currency formatting.
	 * Based on: https://docs.angularjs.org/api/ng/filter/currency
	 */

	module.exports = function (_) {

	    return function (amount, currencySymbol, fractionSize) {

	        var formats = this.$locale.NUMBER_FORMATS;

	        if (_.isUndefined(currencySymbol)) {
	            currencySymbol = formats.CURRENCY_SYM;
	        }

	        if (_.isUndefined(fractionSize)) {
	            fractionSize = formats.PATTERNS[1].maxFrac;
	        }

	        // if null or undefined pass it through
	        return (amount == null) ? amount : _.formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).
	        replace(/\u00A4/g, currencySymbol);
	    };

	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Relative Date and time formatting.
	 * Based on: https://github.com/twitter/twitter-cldr-js
	 */

	module.exports = function (_) {

	    var approximate_multiplier = 0.75,
	        default_type = "default",
	        time_in_seconds = {
	            "second": 1,
	            "minute": 60,
	            "hour": 3600,
	            "day": 86400,
	            "week": 604800,
	            "month": 2629743.83,
	            "year": 31556926
	        };

	    function calculate_unit(seconds, unit_options) {
	        var key, multiplier, obj, options;
	        if (unit_options == null) {
	            unit_options = {};
	        }
	        options = {};
	        for (key in unit_options) {
	            obj = unit_options[key];
	            options[key] = obj;
	        }
	        if (options.approximate == null) {
	            options["approximate"] = false;
	        }
	        multiplier = options.approximate ? approximate_multiplier : 1;
	        if (seconds < (time_in_seconds.minute * multiplier)) {
	            return "second";
	        } else if (seconds < (time_in_seconds.hour * multiplier)) {
	            return "minute";
	        } else if (seconds < (time_in_seconds.day * multiplier)) {
	            return "hour";
	        } else if (seconds < (time_in_seconds.week * multiplier)) {
	            return "day";
	        } else if (seconds < (time_in_seconds.month * multiplier)) {
	            return "week";
	        } else if (seconds < (time_in_seconds.year * multiplier)) {
	            return "month";
	        } else {
	            return "year";
	        }
	    }

	    function calculate_time(seconds, unit) {
	        return Math.round(seconds / time_in_seconds[unit]);
	    }

	    function format(seconds, fmt_options, patterns) {
	        var key, number, obj, options;
	        if (fmt_options == null) {
	            fmt_options = {};
	        }
	        options = {};
	        for (key in fmt_options) {
	            obj = fmt_options[key];
	            options[key] = obj;
	        }
	        options["direction"] || (options["direction"] = (seconds < 0 ? "ago" : "until"));
	        if (options["unit"] === null || options["unit"] === void 0) {
	            options["unit"] = calculate_unit(Math.abs(seconds), options);
	        }
	        options["type"] || (options["type"] = default_type);
	        options["number"] = calculate_time(Math.abs(seconds), options["unit"]);
	        number = calculate_time(Math.abs(seconds), options["unit"]);
	        options["rule"] = _.pluralCat('de', number);
	        return patterns[options["direction"]][options["unit"]][options["type"]][options["rule"]].replace(/\{[0-9]\}/, number.toString());
	    }

	    return function (date, options) {
	        date = date instanceof Date ? date : new Date(date);
	        return format((date - new Date()) / 1000, options, this.$locale.TIMESPAN_FORMATS);
	    }

	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */

	function install(Vue) {

	    var _ = __webpack_require__(19);

	    _.config = Vue.config;
	    _.warning = Vue.util.warn;
	    _.nextTick = Vue.util.nextTick;

	    Vue.url = __webpack_require__(20);
	    Vue.http = __webpack_require__(26);
	    Vue.resource = __webpack_require__(41);
	    Vue.Promise = __webpack_require__(28);

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return _.options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return _.options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function () {
	                return function (executor) {
	                    return new Vue.Promise(executor, this);
	                }.bind(this);
	            }
	        }

	    });
	}

	if (window.Vue) {
	    Vue.use(install);
	}

	module.exports = install;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */

	var _ = exports, array = [], console = window.console;

	_.warn = function (msg) {
	    if (console && _.warning && (!_.config.silent || _.config.debug)) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	};

	_.error = function (msg) {
	    if (console) {
	        console.error(msg);
	    }
	};

	_.trim = function (str) {
	    return str.replace(/^\s*|\s*$/g, '');
	};

	_.toLower = function (str) {
	    return str ? str.toLowerCase() : '';
	};

	_.isArray = Array.isArray;

	_.isString = function (val) {
	    return typeof val === 'string';
	};

	_.isFunction = function (val) {
	    return typeof val === 'function';
	};

	_.isObject = function (obj) {
	    return obj !== null && typeof obj === 'object';
	};

	_.isPlainObject = function (obj) {
	    return _.isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	};

	_.options = function (fn, obj, options) {

	    options = options || {};

	    if (_.isFunction(options)) {
	        options = options.call(obj);
	    }

	    return _.merge(fn.bind({$vm: obj, $options: options}), fn, {$options: options});
	};

	_.each = function (obj, iterator) {

	    var i, key;

	    if (typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (_.isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	};

	_.defaults = function (target, source) {

	    for (var key in source) {
	        if (target[key] === undefined) {
	            target[key] = source[key];
	        }
	    }

	    return target;
	};

	_.extend = function (target) {

	    var args = array.slice.call(arguments, 1);

	    args.forEach(function (arg) {
	        merge(target, arg);
	    });

	    return target;
	};

	_.merge = function (target) {

	    var args = array.slice.call(arguments, 1);

	    args.forEach(function (arg) {
	        merge(target, arg, true);
	    });

	    return target;
	};

	function merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
	            if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (_.isArray(source[key]) && !_.isArray(target[key])) {
	                target[key] = [];
	            }
	            merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for URL templating.
	 */

	var _ = __webpack_require__(19);
	var ie = document.documentMode;
	var el = document.createElement('a');

	function Url(url, params) {

	    var options = url, transform;

	    if (_.isString(url)) {
	        options = {url: url, params: params};
	    }

	    options = _.merge({}, Url.options, this.$options, options);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, this.$vm);
	    }, this);

	    return transform(options);
	};

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [
	    __webpack_require__(21),
	    __webpack_require__(23),
	    __webpack_require__(24),
	    __webpack_require__(25)
	];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [], escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (_.isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;

	    _.each(obj, function (value, key) {

	        hash = _.isObject(value) || _.isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	module.exports = _.url = Url;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * URL Template (RFC 6570) Transform.
	 */

	var UrlTemplate = __webpack_require__(22);

	module.exports = function (options) {

	    var variables = [], url = UrlTemplate.expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	exports.expand = function (url, params, variables) {

	    var tmpl = this.parse(url), expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	};

	exports.parse = function (template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null, values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, exports.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }

	                } else {
	                    return exports.encodeReserved(literal);
	                }
	            });
	        }
	    };
	};

	exports.getValues = function (context, operator, key, modifier) {

	    var value = context[key], result = [];

	    if (this.isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(this.isDefined).forEach(function (value) {
	                        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	                    }, this);
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (this.isDefined(value[k])) {
	                            result.push(this.encodeValue(operator, value[k], k));
	                        }
	                    }, this);
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(this.isDefined).forEach(function (value) {
	                        tmp.push(this.encodeValue(operator, value));
	                    }, this);
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (this.isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(this.encodeValue(operator, value[k].toString()));
	                        }
	                    }, this);
	                }

	                if (this.isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	};

	exports.isDefined = function (value) {
	    return value !== undefined && value !== null;
	};

	exports.isKeyOperator = function (operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	};

	exports.encodeValue = function (operator, value, key) {

	    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	};

	exports.encodeReserved = function (str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Legacy Transform.
	 */

	var _ = __webpack_require__(19);

	module.exports = function (options, next) {

	    var variables = [], url = next(options);

	    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

	        _.warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');

	        if (options.params[name]) {
	            variables.push(name);
	            return slash + encodeUriSegment(options.params[name]);
	        }

	        return '';
	    });

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	};

	function encodeUriSegment(value) {

	    return encodeUriQuery(value, true).
	        replace(/%26/gi, '&').
	        replace(/%3D/gi, '=').
	        replace(/%2B/gi, '+');
	}

	function encodeUriQuery(value, spaces) {

	    return encodeURIComponent(value).
	        replace(/%40/gi, '@').
	        replace(/%3A/gi, ':').
	        replace(/%24/g, '$').
	        replace(/%2C/gi, ',').
	        replace(/%20/g, (spaces ? '%20' : '+'));
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Query Parameter Transform.
	 */

	var _ = __webpack_require__(19);

	module.exports = function (options, next) {

	    var urlParams = Object.keys(_.url.options.params), query = {}, url = next(options);

	   _.each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = _.url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Root Prefix Transform.
	 */

	var _ = __webpack_require__(19);

	module.exports = function (options, next) {

	    var url = next(options);

	    if (_.isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }

	    return url;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for sending network requests.
	 */

	var _ = __webpack_require__(19);
	var Client = __webpack_require__(27);
	var Promise = __webpack_require__(28);
	var interceptor = __webpack_require__(31);
	var jsonType = {'Content-Type': 'application/json'};

	function Http(url, options) {

	    var client = Client, request, promise;

	    Http.interceptors.forEach(function (handler) {
	        client = interceptor(handler, this.$vm)(client);
	    }, this);

	    options = _.isObject(url) ? url : _.extend({url: url}, options);
	    request = _.merge({}, Http.options, this.$options, options);
	    promise = client(request).bind(this.$vm).then(function (response) {

	        return response.ok ? response : Promise.reject(response);

	    }, function (response) {

	        if (response instanceof Error) {
	            _.error(response);
	        }

	        return Promise.reject(response);
	    });

	    if (request.success) {
	        promise.success(request.success);
	    }

	    if (request.error) {
	        promise.error(request.error);
	    }

	    return promise;
	}

	Http.options = {
	    method: 'get',
	    data: '',
	    params: {},
	    headers: {},
	    xhr: null,
	    jsonp: 'callback',
	    beforeSend: null,
	    crossOrigin: null,
	    emulateHTTP: false,
	    emulateJSON: false,
	    timeout: 0
	};

	Http.interceptors = [
	    __webpack_require__(32),
	    __webpack_require__(33),
	    __webpack_require__(34),
	    __webpack_require__(36),
	    __webpack_require__(37),
	    __webpack_require__(38),
	    __webpack_require__(39)
	];

	Http.headers = {
	    put: jsonType,
	    post: jsonType,
	    patch: jsonType,
	    delete: jsonType,
	    common: {'Accept': 'application/json, text/plain, */*'},
	    custom: {'X-Requested-With': 'XMLHttpRequest'}
	};

	['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

	    Http[method] = function (url, data, success, options) {

	        if (_.isFunction(data)) {
	            options = success;
	            success = data;
	            data = undefined;
	        }

	        if (_.isObject(success)) {
	            options = success;
	            success = undefined;
	        }

	        return this(url, _.extend({method: method, data: data, success: success}, options));
	    };
	});

	module.exports = _.http = Http;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Base client.
	 */

	var _ = __webpack_require__(19);
	var Promise = __webpack_require__(28);
	var xhrClient = __webpack_require__(30);

	module.exports = function (request) {

	    var response = (request.client || xhrClient)(request);

	    return Promise.resolve(response).then(function (response) {

	        if (response.headers) {

	            var headers = parseHeaders(response.headers);

	            response.headers = function (name) {

	                if (name) {
	                    return headers[_.toLower(name)];
	                }

	                return headers;
	            };

	        }

	        response.ok = response.status >= 200 && response.status < 300;

	        return response;
	    });

	};

	function parseHeaders(str) {

	    var headers = {}, value, name, i;

	    if (_.isString(str)) {
	        _.each(str.split('\n'), function (row) {

	            i = row.indexOf(':');
	            name = _.trim(_.toLower(row.slice(0, i)));
	            value = _.trim(row.slice(i + 1));

	            if (headers[name]) {

	                if (_.isArray(headers[name])) {
	                    headers[name].push(value);
	                } else {
	                    headers[name] = [headers[name], value];
	                }

	            } else {

	                headers[name] = value;
	            }

	        });
	    }

	    return headers;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Promise adapter.
	 */

	var _ = __webpack_require__(19);
	var PromiseObj = window.Promise || __webpack_require__(29);

	function Promise(executor, context) {

	    if (executor instanceof PromiseObj) {
	        this.promise = executor;
	    } else {
	        this.promise = new PromiseObj(executor.bind(context));
	    }

	    this.context = context;
	}

	Promise.all = function (iterable, context) {
	    return new Promise(PromiseObj.all(iterable), context);
	};

	Promise.resolve = function (value, context) {
	    return new Promise(PromiseObj.resolve(value), context);
	};

	Promise.reject = function (reason, context) {
	    return new Promise(PromiseObj.reject(reason), context);
	};

	Promise.race = function (iterable, context) {
	    return new Promise(PromiseObj.race(iterable), context);
	};

	var p = Promise.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    this.promise = this.promise.then(fulfilled, rejected);

	    return this;
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    this.promise = this.promise.catch(rejected);

	    return this;
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	            callback.call(this);
	            return value;
	        }, function (reason) {
	            callback.call(this);
	            return PromiseObj.reject(reason);
	        }
	    );
	};

	p.success = function (callback) {

	    _.warn('The `success` method has been deprecated. Use the `then` method instead.');

	    return this.then(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};

	p.error = function (callback) {

	    _.warn('The `error` method has been deprecated. Use the `catch` method instead.');

	    return this.catch(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};

	p.always = function (callback) {

	    _.warn('The `always` method has been deprecated. Use the `finally` method instead.');

	    var cb = function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    };

	    return this.then(cb, cb);
	};

	module.exports = Promise;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var _ = __webpack_require__(19);

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;

	function Promise(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise.reject = function (r) {
	    return new Promise(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise.resolve = function (x) {
	    return new Promise(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise.all = function all(iterable) {
	    return new Promise(function (resolve, reject) {
	        var count = 0, result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise.race = function race(iterable) {
	    return new Promise(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p = Promise.prototype;

	p.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;

	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p.notify = function notify() {
	    var promise = this;

	    _.nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	module.exports = Promise;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XMLHttp client.
	 */

	var _ = __webpack_require__(19);
	var Promise = __webpack_require__(28);

	module.exports = function (request) {
	    return new Promise(function (resolve) {

	        var xhr = new XMLHttpRequest(), response = {request: request}, handler;

	        request.cancel = function () {
	            xhr.abort();
	        };

	        xhr.open(request.method, _.url(request), true);

	        if (_.isPlainObject(request.xhr)) {
	            _.extend(xhr, request.xhr);
	        }

	        _.each(request.headers || {}, function (value, header) {
	            xhr.setRequestHeader(header, value);
	        });

	        handler = function (event) {

	            response.data = xhr.responseText;
	            response.status = xhr.status;
	            response.statusText = xhr.statusText;
	            response.headers = xhr.getAllResponseHeaders();

	            resolve(response);
	        };

	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;

	        xhr.send(request.data);
	    });
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Interceptor factory.
	 */

	var _ = __webpack_require__(19);
	var Promise = __webpack_require__(28);

	module.exports = function (handler, vm) {

	    return function (client) {

	        if (_.isFunction(handler)) {
	            handler = handler.call(vm, Promise);
	        }

	        return function (request) {

	            if (_.isFunction(handler.request)) {
	                request = handler.request.call(vm, request);
	            }

	            return when(request, function (request) {
	                return when(client(request), function (response) {

	                    if (_.isFunction(handler.response)) {
	                        response = handler.response.call(vm, response);
	                    }

	                    return response;
	                });
	            });
	        };
	    };
	};

	function when(value, fulfilled, rejected) {

	    var promise = Promise.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Before Interceptor.
	 */

	var _ = __webpack_require__(19);

	module.exports = {

	    request: function (request) {

	        if (_.isFunction(request.beforeSend)) {
	            request.beforeSend.call(this, request);
	        }

	        return request;
	    }

	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Timeout Interceptor.
	 */

	module.exports = function () {

	    var timeout;

	    return {

	        request: function (request) {

	            if (request.timeout) {
	                timeout = setTimeout(function () {
	                    request.cancel();
	                }, request.timeout);
	            }

	            return request;
	        },

	        response: function (response) {

	            clearTimeout(timeout);

	            return response;
	        }

	    };
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP Interceptor.
	 */

	var jsonpClient = __webpack_require__(35);

	module.exports = {

	    request: function (request) {

	        if (request.method == 'JSONP') {
	            request.client = jsonpClient;
	        }

	        return request;
	    }

	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP client.
	 */

	var _ = __webpack_require__(19);
	var Promise = __webpack_require__(28);

	module.exports = function (request) {
	    return new Promise(function (resolve) {

	        var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {request: request, data: null}, handler, script;

	        request.params[request.jsonp] = callback;
	        request.cancel = function () {
	            handler({type: 'cancel'});
	        };

	        script = document.createElement('script');
	        script.src = _.url(request);
	        script.type = 'text/javascript';
	        script.async = true;

	        window[callback] = function (data) {
	            response.data = data;
	        };

	        handler = function (event) {

	            if (event.type === 'load' && response.data !== null) {
	                response.status = 200;
	            } else if (event.type === 'error') {
	                response.status = 404;
	            } else {
	                response.status = 0;
	            }

	            resolve(response);

	            delete window[callback];
	            document.body.removeChild(script);
	        };

	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * HTTP method override Interceptor.
	 */

	module.exports = {

	    request: function (request) {

	        if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	            request.headers['X-HTTP-Method-Override'] = request.method;
	            request.method = 'POST';
	        }

	        return request;
	    }

	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Mime Interceptor.
	 */

	var _ = __webpack_require__(19);

	module.exports = {

	    request: function (request) {

	        if (request.emulateJSON && _.isPlainObject(request.data)) {
	            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	            request.data = _.url.params(request.data);
	        }

	        if (_.isObject(request.data) && /FormData/i.test(request.data.toString())) {
	            delete request.headers['Content-Type'];
	        }

	        if (_.isPlainObject(request.data)) {
	            request.data = JSON.stringify(request.data);
	        }

	        return request;
	    },

	    response: function (response) {

	        try {
	            response.data = JSON.parse(response.data);
	        } catch (e) {}

	        return response;
	    }

	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Header Interceptor.
	 */

	var _ = __webpack_require__(19);

	module.exports = {

	    request: function (request) {

	        request.method = request.method.toUpperCase();
	        request.headers = _.extend({}, _.http.headers.common,
	            !request.crossOrigin ? _.http.headers.custom : {},
	            _.http.headers[request.method.toLowerCase()],
	            request.headers
	        );

	        if (_.isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {
	            _.extend(request.params, request.data);
	            delete request.data;
	        }

	        return request;
	    }

	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * CORS Interceptor.
	 */

	var _ = __webpack_require__(19);
	var xdrClient = __webpack_require__(40);
	var xhrCors = 'withCredentials' in new XMLHttpRequest();
	var originUrl = _.url.parse(location.href);

	module.exports = {

	    request: function (request) {

	        if (request.crossOrigin === null) {
	            request.crossOrigin = crossOrigin(request);
	        }

	        if (request.crossOrigin) {

	            if (!xhrCors) {
	                request.client = xdrClient;
	            }

	            request.emulateHTTP = false;
	        }

	        return request;
	    }

	};

	function crossOrigin(request) {

	    var requestUrl = _.url.parse(_.url(request));

	    return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XDomain client (Internet Explorer).
	 */

	var _ = __webpack_require__(19);
	var Promise = __webpack_require__(28);

	module.exports = function (request) {
	    return new Promise(function (resolve) {

	        var xdr = new XDomainRequest(), response = {request: request}, handler;

	        request.cancel = function () {
	            xdr.abort();
	        };

	        xdr.open(request.method, _.url(request), true);

	        handler = function (event) {

	            response.data = xdr.responseText;
	            response.status = xdr.status;
	            response.statusText = xdr.statusText;

	            resolve(response);
	        };

	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = function () {};
	        xdr.onprogress = function () {};

	        xdr.send(request.data);
	    });
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for interacting with RESTful services.
	 */

	var _ = __webpack_require__(19);

	function Resource(url, params, actions, options) {

	    var self = this, resource = {};

	    actions = _.extend({},
	        Resource.actions,
	        actions
	    );

	    _.each(actions, function (action, name) {

	        action = _.merge({url: url, params: params || {}}, options, action);

	        resource[name] = function () {
	            return (self.$http || _.http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options = _.extend({}, action), params = {}, data, success, error;

	    switch (args.length) {

	        case 4:

	            error = args[3];
	            success = args[2];

	        case 3:
	        case 2:

	            if (_.isFunction(args[1])) {

	                if (_.isFunction(args[0])) {

	                    success = args[0];
	                    error = args[1];

	                    break;
	                }

	                success = args[1];
	                error = args[2];

	            } else {

	                params = args[0];
	                data = args[1];
	                success = args[2];

	                break;
	            }

	        case 1:

	            if (_.isFunction(args[0])) {
	                success = args[0];
	            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                data = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
	    }

	    options.data = data;
	    options.params = _.extend({}, options.params, params);

	    if (success) {
	        options.success = success;
	    }

	    if (error) {
	        options.error = error;
	    }

	    return options;
	}

	Resource.actions = {

	    get: {method: 'GET'},
	    save: {method: 'POST'},
	    query: {method: 'GET'},
	    update: {method: 'PUT'},
	    remove: {method: 'DELETE'},
	    delete: {method: 'DELETE'}

	};

	module.exports = _.resource = Resource;


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function (Vue) {

	    var _ = Vue.util;
	    var cache = {};

	    /**
	     * Asset provides a promise based assets manager.
	     */
	    function Asset(assets) {

	        var promises = [], $url = (this.$url || Vue.url), _assets = [], promise;

	        Object.keys(assets).forEach(function (type) {

	            if (!Asset[type]) {
	                return;
	            }

	            _assets = _.isArray(assets[type]) ? assets[type] : [assets[type]];

	            for (var i = 0; i < _assets.length; i++) {

	                if (!_assets[i]) {
	                    continue;
	                }

	                if (!cache[_assets[i]]) {
	                    cache[_assets[i]] = Asset[type]($url(_assets[i]));
	                }

	                promises.push(cache[_assets[i]]);
	            }

	        });

	        return Vue.Promise.all(promises).bind(this);
	    }

	    _.extend(Asset, {

	        css: function (url) {

	            return new Vue.Promise(function (resolve, reject) {

	                var link = document.createElement('link');

	                link.onload = function () {
	                    resolve(url);
	                };
	                link.onerror = function () {
	                    reject(url);
	                };

	                link.href = url;
	                link.type = 'text/css';
	                link.rel = 'stylesheet';

	                document.getElementsByTagName('head')[0].appendChild(link);
	            });

	        },

	        js: function (url) {

	            return new Vue.Promise(function (resolve, reject) {

	                var script = document.createElement('script');

	                script.onload = function () {
	                    resolve(url);
	                };
	                script.onerror = function () {
	                    reject(url);
	                };
	                script.src = url;

	                document.getElementsByTagName('head')[0].appendChild(script);
	            });

	        },

	        image: function (url) {

	            return new Vue.Promise(function (resolve, reject) {

	                var img = new Image();

	                img.onload = function () {
	                    resolve(url);
	                };
	                img.onerror = function () {
	                    reject(url);
	                };

	                img.src = url;
	            });

	        }

	    });

	    Object.defineProperty(Vue.prototype, '$asset', {

	        get: function () {
	            return _.extend(Asset.bind(this), Asset);
	        }

	    });

	    Vue.asset = Asset;

	    return Asset;

	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function (Vue) {

	    Vue.http.interceptors.unshift({

	        request: function (request) {

	            if (!request.crossOrigin) {
	                request.headers['X-XSRF-TOKEN'] = Vue.cache.get('_csrf');
	            }

	            return request;
	        }

	    });

	    Vue.cache.set('_csrf', window.$pagekit.csrf);

	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function (Vue) {

	    Vue.prototype.$notify = function () {

	        var args = arguments,
	            msgs = window.jQuery('.pk-system-messages'),
	            UIkit = window.UIkit || {};

	        if (args[0]) {
	            args[0] = this.$trans(args[0]);
	        }

	        if (UIkit.notify) {
	            UIkit.notify.apply(this, args);
	        } else if (msgs) {
	            msgs.empty().append('<div class="uk-alert uk-alert-' + (args[1] || 'info') + '"><p>' + args[0] + '</p></div>');
	        }

	    };

	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	var config = window.$locale || {translations: {}};

	/**
	 * Copyright (c) William DURAND <william.durand1@gmail.com> (https://github.com/willdurand/BazingaJsTranslationBundle)
	 */

	var Translator = (function (document, undefined) {

	    "use strict";

	    var _messages     = {},
	        _domains      = [],
	        _sPluralRegex = new RegExp(/^\w+\: +(.+)$/),
	        _cPluralRegex = new RegExp(/^\s*((\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]]))\s?(.+?)$/),
	        _iPluralRegex = new RegExp(/^\s*(\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]])/);

	    /**
	     * Replace placeholders in given message.
	     *
	     * **WARNING:** used placeholders are removed.
	     *
	     * @param {String} message      The translated message
	     * @param {Object} placeholders The placeholders to replace
	     * @return {String}             A human readable message
	     * @api private
	     */
	    function replace_placeholders(message, placeholders) {
	        var _i,
	            _prefix = Translator.placeHolderPrefix,
	            _suffix = Translator.placeHolderSuffix;

	        for (_i in placeholders) {
	            var _r = new RegExp(_prefix + _i + _suffix, 'g');

	            if (_r.test(message)) {
	                message = message.replace(_r, placeholders[_i]);
	            }
	        }

	        return message;
	    }

	    /**
	     * Get the message based on its id, its domain, and its locale. If domain or
	     * locale are not specified, it will try to find the message using fallbacks.
	     *
	     * @param {String} id               The message id
	     * @param {String} domain           The domain for the message or null to guess it
	     * @param {String} locale           The locale or null to use the default
	     * @param {String} currentLocale    The current locale or null to use the default
	     * @param {String} localeFallback   The fallback (default) locale
	     * @return {String}                 The right message if found, `undefined` otherwise
	     * @api private
	     */
	    function get_message(id, domain, locale, currentLocale, localeFallback) {
	        var _locale = locale || currentLocale || localeFallback,
	            _domain = domain;

	        if (undefined == _messages[_locale]) {
	            if (undefined == _messages[localeFallback]) {
	                return id;
	            }

	            _locale = localeFallback;
	        }

	        if (undefined === _domain || null === _domain) {
	            for (var i = 0; i < _domains.length; i++) {
	                if (has_message(_locale, _domains[i], id) ||
	                    has_message(localeFallback, _domains[i], id)) {
	                    _domain = _domains[i];

	                    break;
	                }
	            }
	        }

	        if (has_message(_locale, _domain, id)) {
	            return _messages[_locale][_domain][id];
	        }

	        var _length, _parts, _last, _lastLength;

	        while (_locale.length > 2) {
	            _length     = _locale.length;
	            _parts      = _locale.split(/[\s_]+/);
	            _last       = _parts[_parts.length - 1];
	            _lastLength = _last.length;

	            if (1 === _parts.length) {
	                break;
	            }

	            _locale = _locale.substring(0, _length - (_lastLength + 1));

	            if (has_message(_locale, _domain, id)) {
	                return _messages[_locale][_domain][id];
	            }
	        }

	        if (has_message(localeFallback, _domain, id)) {
	            return _messages[localeFallback][_domain][id];
	        }

	        return id;
	    }

	    /**
	     * Just look for a specific locale / domain / id if the message is available,
	     * helpfull for message availability validation
	     *
	     * @param {String} locale           The locale
	     * @param {String} domain           The domain for the message
	     * @param {String} id               The message id
	     * @return {Boolean}                Return `true` if message is available,
	     *                      `               false` otherwise
	     * @api private
	     */
	    function has_message(locale, domain, id) {
	        if (undefined == _messages[locale]) {
	            return false;
	        }

	        if (undefined == _messages[locale][domain]) {
	            return false;
	        }

	        if (undefined == _messages[locale][domain][id]) {
	            return false;
	        }

	        return true;
	    }

	    /**
	     * The logic comes from the Symfony2 PHP Framework.
	     *
	     * Given a message with different plural translations separated by a
	     * pipe (|), this method returns the correct portion of the message based
	     * on the given number, the current locale and the pluralization rules
	     * in the message itself.
	     *
	     * The message supports two different types of pluralization rules:
	     *
	     * interval: {0} There is no apples|{1} There is one apple|]1,Inf] There is %count% apples
	     * indexed:  There is one apple|There is %count% apples
	     *
	     * The indexed solution can also contain labels (e.g. one: There is one apple).
	     * This is purely for making the translations more clear - it does not
	     * affect the functionality.
	     *
	     * The two methods can also be mixed:
	     *     {0} There is no apples|one: There is one apple|more: There is %count% apples
	     *
	     * @param {String} message  The message id
	     * @param {Number} number   The number to use to find the indice of the message
	     * @param {String} locale   The locale
	     * @return {String}         The message part to use for translation
	     * @api private
	     */
	    function pluralize(message, number, locale) {
	        var _p,
	            _e,
	            _explicitRules = [],
	            _standardRules = [],
	            _parts         = message.split(Translator.pluralSeparator),
	            _matches       = [];

	        for (_p = 0; _p < _parts.length; _p++) {
	            var _part = _parts[_p];

	            if (_cPluralRegex.test(_part)) {
	                _matches = _part.match(_cPluralRegex);
	                _explicitRules[_matches[0]] = _matches[_matches.length - 1];
	            } else if (_sPluralRegex.test(_part)) {
	                _matches = _part.match(_sPluralRegex);
	                _standardRules.push(_matches[1]);
	            } else {
	                _standardRules.push(_part);
	            }
	        }

	        for (_e in _explicitRules) {
	            if (_iPluralRegex.test(_e)) {
	                _matches = _e.match(_iPluralRegex);

	                if (_matches[1]) {
	                    var _ns = _matches[2].split(','),
	                        _n;

	                    for (_n in _ns) {
	                        if (number == _ns[_n]) {
	                            return _explicitRules[_e];
	                        }
	                    }
	                } else {
	                    var _leftNumber  = convert_number(_matches[4]);
	                    var _rightNumber = convert_number(_matches[5]);

	                    if (('[' === _matches[3] ? number >= _leftNumber : number > _leftNumber) &&
	                        (']' === _matches[6] ? number <= _rightNumber : number < _rightNumber)) {
	                        return _explicitRules[_e];
	                    }
	                }
	            }
	        }

	        return _standardRules[plural_position(number, locale)] || _standardRules[0] || undefined;
	    }

	    /**
	     * The logic comes from the Symfony2 PHP Framework.
	     *
	     * Convert number as String, "Inf" and "-Inf"
	     * values to number values.
	     *
	     * @param {String} number   A litteral number
	     * @return {Number}         The int value of the number
	     * @api private
	     */
	    function convert_number(number) {
	        if ('-Inf' === number) {
	            return Number.NEGATIVE_INFINITY;
	        } else if ('+Inf' === number || 'Inf' === number) {
	            return Number.POSITIVE_INFINITY;
	        }

	        return parseInt(number, 10);
	    }

	    /**
	     * The logic comes from the Symfony2 PHP Framework.
	     *
	     * Returns the plural position to use for the given locale and number.
	     *
	     * @param {Number} number  The number to use to find the indice of the message
	     * @param {String} locale  The locale
	     * @return {Number}        The plural position
	     * @api private
	     */
	    function plural_position(number, locale) {
	        var _locale = locale;

	        if ('pt_BR' === _locale) {
	            _locale = 'xbr';
	        }

	        if (_locale.length > 3) {
	            _locale = _locale.split('_')[0];
	        }

	        switch (_locale) {
	            case 'bo':
	            case 'dz':
	            case 'id':
	            case 'ja':
	            case 'jv':
	            case 'ka':
	            case 'km':
	            case 'kn':
	            case 'ko':
	            case 'ms':
	            case 'th':
	            case 'tr':
	            case 'vi':
	            case 'zh':
	                return 0;
	            case 'af':
	            case 'az':
	            case 'bn':
	            case 'bg':
	            case 'ca':
	            case 'da':
	            case 'de':
	            case 'el':
	            case 'en':
	            case 'eo':
	            case 'es':
	            case 'et':
	            case 'eu':
	            case 'fa':
	            case 'fi':
	            case 'fo':
	            case 'fur':
	            case 'fy':
	            case 'gl':
	            case 'gu':
	            case 'ha':
	            case 'he':
	            case 'hu':
	            case 'is':
	            case 'it':
	            case 'ku':
	            case 'lb':
	            case 'ml':
	            case 'mn':
	            case 'mr':
	            case 'nah':
	            case 'nb':
	            case 'ne':
	            case 'nl':
	            case 'nn':
	            case 'no':
	            case 'om':
	            case 'or':
	            case 'pa':
	            case 'pap':
	            case 'ps':
	            case 'pt':
	            case 'so':
	            case 'sq':
	            case 'sv':
	            case 'sw':
	            case 'ta':
	            case 'te':
	            case 'tk':
	            case 'ur':
	            case 'zu':
	                return (number == 1) ? 0 : 1;

	            case 'am':
	            case 'bh':
	            case 'fil':
	            case 'fr':
	            case 'gun':
	            case 'hi':
	            case 'ln':
	            case 'mg':
	            case 'nso':
	            case 'xbr':
	            case 'ti':
	            case 'wa':
	                return ((number === 0) || (number == 1)) ? 0 : 1;

	            case 'be':
	            case 'bs':
	            case 'hr':
	            case 'ru':
	            case 'sr':
	            case 'uk':
	                return ((number % 10 == 1) && (number % 100 != 11)) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);

	            case 'cs':
	            case 'sk':
	                return (number == 1) ? 0 : (((number >= 2) && (number <= 4)) ? 1 : 2);

	            case 'ga':
	                return (number == 1) ? 0 : ((number == 2) ? 1 : 2);

	            case 'lt':
	                return ((number % 10 == 1) && (number % 100 != 11)) ? 0 : (((number % 10 >= 2) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);

	            case 'sl':
	                return (number % 100 == 1) ? 0 : ((number % 100 == 2) ? 1 : (((number % 100 == 3) || (number % 100 == 4)) ? 2 : 3));

	            case 'mk':
	                return (number % 10 == 1) ? 0 : 1;

	            case 'mt':
	                return (number == 1) ? 0 : (((number === 0) || ((number % 100 > 1) && (number % 100 < 11))) ? 1 : (((number % 100 > 10) && (number % 100 < 20)) ? 2 : 3));

	            case 'lv':
	                return (number === 0) ? 0 : (((number % 10 == 1) && (number % 100 != 11)) ? 1 : 2);

	            case 'pl':
	                return (number == 1) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 12) || (number % 100 > 14))) ? 1 : 2);

	            case 'cy':
	                return (number == 1) ? 0 : ((number == 2) ? 1 : (((number == 8) || (number == 11)) ? 2 : 3));

	            case 'ro':
	                return (number == 1) ? 0 : (((number === 0) || ((number % 100 > 0) && (number % 100 < 20))) ? 1 : 2);

	            case 'ar':
	                return (number === 0) ? 0 : ((number == 1) ? 1 : ((number == 2) ? 2 : (((number >= 3) && (number <= 10)) ? 3 : (((number >= 11) && (number <= 99)) ? 4 : 5))));

	            default:
	                return 0;
	        }
	    }

	    /**
	     * @type {Array}        An array
	     * @type {String}       An element to compare
	     * @return {Boolean}    Return `true` if `array` contains `element`,
	     *                      `false` otherwise
	     * @api private
	     */
	    function exists(array, element) {
	        for (var i = 0; i < array.length; i++) {
	            if (element === array[i]) {
	                return true;
	            }
	        }

	        return false;
	    }

	    /**
	     * Get the current application's locale based on the `lang` attribute
	     * on the `html` tag.
	     *
	     * @return {String}     The current application's locale
	     * @api private
	     */
	    function get_current_locale() {
	        return document.documentElement.lang.replace('-', '_');
	    }

	    return {
	        /**
	         * The current locale.
	         *
	         * @type {String}
	         * @api public
	         */
	        locale: get_current_locale(),

	        /**
	         * Fallback locale.
	         *
	         * @type {String}
	         * @api public
	         */
	        fallback: null,

	        /**
	         * Placeholder prefix.
	         *
	         * @type {String}
	         * @api public
	         */
	        placeHolderPrefix: '%',

	        /**
	         * Placeholder suffix.
	         *
	         * @type {String}
	         * @api public
	         */
	        placeHolderSuffix: '%',

	        /**
	         * Default domain.
	         *
	         * @type {String}
	         * @api public
	         */
	        defaultDomain: 'messages',

	        /**
	         * Plurar separator.
	         *
	         * @type {String}
	         * @api public
	         */
	        pluralSeparator: '|',

	        /**
	         * Adds a translation entry.
	         *
	         * @param {String} id       The message id
	         * @param {String} message  The message to register for the given id
	         * @param {String} domain   The domain for the message or null to use the default
	         * @param {String} locale   The locale or null to use the default
	         * @return {Object}         Translator
	         * @api public
	         */
	        add: function (id, message, domain, locale) {
	            var _locale = locale || this.locale || this.fallback,
	                _domain = domain || this.defaultDomain;

	            if (!_messages[_locale]) {
	                _messages[_locale] = {};
	            }

	            if (!_messages[_locale][_domain]) {
	                _messages[_locale][_domain] = {};
	            }

	            _messages[_locale][_domain][id] = message;

	            if (false === exists(_domains, _domain)) {
	                _domains.push(_domain);
	            }

	            return this;
	        },


	        /**
	         * Translates the given message.
	         *
	         * @param {String} id             The message id
	         * @param {Object} parameters     An array of parameters for the message
	         * @param {String} domain         The domain for the message or null to guess it
	         * @param {String} locale         The locale or null to use the default
	         * @return {String}               The translated string
	         * @api public
	         */
	        trans: function (id, parameters, domain, locale) {
	            var _message = get_message(
	                id,
	                domain,
	                locale,
	                this.locale,
	                this.fallback
	            );

	            return replace_placeholders(_message, parameters || {});
	        },

	        /**
	         * Translates the given choice message by choosing a translation according to a number.
	         *
	         * @param {String} id             The message id
	         * @param {Number} number         The number to use to find the indice of the message
	         * @param {Object} parameters     An array of parameters for the message
	         * @param {String} domain         The domain for the message or null to guess it
	         * @param {String} locale         The locale or null to use the default
	         * @return {String}               The translated string
	         * @api public
	         */
	        transChoice: function (id, number, parameters, domain, locale) {
	            var _message = get_message(
	                id,
	                domain,
	                locale,
	                this.locale,
	                this.fallback
	            );

	            var _number = parseInt(number, 10) || 0;

	            if (undefined != _message) {
	                _message = pluralize(
	                    _message,
	                    _number,
	                    locale || this.locale || this.fallback
	                );
	            }

	            return replace_placeholders(_message, parameters || {});
	        },

	        /**
	         * Loads translations from JSON.
	         *
	         * @param {String} data     A JSON string or object literal
	         * @return {Object}         Translator
	         * @api public
	         */
	        fromJSON: function (data) {
	            if (typeof data === 'string') {
	                data = JSON.parse(data);
	            }

	            if (data.locale) {
	                this.locale = data.locale;
	            }

	            if (data.fallback) {
	                this.fallback = data.fallback;
	            }

	            if (data.defaultDomain) {
	                this.defaultDomain = data.defaultDomain;
	            }

	            if (data.translations) {
	                for (var locale in data.translations) {
	                    for (var domain in data.translations[locale]) {
	                        for (var id in data.translations[locale][domain]) {
	                            this.add(id, data.translations[locale][domain][id], domain, locale);
	                        }
	                    }
	                }
	            }

	            return this;
	        },

	        /**
	         * @api public
	         */
	        reset: function () {
	            _messages   = {};
	            _domains    = [];
	            this.locale = get_current_locale();
	        }
	    };

	})(document, undefined);

	module.exports = function (Vue) {

	    Vue.prototype.$trans = Translator.trans.bind(Translator);
	    Vue.prototype.$transChoice = Translator.transChoice.bind(Translator);

	    Object.defineProperty(Vue.prototype, '$locale', {

	        get: function () {
	            return config;
	        },

	        set: function (locale) {
	            config = locale;
	            Translator.fromJSON(locale);
	            Translator.locale = locale.locale;
	        }

	    });

	    Vue.prototype.$locale = config;
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = function (Vue) {

	    Vue.filter('baseUrl', function (url) {
	        return _.startsWith(url, Vue.url.options.root) ? url.substr(Vue.url.options.root.length) : url;
	    });

	    Vue.filter('trans', function (id, parameters, domain, locale) {
	        return this.$trans(id, parameters, domain, locale);
	    });

	    Vue.filter('transChoice', function (id, number, parameters, domain, locale) {
	        return this.$transChoice(id, number, parameters, domain, locale);
	    });

	    Vue.filter('trim', {

	        write: function (value) {
	            return value.trim();
	        }

	    });

	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(48)
	__vue_template__ = __webpack_require__(49)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/app/components/loader.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <svg class="pk-loader" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
	//         <g><circle cx="0" cy="0" r="13" fill="none" stroke-width="1"/></g>
	//     </svg>
	//
	// </template>
	//
	// <script>

	module.exports = {
	    name: 'loader'
	};

	// </script>
	//

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "\n\n    <svg class=\"pk-loader\" width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\">\n        <g><circle cx=\"0\" cy=\"0\" r=\"13\" fill=\"none\" stroke-width=\"1\"/></g>\n    </svg>\n\n";

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(51)
	__vue_template__ = __webpack_require__(52)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/app/components/modal.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-modal">
	//         <div class="uk-modal-dialog" :class="classes">
	//             <div v-if="opened">
	//                 <slot></slot>
	//             </div>
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    data: function data() {
	        return {
	            opened: false
	        };
	    },

	    props: {
	        large: Boolean,
	        lightbox: Boolean,
	        closed: Function,
	        modifier: { type: String, default: '' },
	        options: { type: Object, default: function _default() {
	                return {};
	            } }
	    },

	    ready: function ready() {

	        var vm = this;

	        this.$appendTo('body');

	        this.modal = UIkit.modal(this.$el, _.extend({ modal: false }, this.options));
	        this.modal.on('hide.uk.modal', function () {

	            vm.opened = false;

	            if (vm.closed) {
	                vm.closed();
	            }
	        });

	        this.modal.on('show.uk.modal', function () {

	            // catch .uk-overflow-container
	            setTimeout(function () {
	                vm.modal.resize();
	            }, 250);
	        });
	    },

	    computed: {

	        classes: function classes() {
	            var classes = this.modifier.split(' ');

	            if (this.large) {
	                classes.push('uk-modal-dialog-large');
	            }

	            if (this.lightbox) {
	                classes.push('uk-modal-dialog-lightbox');
	            }

	            return classes;
	        }

	    },

	    methods: {

	        open: function open() {
	            this.opened = true;
	            this.modal.show();
	        },

	        close: function close() {
	            this.modal.hide();
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-modal\">\n        <div class=\"uk-modal-dialog\" :class=\"classes\">\n            <div v-if=\"opened\">\n                <slot></slot>\n            </div>\n        </div>\n    </div>\n\n";

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = {

	    template: '<ul class="uk-pagination"></ul>',

	    props: {
	        page: {
	            type: Number,
	            default: 0
	        },

	        pages: {
	            type: Number,
	            default: 1
	        }
	    },

	    ready: function() {

	        var vm = this;

	        this.pagination = UIkit.pagination(this.$el, { pages: this.pages, currentPage: this.page });

	        this.pagination.on('select.uk.pagination', function(e, page) {
	            vm.$set('page', page);
	        });

	    },

	    watch: {

	        page: function(page) {
	            this.pagination.selectPage(page);
	        },

	        pages: function(pages) {
	            this.pagination.render(pages);
	        }

	    }

	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(55)
	__vue_template__ = __webpack_require__(56)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/app/components/input-filter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-select pk-filter">
	//         <span>{{ label }}</span>
	//         <select v-if="isNumber" v-model="value" number>
	//             <template v-for="option in list">
	//                 <optgroup :label="option.label" v-if="option.label">
	//                     <option v-for="opt in option.options" :value="opt.value">{{ opt.text }}</option>
	//                 </optgroup>
	//                 <option :value="option.value" v-else>{{ option.text }}</option>
	//             </template>
	//         </select>
	//         <select v-else v-model="value">
	//             <template v-for="option in list">
	//                 <optgroup :label="option.label" v-if="option.label">
	//                     <option v-for="opt in option.options" :value="opt.value">{{ opt.text }}</option>
	//                 </optgroup>
	//                 <option :value="option.value" v-else>{{ option.text }}</option>
	//             </template>
	//         </select>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['title', 'value', 'options', 'number'],

	    created: function created() {
	        if (this.value === undefined) {
	            this.value = '';
	        }
	    },

	    computed: {

	        isNumber: function isNumber() {
	            return this.number !== undefined;
	        },

	        list: function list() {
	            return [{ value: '', text: this.title }].concat(this.options);
	        },

	        label: function label() {
	            var list = this.list.concat(_.flatten(_.pluck(this.list, 'options')));
	            var value = _.find(list, 'value', this.value);
	            return value ? value.text : this.title;
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form-select pk-filter\">\n        <span>{{ label }}</span>\n        <select v-if=\"isNumber\" v-model=\"value\" number>\n            <template v-for=\"option in list\">\n                <optgroup :label=\"option.label\" v-if=\"option.label\">\n                    <option v-for=\"opt in option.options\" :value=\"opt.value\">{{ opt.text }}</option>\n                </optgroup>\n                <option :value=\"option.value\" v-else>{{ option.text }}</option>\n            </template>\n        </select>\n        <select v-else v-model=\"value\">\n            <template v-for=\"option in list\">\n                <optgroup :label=\"option.label\" v-if=\"option.label\">\n                    <option v-for=\"opt in option.options\" :value=\"opt.value\">{{ opt.text }}</option>\n                </optgroup>\n                <option :value=\"option.value\" v-else>{{ option.text }}</option>\n            </template>\n        </select>\n    </div>\n\n";

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(58)
	__vue_template__ = __webpack_require__(59)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/app/components/input-date.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-grid uk-grid-small" data-uk-grid-margin>
	//         <div class="uk-width-large-1-2">
	//             <div class="uk-form-icon uk-display-block">
	//                 <i class="pk-icon-calendar pk-icon-muted"></i>
	//                 <input class="uk-width-1-1" type="text" v-el:datepicker v-model="date" v-validate:required="isRequired" lazy>
	//             </div>
	//         </div>
	//         <div class="uk-width-large-1-2">
	//             <div class="uk-form-icon uk-display-block" v-el:timepicker>
	//                 <i class="pk-icon-time pk-icon-muted"></i>
	//                 <input class="uk-width-1-1" type="text" v-model="time" v-validate:required="isRequired" lazy>
	//             </div>
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['datetime', 'required'],

	    ready: function ready() {
	        UIkit.datepicker(this.$els.datepicker, { format: this.dateFormat, pos: 'bottom' });
	        UIkit.timepicker(this.$els.timepicker, { format: this.clockFormat });
	    },

	    computed: {

	        dateFormat: function dateFormat() {
	            return window.$locale.DATETIME_FORMATS.shortDate.replace(/\bd\b/i, 'DD').replace(/\bm\b/i, 'MM').replace(/\by\b/i, 'YYYY').toUpperCase();
	        },

	        timeFormat: function timeFormat() {
	            return window.$locale.DATETIME_FORMATS.shortTime.replace(/\bh\b/i, 'hh');
	        },

	        clockFormat: function clockFormat() {
	            return this.timeFormat.match(/a/) ? '12h' : '24h';
	        },

	        date: {

	            get: function get() {
	                return UIkit.Utils.moment(this.datetime).format(this.dateFormat);
	            },

	            set: function set(date) {
	                var prev = new Date(this.datetime);
	                date = UIkit.Utils.moment(date, this.dateFormat);
	                date.hours(prev.getHours());
	                date.minutes(prev.getMinutes());
	                this.$set('datetime', date.utc().format());
	            }

	        },

	        time: {

	            get: function get() {
	                return UIkit.Utils.moment(this.datetime).format(this.timeFormat);
	            },

	            set: function set(time) {
	                var date = new Date(this.datetime);
	                time = UIkit.Utils.moment(time, this.timeFormat);
	                date.setHours(time.hours(), time.minutes());
	                this.$set('datetime', date.toISOString());
	            }

	        },

	        isRequired: function isRequired() {
	            return this.required !== undefined;
	        }

	    }

	};

	Vue.component('input-date', function (resolve, reject) {
	    Vue.asset({
	        js: ['app/assets/uikit/js/components/autocomplete.min.js', 'app/assets/uikit/js/components/datepicker.min.js', 'app/assets/uikit/js/components/timepicker.min.js']
	    }).then(function () {
	        resolve(module.exports);
	    });
	});

	// </script>
	//

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-grid uk-grid-small\" data-uk-grid-margin>\n        <div class=\"uk-width-large-1-2\">\n            <div class=\"uk-form-icon uk-display-block\">\n                <i class=\"pk-icon-calendar pk-icon-muted\"></i>\n                <input class=\"uk-width-1-1\" type=\"text\" v-el:datepicker v-model=\"date\" v-validate:required=\"isRequired\" lazy>\n            </div>\n        </div>\n        <div class=\"uk-width-large-1-2\">\n            <div class=\"uk-form-icon uk-display-block\" v-el:timepicker>\n                <i class=\"pk-icon-time pk-icon-muted\"></i>\n                <input class=\"uk-width-1-1\" type=\"text\" v-model=\"time\" v-validate:required=\"isRequired\" lazy>\n            </div>\n        </div>\n    </div>\n\n";

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(61)
	__vue_template__ = __webpack_require__(62)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/app/components/input-image.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <a class="uk-placeholder uk-text-center uk-display-block uk-margin-remove" v-if="!source" @click.prevent="pick">
	//         <img width="60" height="60" :alt="'Placeholder Image' | trans" :src="$url('app/system/assets/images/placeholder-image.svg')">
	//         <p class="uk-text-muted uk-margin-small-top">{{ 'Select Image' | trans }}</p>
	//     </a>
	//
	//     <div class="uk-overlay uk-overlay-hover uk-visible-hover {{ class }}" v-else>
	//
	//         <img :src="$url(source)">
	//
	//         <div class="uk-overlay-panel uk-overlay-background uk-overlay-fade"></div>
	//
	//         <a class="uk-position-cover" @click.prevent="pick"></a>
	//
	//         <div class="uk-panel-badge pk-panel-badge uk-hidden">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a></li>
	//             </ul>
	//         </div>
	//
	//     </div>
	//
	//     <v-modal v-ref:modal large>
	//
	//         <panel-finder :root="storage" v-ref:finder :modal="true"></panel-finder>
	//
	//         <div class="uk-modal-footer uk-text-right">
	//             <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//             <button class="uk-button uk-button-primary" type="button" :disabled="!hasSelection()" @click.prevent="select">{{ 'Select' | trans }}</button>
	//         </div>
	//
	//     </v-modal>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: {
	        class: { default: '' },
	        source: { default: '' }
	    },

	    data: function data() {
	        return _.merge({}, $pagekit);
	    },

	    methods: {

	        pick: function pick() {
	            this.$refs.modal.open();
	        },

	        select: function select() {
	            this.source = this.$refs.finder.getSelected()[0];
	            this.$dispatch('image-selected', this.source);
	            this.$refs.finder.removeSelection();
	            this.$refs.modal.close();
	        },

	        remove: function remove() {
	            this.source = '';
	        },

	        hasSelection: function hasSelection() {
	            var selected = this.$refs.finder.getSelected();
	            return selected.length === 1 && this.$refs.finder.isImage(selected[0]);
	        }

	    }

	};

	Vue.component('input-image', function (resolve, reject) {
	    Vue.asset({
	        js: ['app/assets/uikit/js/components/upload.min.js', 'app/system/modules/finder/app/bundle/panel-finder.js']
	    }).then(function () {
	        resolve(module.exports);
	    });
	});

	// </script>
	//

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "\n\n    <a class=\"uk-placeholder uk-text-center uk-display-block uk-margin-remove\" v-if=\"!source\" @click.prevent=\"pick\">\n        <img width=\"60\" height=\"60\" :alt=\"'Placeholder Image' | trans\" :src=\"$url('app/system/assets/images/placeholder-image.svg')\">\n        <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Select Image' | trans }}</p>\n    </a>\n\n    <div class=\"uk-overlay uk-overlay-hover uk-visible-hover {{ class }}\" v-else>\n\n        <img :src=\"$url(source)\">\n\n        <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n        <a class=\"uk-position-cover\" @click.prevent=\"pick\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n    <v-modal v-ref:modal large>\n\n        <panel-finder :root=\"storage\" v-ref:finder :modal=\"true\"></panel-finder>\n\n        <div class=\"uk-modal-footer uk-text-right\">\n            <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n            <button class=\"uk-button uk-button-primary\" type=\"button\" :disabled=\"!hasSelection()\" @click.prevent=\"select\">{{ 'Select' | trans }}</button>\n        </div>\n\n    </v-modal>\n\n";

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(64)
	__vue_template__ = __webpack_require__(65)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/app/components/input-image-meta.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <a class="uk-placeholder uk-text-center uk-display-block uk-margin-remove" v-if="!image.src" @click.prevent="pick">
	//         <img width="60" height="60" :alt="'Placeholder Image' | trans" :src="$url('app/system/assets/images/placeholder-image.svg')">
	//
	//         <p class="uk-text-muted uk-margin-small-top">{{ 'Add Image' | trans }}</p>
	//     </a>
	//
	//     <div class="uk-overlay uk-overlay-hover uk-visible-hover {{ class }}" v-else>
	//
	//         <img :src="$url(image.src)">
	//
	//         <div class="uk-overlay-panel uk-overlay-background uk-overlay-fade"></div>
	//
	//         <a class="uk-position-cover" @click.prevent="pick"></a>
	//
	//         <div class="uk-panel-badge pk-panel-badge uk-hidden">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li>
	//                     <a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a>
	//                 </li>
	//             </ul>
	//         </div>
	//
	//     </div>
	//
	//     <v-modal v-ref:modal>
	//         <form class="uk-form uk-form-stacked" @submit="update">
	//
	//             <div class="uk-modal-header">
	//                 <h2>{{ 'Image' | trans }}</h2>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <input-image :source.sync="img.src"></input-image>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <label for="form-src" class="uk-form-label">{{ 'URL' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-src" class="uk-width-1-1" type="text" v-model="img.src" lazy>
	//                 </div>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <label for="form-alt" class="uk-form-label">{{ 'Alt' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-alt" class="uk-width-1-1" type="text" v-model="img.alt">
	//                 </div>
	//             </div>
	//
	//             <div class="uk-modal-footer uk-text-right">
	//                 <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//                 <button class="uk-button uk-button-link" type="button" @click.prevent="update">{{ 'Update' | trans }}</button>
	//             </div>
	//
	//         </form>
	//     </v-modal>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: {
	        class: {
	            type: String,
	            default: ''
	        },
	        image: Object
	    },

	    data: function data() {
	        return _.merge({ img: {} }, $pagekit);
	    },

	    ready: function ready() {

	        this.$set('image', this.image || { src: '', alt: '' });
	        this.$set('img', _.extend({}, this.image));

	        this.$on('image-selected', function (path) {

	            if (path && !this.img.alt) {

	                var alt = path.split('/').slice(-1)[0].replace(/\.(jpeg|jpg|png|svg|gif)$/i, '').replace(/(_|-)/g, ' ').trim(),
	                    first = alt.charAt(0).toUpperCase();

	                this.img.alt = first + alt.substr(1);
	            }
	        });
	    },

	    methods: {

	        pick: function pick() {
	            this.img.src = this.image.src;
	            this.img.alt = this.image.alt;
	            this.$refs.modal.open();
	        },

	        update: function update() {
	            this.image.src = this.img.src;
	            this.image.alt = this.img.alt;
	            this.$refs.modal.close();
	        },

	        remove: function remove() {
	            this.img.src = '';
	            this.image.src = '';
	        }
	    }

	};

	Vue.component('input-image-meta', function (resolve, reject) {
	    Vue.asset({
	        js: ['app/assets/uikit/js/components/upload.min.js', 'app/system/modules/finder/app/bundle/panel-finder.js']
	    }).then(function () {
	        resolve(module.exports);
	    });
	});

	// </script>
	//

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "\n\n    <a class=\"uk-placeholder uk-text-center uk-display-block uk-margin-remove\" v-if=\"!image.src\" @click.prevent=\"pick\">\n        <img width=\"60\" height=\"60\" :alt=\"'Placeholder Image' | trans\" :src=\"$url('app/system/assets/images/placeholder-image.svg')\">\n\n        <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Add Image' | trans }}</p>\n    </a>\n\n    <div class=\"uk-overlay uk-overlay-hover uk-visible-hover {{ class }}\" v-else>\n\n        <img :src=\"$url(image.src)\">\n\n        <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n        <a class=\"uk-position-cover\" @click.prevent=\"pick\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li>\n                    <a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a>\n                </li>\n            </ul>\n        </div>\n\n    </div>\n\n    <v-modal v-ref:modal>\n        <form class=\"uk-form uk-form-stacked\" @submit=\"update\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Image' | trans }}</h2>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <input-image :source.sync=\"img.src\"></input-image>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-src\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-src\" class=\"uk-width-1-1\" type=\"text\" v-model=\"img.src\" lazy>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-alt\" class=\"uk-form-label\">{{ 'Alt' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-alt\" class=\"uk-width-1-1\" type=\"text\" v-model=\"img.alt\">\n                </div>\n            </div>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" type=\"button\" @click.prevent=\"update\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </form>\n    </v-modal>\n\n";

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(67)
	__vue_template__ = __webpack_require__(68)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/app/components/input-video.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <a class="uk-placeholder uk-text-center uk-display-block uk-margin-remove" v-if="!source" @click.prevent="pick">
	//         <img width="60" height="60" :alt="'Placeholder Image' | trans" :src="$url('app/system/assets/images/placeholder-video.svg')">
	//         <p class="uk-text-muted uk-margin-small-top">{{ 'Select Video' | trans }}</p>
	//     </a>
	//
	//     <div class="uk-overlay uk-overlay-hover uk-visible-hover" v-else>
	//
	//         <img :src="image" v-if="image">
	//         <video class="uk-width-1-1" :src="video" v-if="video"></video>
	//
	//         <div class="uk-overlay-panel uk-overlay-background uk-overlay-fade"></div>
	//
	//         <a class="uk-position-cover" @click.prevent="pick"></a>
	//
	//         <div class="uk-panel-badge pk-panel-badge uk-hidden">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a></li>
	//             </ul>
	//         </div>
	//
	//     </div>
	//
	//     <v-modal v-ref:modal large>
	//
	//         <panel-finder :root="storage" :modal="true" v-ref:finder></panel-finder>
	//
	//         <div class="uk-modal-footer uk-text-right">
	//             <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//             <button class="uk-button uk-button-primary" type="button" :disabled="!selectButton" @click.prevent="select">{{ 'Select' | trans }}</button>
	//         </div>
	//
	//     </v-modal>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['source'],

	    data: function data() {
	        return _.merge({ image: undefined, video: undefined }, $pagekit);
	    },

	    computed: {

	        selectButton: function selectButton() {
	            var selected = this.$refs.finder.getSelected();
	            return selected.length === 1 && this.$refs.finder.isVideo(selected[0]);
	        }

	    },

	    watch: {
	        source: {
	            handler: 'update',
	            immediate: true
	        }
	    },

	    methods: {

	        pick: function pick() {
	            this.$refs.modal.open();
	        },

	        select: function select() {
	            this.source = this.$refs.finder.getSelected()[0];
	            this.$refs.modal.close();
	        },

	        remove: function remove() {
	            this.source = '';
	        },

	        update: function update(src) {

	            var matches;

	            this.$set('image', undefined);
	            this.$set('video', undefined);

	            if (matches = src.match(/(?:\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/) || src.match(/youtu\.be\/(.*)/)) {

	                this.image = '//img.youtube.com/vi/' + matches[1] + '/hqdefault.jpg';
	            } else if (src.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/)) {

	                var id = btoa(src);

	                if (this.$session[id]) {

	                    this.image = this.$session[id];
	                } else {

	                    this.$http.get('http://vimeo.com/api/oembed.json', { url: src }).then(function (res) {
	                        var data = res.data;
	                        this.image = this.$session[id] = data.thumbnail_url;
	                    });
	                }
	            } else {

	                this.video = this.$url(src);
	            }
	        }

	    }

	};

	Vue.component('input-video', function (resolve, reject) {
	    Vue.asset({
	        js: ['app/assets/uikit/js/components/upload.min.js', 'app/system/modules/finder/app/bundle/panel-finder.js']
	    }).then(function () {
	        resolve(module.exports);
	    });
	});

	// </script>
	//

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "\n\n    <a class=\"uk-placeholder uk-text-center uk-display-block uk-margin-remove\" v-if=\"!source\" @click.prevent=\"pick\">\n        <img width=\"60\" height=\"60\" :alt=\"'Placeholder Image' | trans\" :src=\"$url('app/system/assets/images/placeholder-video.svg')\">\n        <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Select Video' | trans }}</p>\n    </a>\n\n    <div class=\"uk-overlay uk-overlay-hover uk-visible-hover\" v-else>\n\n        <img :src=\"image\" v-if=\"image\">\n        <video class=\"uk-width-1-1\" :src=\"video\" v-if=\"video\"></video>\n\n        <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n        <a class=\"uk-position-cover\" @click.prevent=\"pick\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n    <v-modal v-ref:modal large>\n\n        <panel-finder :root=\"storage\" :modal=\"true\" v-ref:finder></panel-finder>\n\n        <div class=\"uk-modal-footer uk-text-right\">\n            <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n            <button class=\"uk-button uk-button-primary\" type=\"button\" :disabled=\"!selectButton\" @click.prevent=\"select\">{{ 'Select' | trans }}</button>\n        </div>\n\n    </v-modal>\n\n";

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = {

	    update: function (selector) {

	        var self = this, keypath = this.arg;

	        this.selector = selector;
	        this.$el = this.vm.$el;
	        this.checked = false;
	        this.number = this.el.getAttribute('number') !== null;

	        $(this.el).on('change.check-all', function () {
	            $(selector, self.$el).prop('checked', $(this).prop('checked'));
	            self.selected(true);
	        });

	        this.handler = [
	            function () {
	                self.selected(true);
	                self.state();
	            },
	            function (e) {
	                if (!$(e.target).is(':input, a') && !window.getSelection().toString()) {
	                    $(this).find(selector).trigger('click');
	                }
	            }
	        ];

	        $(this.$el).on('change.check-all', selector, this.handler[0]);
	        $(this.$el).on('click.check-all', '.check-item', this.handler[1]);

	        this.unbindWatcher = this.vm.$watch(keypath, function (selected) {

	            $(selector, this.$el).prop('checked', function () {
	                return selected.indexOf(self.toNumber($(this).val())) !== -1;
	            });

	            self.selected();
	            self.state();
	        });
	    },

	    unbind: function () {

	        var self = this;

	        $(this.el).off('.check-all');

	        if (this.handler) {
	            this.handler.forEach(function (handler) {
	                $(self.$el).off('.check-all', handler);
	            });
	        }

	        if (this.unbindWatcher) {
	            this.unbindWatcher();
	        }
	    },

	    state: function () {

	        var el = $(this.el);

	        if (this.checked === undefined) {
	            el.prop('indeterminate', true);
	        } else {
	            el.prop('checked', this.checked).prop('indeterminate', false);
	        }

	    },

	    selected: function (update) {

	        var self = this, keypath = this.arg, selected = [], values = [], value;

	        $(this.selector, this.$el).each(function () {

	            value = self.toNumber($(this).val());
	            values.push(value);

	            if ($(this).prop('checked')) {
	                selected.push(value);
	            }
	        });

	        if (update) {

	            update = this.vm.$get(keypath).filter(function (value) {
	                return values.indexOf(value) === -1;
	            });

	            this.vm.$set(keypath, update.concat(selected));
	        }

	        if (selected.length === 0) {
	            this.checked = false;
	        } else if (selected.length == values.length) {
	            this.checked = true;
	        } else {
	            this.checked = undefined;
	        }

	    },

	    toNumber: function (value) {
	        return this.number ? Number(value) : value;
	    }

	};


/***/ },
/* 70 */
/***/ function(module, exports) {

	var _ = Vue.util;

	module.exports = {

	    priority: 500,

	    bind: function () {

	        var self = this, el = this.el, buttons = (_.getAttr(el, 'buttons') || '').split(',');

	        this.options = {
	            title: false,
	            labels: {
	                Ok: buttons[0] || this.vm.$trans('Ok'),
	                Cancel: buttons[1] || this.vm.$trans('Cancel')
	            }
	        };

	        this.dirs = this.vm._directives.filter(function (dir) {
	            return dir.name == 'on' && dir.el === el;
	        });

	        this.dirs.forEach(function (dir) {

	            _.off(dir.el, dir.arg, dir.handler);
	            _.on(dir.el, dir.arg, function (e) {
	                UIkit.modal.confirm(self.vm.$trans(self.options.text), function () {
	                    dir.handler(e);
	                }, self.options);
	            });

	        });
	    },

	    update: function (value) {

	        // vue-confirm="'Title':'Text...?'"
	        if (this.arg) {
	            this.options.title = this.arg;
	        }

	        // vue-confirm="'Text...?'"
	        if (typeof value === 'string') {
	            this.options.text = value;
	        }

	        // vue-confirm="{title:'Title', text:'Text...?'}"
	        if (typeof value === 'object') {
	            this.options = _.extend(this.options, value);
	        }
	    },

	    unbind: function () {
	        this.dirs.forEach(function (dir) {
	            try {
	                _.off(dir.el, dir.arg, dir.handler);
	            } catch (e) {
	            }
	        });
	    }

	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var md5 = __webpack_require__(72);

	module.exports = {

	    priority: 100,

	    params: ['colored'],

	    update: function (value) {

	        var el = this.el, vm = this, cache = this.vm.$session, img = new Image(),
	            name = this.el.getAttribute('title') || this.el.getAttribute('alt'),
	            colored = this.params.colored,
	            size = this.el.getAttribute('height') || 50,
	            url = '//gravatar.com/avatar/' + md5(value) + '?' + ['r=g', 's=' + (size * 2)].join('&'),
	            key = 'gravatar.' + [url, colored, name, size].join('.');

	        // load image url from cache if exists
	        if (cache[key]) {
	            el.setAttribute('src', cache[key]);
	            return;
	        }

	        cache[key] = vm.letterAvatar(name, size, colored);
	        el.setAttribute('src', cache[key]);

	        if (img.crossOrigin !== undefined) {

	            img.crossOrigin = 'anonymous';
	            url += '&d=blank';
	            img.onload = function () {
	                cache[key] = vm.letterAvatar(name, size, colored, img);
	                el.setAttribute('src', cache[key]);
	                el.classList.remove('uk-invisible');
	            };

	        } else {

	            // IE Fallback (no CORS support for img):
	            url += '&d=404';
	            img.onload = function () {
	                delete cache[key]; // remove dummy image from cache
	                el.setAttribute('src', url);
	                el.classList.remove('uk-invisible');
	            };

	        }

	        img.src = url;
	    },

	    letterAvatar: function (name, size, colored, img) {
	        name = name || '';
	        size = size || 60;

	        var colours = [
	                "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
	                "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
	            ],

	            nameSplit = String(name).toUpperCase().split(' '),
	            initials, charIndex, colourIndex, canvas, context, dataURI;


	        if (nameSplit.length == 1) {
	            initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
	        } else {
	            initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
	        }

	        if (window.devicePixelRatio) {
	            size = (size * window.devicePixelRatio);
	        }

	        charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
	        colourIndex = charIndex % 20;
	        canvas = document.createElement('canvas');
	        canvas.width = size;
	        canvas.height = size;
	        context = canvas.getContext("2d");

	        context.fillStyle = colored ? colours[colourIndex - 1] : '#cfd2d7';
	        context.fillRect(0, 0, canvas.width, canvas.height);
	        context.font = Math.round(canvas.width / 2) + "px Arial";
	        context.textAlign = "center";
	        context.fillStyle = "#FFF";
	        context.fillText(initials, size / 2, size / 1.5);

	        if (img) {
	            context.drawImage(img, 0, 0, size, size);
	        }

	        dataURI = canvas.toDataURL();
	        canvas = null;

	        return dataURI;
	    }

	};


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)} true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return t}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a.md5=t}(this);

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = {

	    bind: function () {

	        var self = this;

	        this.dir       = '';
	        this.active    = false;
	        this.indicator = $('<i class="uk-icon-justify uk-margin-small-left"></i>');

	        $(this.el).addClass('pk-table-order uk-visible-hover-inline').on('click.order', function (){

	            self.dir = (self.dir == 'asc') ? 'desc':'asc';
	            self.vm.$set(self.expression, [self.arg, self.dir].join(' '));

	        }).append(this.indicator);
	    },

	    update: function (data) {

	        var parts = data.split(' '),
	            field = parts[0],
	            dir   = parts[1] || 'asc';

	        this.indicator.removeClass('pk-icon-arrow-up pk-icon-arrow-down');

	        if (field == this.arg) {
	            this.active = true;
	            this.dir    = dir;

	            this.indicator.removeClass('uk-invisible').addClass(dir == 'asc' ? 'pk-icon-arrow-down':'pk-icon-arrow-up');
	        } else {
	            this.indicator.addClass('pk-icon-arrow-down uk-invisible');
	            this.active = false;
	            this.dir    = '';
	        }
	    },

	    unbind: function () {
	        $(this.el).removeClass('pk-table-order').off('.order');
	        this.indicator.remove();
	    }

	};


/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = {

	    update: function (value) {

	        var el = $(this.el), img = new Image();

	        img.onload = function() {
	            el.css('background-image', "url('"+value+"')");
	        };

	        img.src = encodeURI(value);
	    }

	};


/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = {

	    bind: function () {

	        this.cls = this.el.classList.contains('uk-grid') ? 'uk-grid-margin':'uk-margin-small-top';
	    },

	    update: function (data) {

	        var $el = $(this.el), cls = this.cls;

	        Vue.nextTick(function () {
	            UIkit.Utils.stackMargin($el.children(), {cls:cls});
	        });
	    }

	};


/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = {

	    bind: function () {
	        this.vm.$set(this.arg);
	    },

	    unbind: function () {
	        this.vm.$delete(this.arg);
	    },

	    update: function (value) {
	        this.vm.$set(this.arg, value);
	    }

	};


/***/ }
/******/ ]);