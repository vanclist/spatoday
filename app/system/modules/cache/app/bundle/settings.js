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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/cache/app/components/settings.vue"
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
	//             <h2 class="uk-margin-remove">{{ 'Cache' | trans }}</h2>
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
	//         <span class="uk-form-label">{{ 'Cache' | trans }}</span>
	//
	//         <div class="uk-form-controls uk-form-controls-text">
	//             <p class="uk-form-controls-condensed" v-for="cache in caches">
	//                 <label><input type="radio" :value="$key" v-model="config.caches.cache.storage" :disabled="!cache.supported"> {{ cache.name }}</label>
	//             </p>
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <span class="uk-form-label">{{ 'Developer' | trans }}</span>
	//
	//         <div class="uk-form-controls uk-form-controls-text">
	//             <p class="uk-form-controls-condensed">
	//                 <label><input type="checkbox" value="1" v-model="config.nocache"> {{ 'Disable cache' | trans }}</label>
	//             </p>
	//
	//             <p>
	//                 <button class="uk-button uk-button-primary" type="button" @click.prevent="open">{{ 'Clear Cache' | trans }}</button>
	//             </p>
	//         </div>
	//     </div>
	//
	//     <v-modal v-ref:modal>
	//         <form class="uk-form-stacked">
	//
	//             <div class="uk-modal-header">
	//                 <h2>{{ 'Select Cache to Clear' | trans }}</h2>
	//             </div>
	//
	//             <div class="uk-form-row">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="checkbox" v-model="cache.cache"> {{ 'System Cache' | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="checkbox" v-model="cache.temp"> {{ 'Temporary Files' | trans }}</label>
	//                 </p>
	//             </div>
	//
	//             <div class="uk-modal-footer uk-text-right">
	//                 <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//                 <button class="uk-button uk-button-link" @click.prevent="clear">{{ 'Clear' | trans }}</button>
	//             </div>
	//
	//         </form>
	//     </v-modal>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Cache',
	        icon: 'pk-icon-large-bolt',
	        priority: 30
	    },

	    props: ['config', 'options'],

	    data: function data() {
	        return {
	            caches: window.$caches
	        };
	    },

	    methods: {

	        open: function open() {
	            this.$set('cache', { cache: true });
	            this.$refs.modal.open();
	        },

	        clear: function clear() {
	            this.$http.post('admin/system/cache/clear', { caches: this.cache }).then(function () {
	                this.$notify('Cache cleared.');
	            });

	            this.$refs.modal.close();
	        }

	    }

	};

	window.Settings.components['system/cache'] = module.exports;

	// </script>
	//

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n\n            <h2 class=\"uk-margin-remove\">{{ 'Cache' | trans }}</h2>\n\n        </div>\n        <div data-uk-margin>\n\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Cache' | trans }}</span>\n\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p class=\"uk-form-controls-condensed\" v-for=\"cache in caches\">\n                <label><input type=\"radio\" :value=\"$key\" v-model=\"config.caches.cache.storage\" :disabled=\"!cache.supported\"> {{ cache.name }}</label>\n            </p>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Developer' | trans }}</span>\n\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"config.nocache\"> {{ 'Disable cache' | trans }}</label>\n            </p>\n\n            <p>\n                <button class=\"uk-button uk-button-primary\" type=\"button\" @click.prevent=\"open\">{{ 'Clear Cache' | trans }}</button>\n            </p>\n        </div>\n    </div>\n\n    <v-modal v-ref:modal>\n        <form class=\"uk-form-stacked\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Select Cache to Clear' | trans }}</h2>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"checkbox\" v-model=\"cache.cache\"> {{ 'System Cache' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"checkbox\" v-model=\"cache.temp\"> {{ 'Temporary Files' | trans }}</label>\n                </p>\n            </div>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" @click.prevent=\"clear\">{{ 'Clear' | trans }}</button>\n            </div>\n\n        </form>\n    </v-modal>\n\n";

/***/ }
/******/ ]);