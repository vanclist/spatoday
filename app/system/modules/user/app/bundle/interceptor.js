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

	var modal = __webpack_require__(1);
	var mutex;

	Vue.http.interceptors.push(function () {

	    var options;

	    return {

	        request: function (request) {
	            options = _.clone(request);

	            return request;
	        },

	        response: function (response) {

	            if (response.status !== 401 || options.headers['X-LOGIN']) {
	               return response;
	            }

	            if (!mutex) {
	                mutex = new Vue(modal).promise.finally(function () {
	                    mutex = undefined;
	                });
	            }

	            return mutex.then(function () {
	                return Vue.http(options);
	            });

	        }

	    };

	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(2)
	__vue_template__ = __webpack_require__(3)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/user/app/components/modal-login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div>
	//         <v-modal v-ref:login>
	//
	//             <div class="uk-text-center">
	//
	//                 <img class="uk-margin" :src="$url('app/system/assets/images/pagekit-logo-text-black.svg')" alt="Pagekit">
	//
	//                 <p class="uk-text-danger">{{ 'Session expired. Please login again.' | trans }}</p>
	//
	//                 <form class="uk-form tm-form" @submit.prevent="login" v-el:login>
	//
	//                     <div class="uk-panel uk-panel-box">
	//
	//                         <div class="uk-form-row">
	//                             <input class="uk-form-large uk-width-1-1" type="text" name="credentials[username]" placeholder="{{ 'Username' | trans }}" autofocus v-model="credentials.username">
	//                         </div>
	//
	//                         <div class="uk-form-row">
	//                             <input class="uk-form-large uk-width-1-1" type="password" name="credentials[password]" placeholder="{{ 'Password' | trans }}" v-model="credentials.password" v-el:password>
	//                         </div>
	//
	//                         <p class="uk-form-row tm-panel-marginless-bottom">
	//                             <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">{{ 'Login' | trans }}</button>
	//                         </p>
	//
	//                     </div>
	//
	//                     <p>
	//                         <label class="uk-form"><input type="checkbox" v-model="remember"> {{ 'Remember Me' | trans }}</label>
	//                     </p>
	//
	//                 </form>
	//
	//             </div>
	//
	//         </v-modal>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    data: function data() {
	        return {
	            credentials: {},
	            remember: false
	        };
	    },

	    created: function created() {
	        this.$mount().$appendTo('body');
	        this.promise = this.$promise(function (fulfill, reject) {
	            this.fulfill = fulfill;
	            this.reject = reject;
	        });
	    },

	    ready: function ready() {
	        var vm = this;

	        this.$refs.login.open();
	        this.$refs.login.modal.on('hide.uk.modal', function () {
	            vm.reject();
	            vm.$destroy();
	        });
	    },

	    methods: {

	        login: function login() {

	            var login = function () {
	                return this.$http.post('user/authenticate', {
	                    credentials: this.credentials,
	                    _remember_me: this.remember
	                }, { headers: { 'X-LOGIN': true } });
	            }.bind(this);

	            login().then(null, function (res) {

	                if (res.data.csrf) {

	                    this.$cache.set('_csrf', res.data.csrf);
	                    return login();
	                }

	                return Vue.Promise.reject(res);
	            }).then(function (res) {

	                this.$cache.set('_csrf', res.data.csrf);
	                this.fulfill();
	                this.$refs.login.close();
	            }, function (res) {
	                this.$notify(res.data, 'danger');
	                this.$els.login.classList.remove('uk-animation-shake');
	                this.$nextTick(function () {
	                    this.$els.login.classList.add('uk-animation-shake');
	                });
	                this.$els.password.focus();
	            });
	        }

	    }

	};

	// </script>

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n        <v-modal v-ref:login>\n\n            <div class=\"uk-text-center\">\n\n                <img class=\"uk-margin\" :src=\"$url('app/system/assets/images/pagekit-logo-text-black.svg')\" alt=\"Pagekit\">\n\n                <p class=\"uk-text-danger\">{{ 'Session expired. Please login again.' | trans }}</p>\n\n                <form class=\"uk-form tm-form\" @submit.prevent=\"login\" v-el:login>\n\n                    <div class=\"uk-panel uk-panel-box\">\n\n                        <div class=\"uk-form-row\">\n                            <input class=\"uk-form-large uk-width-1-1\" type=\"text\" name=\"credentials[username]\" placeholder=\"{{ 'Username' | trans }}\" autofocus v-model=\"credentials.username\">\n                        </div>\n\n                        <div class=\"uk-form-row\">\n                            <input class=\"uk-form-large uk-width-1-1\" type=\"password\" name=\"credentials[password]\" placeholder=\"{{ 'Password' | trans }}\" v-model=\"credentials.password\" v-el:password>\n                        </div>\n\n                        <p class=\"uk-form-row tm-panel-marginless-bottom\">\n                            <button class=\"uk-button uk-button-primary uk-button-large uk-width-1-1\">{{ 'Login' | trans }}</button>\n                        </p>\n\n                    </div>\n\n                    <p>\n                        <label class=\"uk-form\"><input type=\"checkbox\" v-model=\"remember\"> {{ 'Remember Me' | trans }}</label>\n                    </p>\n\n                </form>\n\n            </div>\n\n        </v-modal>\n    </div>\n\n";

/***/ }
/******/ ]);