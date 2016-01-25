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

	window.Widgets = module.exports = {

	    data: function () {
	        return {
	            widgets: []
	        };
	    },

	    created: function () {
	        this.resource = this.$resource('api/site/widget/:id');
	    },

	    methods: {

	        load: function () {

	            return this.resource.query().then(function (res) {
	                this.$set('widgets', res.data);
	            });

	        }

	    },

	    partials: {

	        settings: __webpack_require__(1)

	    },

	    components: {

	        settings: __webpack_require__(2),
	        visibility: __webpack_require__(5)

	    }

	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-panel uk-form-stacked\">\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-status\" class=\"uk-width-1-1\" v-model=\"widget.status\">\n                <option value=\"0\">{{ 'Disabled' | trans }}</option>\n                <option value=\"1\">{{ 'Enabled' | trans }}</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"uk-form-row\">\n        <label for=\"form-position\" class=\"uk-form-label\">{{ 'Position' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-position\" name=\"position\" class=\"uk-width-1-1\" v-model=\"widget.position\">\n                <option value=\"\">{{ '- Assign -' | trans }}</option>\n                <option v-for=\"position in config.positions\" :value=\"position.name\">{{ position.label }}</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p v-for=\"role in config.roles\" class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" :value=\"role.id\" v-model=\"widget.roles\" number> {{ role.name }}</label>\n            </p>\n        </div>\n    </div>\n\n</div>\n";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(3)
	__vue_template__ = __webpack_require__(4)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/widget/app/components/widget-settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
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

	    props: ['widget', 'form'],

	    created: function created() {
	        this.$options.partials = this.$parent.$options.partials;
	    }

	};

	// </script>
	//

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-grid pk-grid-large\" data-uk-grid-margin>\n        <div class=\"uk-flex-item-1 uk-form-horizontal\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"widget.title\" v-validate:required>\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"pk-width-sidebar pk-width-sidebar-large\">\n\n            <partial name=\"settings\"></partial>\n\n        </div>\n    </div>\n\n";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(6)
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/widget/app/components/widget-visibility.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form-horizontal">
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">Pages</span>
	//             <div class="uk-form-controls uk-form-controls-text" v-if="config.menus">
	//
	//                 <input-tree :active.sync="widget.nodes"></input-tree>
	//
	//             </div>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Visibility',
	        priority: 100
	    },

	    data: function data() {
	        return {
	            menus: false
	        };
	    },

	    props: ['widget', 'config', 'form']

	};

	// </script>
	//

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">Pages</span>\n            <div class=\"uk-form-controls uk-form-controls-text\" v-if=\"config.menus\">\n\n                <input-tree :active.sync=\"widget.nodes\"></input-tree>\n\n            </div>\n        </div>\n\n    </div>\n\n";

/***/ }
/******/ ]);