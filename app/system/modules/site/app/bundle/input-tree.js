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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/input-tree.vue"
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
	//     <p><strong>{{ all ? 'All Pages' : 'Only selected pages' | trans }}</strong></p>
	//     <ul class="uk-list uk-margin-top-remove" v-for="menu in menus" v-if="menu.count">
	//         <li class="pk-list-header">{{ menu.label }}</li>
	//         <partial name="node-partial" v-for="node in grouped[menu.id][0]"></partial>
	//     </ul>
	// </template>
	//
	// <script>

	module.exports = {

	    props: {
	        active: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        }
	    },

	    data: function data() {
	        return {
	            'menus': [],
	            'nodes': []
	        };
	    },

	    ready: function ready() {

	        var vm = this;

	        Vue.Promise.all([this.$http.get('api/site/node'), this.$http.get('api/site/menu')]).then(function (responses) {
	            vm.$set('nodes', responses[0].data);
	            vm.$set('menus', responses[1].data);
	        }, function () {
	            vm.$notify('Could not load config.', 'danger');
	        });
	    },

	    computed: {

	        grouped: function grouped() {
	            return _(this.nodes).groupBy('menu').mapValues(function (nodes) {
	                return _(nodes || {}).sortBy('priority').groupBy('parent_id').value();
	            }).value();
	        },

	        all: function all() {
	            return !this.active || !this.active.length;
	        }

	    },

	    partials: {

	        'node-partial': '<li>' + '<label><input type="checkbox" :value="node.id" v-model="active" number> {{ node.title }}</label>' + '<ul class="uk-list" v-if="grouped[menu.id][node.id]">' + '<partial name="node-partial" v-for="node in grouped[menu.id][node.id]"></partial>' + '</ul>' + '<li>'

	    }
	};

	window.Vue.component('input-tree', function (resolve) {
	    resolve(module.exports);
	});

	// </script>
	//

/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = "\n    <p><strong>{{ all ? 'All Pages' : 'Only selected pages' | trans }}</strong></p>\n    <ul class=\"uk-list uk-margin-top-remove\" v-for=\"menu in menus\" v-if=\"menu.count\">\n        <li class=\"pk-list-header\">{{ menu.label }}</li>\n        <partial name=\"node-partial\" v-for=\"node in grouped[menu.id][0]\"></partial>\n    </ul>\n";

/***/ }

/******/ });