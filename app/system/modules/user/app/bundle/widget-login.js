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

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(10)
	__vue_template__ = __webpack_require__(11)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/user/app/components/widget-login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 10:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-grid pk-grid-large" data-uk-grid-margin>
	//         <div class="uk-flex-item-1 uk-form-horizontal">
	//
	//             <div class="uk-form-row">
	//                 <label for="form-title" class="uk-form-label">{{ 'Title' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-title" class="uk-form-width-large" type="text" name="title" v-model="widget.title" v-validate:required>
	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.title.invalid">{{ 'Title cannot be blank.' | trans }}</p>
	//                 </div>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <label class="uk-form-label">{{ 'Login Redirect' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input-link class="uk-form-width-large" :link.sync="widget.data.redirect_login"></input-link>
	//                 </div>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <label class="uk-form-label">{{ 'Logout Redirect' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input-link class="uk-form-width-large" :link.sync="widget.data.redirect_logout"></input-link>
	//                 </div>
	//             </div>
	//
	//         </div>
	//         <div class="pk-width-sidebar pk-width-sidebar-large">
	//
	//             <partial name="settings"></partial>
	//
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Settings'
	    },

	    replace: false,

	    props: ['widget', 'config', 'form'],

	    created: function created() {
	        this.$options.partials = this.$parent.$options.partials;
	    }

	};

	window.Widgets.components['system-login:settings'] = module.exports;

	// </script>
	//

/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-grid pk-grid-large\" data-uk-grid-margin>\n        <div class=\"uk-flex-item-1 uk-form-horizontal\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"widget.title\" v-validate:required>\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label class=\"uk-form-label\">{{ 'Login Redirect' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input-link class=\"uk-form-width-large\" :link.sync=\"widget.data.redirect_login\"></input-link>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label class=\"uk-form-label\">{{ 'Logout Redirect' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input-link class=\"uk-form-width-large\" :link.sync=\"widget.data.redirect_logout\"></input-link>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"pk-width-sidebar pk-width-sidebar-large\">\n\n            <partial name=\"settings\"></partial>\n\n        </div>\n    </div>\n\n";

/***/ }

/******/ });