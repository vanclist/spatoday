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

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(1)
	__vue_template__ = __webpack_require__(2)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/mail/app/components/settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//         <div data-uk-margin>
	//
	//             <h2 class="uk-margin-remove">{{ 'Mail' | trans }}</h2>
	//
	//         </div>
	//         <div data-uk-margin>
	//
	//             <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
	//
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <label for="form-emailaddress" class="uk-form-label">{{ 'From Email' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <input id="form-emailaddress" class="uk-form-width-large" type="text" v-model="options.from_address">
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <label for="form-fromname" class="uk-form-label">{{ 'From Name' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <input id="form-fromname" class="uk-form-width-large" type="text" v-model="options.from_name">
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <label for="form-mailer" class="uk-form-label">{{ 'Mailer' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <select id="form-mailer" class="uk-form-width-large" v-model="options.driver">
	//                 <option value="mail">{{ 'PHP Mailer' | trans }}</option>
	//                 <option value="smtp">{{ 'SMTP Mailer' | trans }}</option>
	//             </select>
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row" v-show="'smtp' == options.driver">
	//
	//         <div class="uk-form-row">
	//             <label for="form-smtpport" class="uk-form-label">{{ 'SMTP Port' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <input id="form-smtpport" class="uk-form-width-large" type="text" v-model="options.port">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-smtphost" class="uk-form-label">{{ 'SMTP Host' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <input id="form-smtphost" class="uk-form-width-large" type="text" v-model="options.host">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-smtpuser" class="uk-form-label">{{ 'SMTP User' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <input id="form-smtpuser" class="uk-form-width-large" type="text" v-model="options.username">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-smtppassword" class="uk-form-label">{{ 'SMTP Password' | trans }}</label>
	//             <div class="uk-form-controls js-password">
	//                 <div class="uk-form-password">
	//                     <input id="form-smtppassword" class="uk-form-width-large" type="password" v-model="options.password">
	//                     <a class="uk-form-password-toggle" data-uk-form-password>{{ 'Show' | trans }}</a>
	//                 </div>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-smtpencryption" class="uk-form-label">{{ 'SMTP Encryption' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <select id="form-smtpencryption" class="uk-form-width-large" v-model="options.encryption">
	//                     <option value="">{{ 'None' | trans }}</option>
	//                     <option value="ssl" :disabled="!ssl">{{ 'SSL' | trans }}</option>
	//                     <option value="tls" :disabled="!ssl">{{ 'TLS' | trans }}</option>
	//                 </select>
	//                 <p class="uk-form-help-block" v-if="!ssl">{{ 'Please enable the PHP Open SSL extension.' | trans }}</p>
	//             </div>
	//         </div>
	//
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <div class="uk-form-controls">
	//             <button class="uk-button" type="button" @click="test('smtp')" v-show="'smtp' == options.driver">{{ 'Check Connection' | trans }}</button>
	//             <button class="uk-button" type="button" @click="test('email')">{{ 'Send Test Email' | trans }}</button>
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Mail',
	        icon: 'pk-icon-large-mail',
	        priority: 40
	    },

	    props: ['config', 'options'],

	    data: function data() {
	        return window.$mail;
	    },

	    methods: {

	        test: function test(driver) {

	            this.$http.post('admin/system/' + driver, { option: this.options }).then(function (res) {
	                var data = res.data;
	                this.$notify(data.message, data.success ? '' : 'danger');
	            }, function () {
	                this.$notify('Ajax request to server failed.', 'danger');
	            });
	        }

	    }

	};

	window.Settings.components['system/mail'] = module.exports;

	// </script>
	//

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n\n            <h2 class=\"uk-margin-remove\">{{ 'Mail' | trans }}</h2>\n\n        </div>\n        <div data-uk-margin>\n\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-emailaddress\" class=\"uk-form-label\">{{ 'From Email' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <input id=\"form-emailaddress\" class=\"uk-form-width-large\" type=\"text\" v-model=\"options.from_address\">\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-fromname\" class=\"uk-form-label\">{{ 'From Name' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <input id=\"form-fromname\" class=\"uk-form-width-large\" type=\"text\" v-model=\"options.from_name\">\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-mailer\" class=\"uk-form-label\">{{ 'Mailer' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-mailer\" class=\"uk-form-width-large\" v-model=\"options.driver\">\n                <option value=\"mail\">{{ 'PHP Mailer' | trans }}</option>\n                <option value=\"smtp\">{{ 'SMTP Mailer' | trans }}</option>\n            </select>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\" v-show=\"'smtp' == options.driver\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-smtpport\" class=\"uk-form-label\">{{ 'SMTP Port' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-smtpport\" class=\"uk-form-width-large\" type=\"text\" v-model=\"options.port\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-smtphost\" class=\"uk-form-label\">{{ 'SMTP Host' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-smtphost\" class=\"uk-form-width-large\" type=\"text\" v-model=\"options.host\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-smtpuser\" class=\"uk-form-label\">{{ 'SMTP User' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-smtpuser\" class=\"uk-form-width-large\" type=\"text\" v-model=\"options.username\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-smtppassword\" class=\"uk-form-label\">{{ 'SMTP Password' | trans }}</label>\n            <div class=\"uk-form-controls js-password\">\n                <div class=\"uk-form-password\">\n                    <input id=\"form-smtppassword\" class=\"uk-form-width-large\" type=\"password\" v-model=\"options.password\">\n                    <a class=\"uk-form-password-toggle\" data-uk-form-password>{{ 'Show' | trans }}</a>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-smtpencryption\" class=\"uk-form-label\">{{ 'SMTP Encryption' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <select id=\"form-smtpencryption\" class=\"uk-form-width-large\" v-model=\"options.encryption\">\n                    <option value=\"\">{{ 'None' | trans }}</option>\n                    <option value=\"ssl\" :disabled=\"!ssl\">{{ 'SSL' | trans }}</option>\n                    <option value=\"tls\" :disabled=\"!ssl\">{{ 'TLS' | trans }}</option>\n                </select>\n                <p class=\"uk-form-help-block\" v-if=\"!ssl\">{{ 'Please enable the PHP Open SSL extension.' | trans }}</p>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"uk-form-row\">\n        <div class=\"uk-form-controls\">\n            <button class=\"uk-button\" type=\"button\" @click=\"test('smtp')\" v-show=\"'smtp' == options.driver\">{{ 'Check Connection' | trans }}</button>\n            <button class=\"uk-button\" type=\"button\" @click=\"test('email')\">{{ 'Send Test Email' | trans }}</button>\n        </div>\n    </div>\n\n";

/***/ }
/******/ ]);