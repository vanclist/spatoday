var Links =
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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/panel-link.vue"
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
	//     <div class="uk-form-row">
	//         <label for="form-style" class="uk-form-label">{{ 'Extension' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <select id="form-style" class="uk-width-1-1" v-model="type">
	//                 <option v-for="type in types" :value="type.value">{{ type.text }}</option>
	//             </select>
	//         </div>
	//     </div>
	//
	//     <div :is="type" :link.sync="link" v-if="type"></div>
	//
	// </template>
	//
	// <script>

	window.Links = module.exports = {

	    data: function data() {
	        return {
	            type: false,
	            link: ''
	        };
	    },

	    watch: {

	        type: {
	            handler: function handler(type) {
	                if (!type && this.types.length) {
	                    this.type = this.types[0].value;
	                }
	            },
	            immediate: true
	        }

	    },

	    computed: {

	        types: function types() {

	            var types = [],
	                options;

	            _.forIn(this.$options.components, function (component, name) {

	                options = component.options || {};

	                if (options.link) {
	                    types.push({ text: options.link.label, value: name });
	                }
	            });

	            return _.sortBy(types, 'text');
	        }

	    },

	    components: {}

	};

	Vue.component('panel-link', function (resolve) {
	    resolve(module.exports);
	});

	// </script>
	//

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-style\" class=\"uk-form-label\">{{ 'Extension' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-style\" class=\"uk-width-1-1\" v-model=\"type\">\n                <option v-for=\"type in types\" :value=\"type.value\">{{ type.text }}</option>\n            </select>\n        </div>\n    </div>\n\n    <div :is=\"type\" :link.sync=\"link\" v-if=\"type\"></div>\n\n";

/***/ }
/******/ ]);