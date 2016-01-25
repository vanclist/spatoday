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
	__vue_script__ = __webpack_require__(12)
	__vue_template__ = __webpack_require__(13)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/link-page.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 12:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-row">
	//         <label for="form-link-page" class="uk-form-label">{{ 'View' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <select id="form-link-page" class="uk-width-1-1" v-model="page">
	//                 <option v-for="p in pages" :value="p.id">{{ p.title }}</option>
	//             </select>
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    link: {
	        label: 'Page'
	    },

	    props: ['link'],

	    data: function data() {
	        return {
	            pages: [],
	            page: ''
	        };
	    },

	    created: function created() {
	        //TODO don't retrieve entire page objects
	        this.$http.get('api/site/page').then(function (res) {
	            this.pages = res.data;
	            if (this.pages.length) {
	                this.page = this.pages[0].id;
	            }
	        });
	    },

	    watch: {

	        page: function page(_page) {
	            this.link = '@page/' + _page;
	        }

	    }

	};

	window.Links.components['link-page'] = module.exports;

	// </script>
	//

/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-link-page\" class=\"uk-form-label\">{{ 'View' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-link-page\" class=\"uk-width-1-1\" v-model=\"page\">\n                <option v-for=\"p in pages\" :value=\"p.id\">{{ p.title }}</option>\n            </select>\n        </div>\n    </div>\n\n";

/***/ }

/******/ });