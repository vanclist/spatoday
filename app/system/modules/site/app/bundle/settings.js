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

	window.Site = {

	    el: '#settings',

	    data: function () {
	        return _.merge({form: {}}, window.$data);
	    },

	    ready: function () {

	        UIkit.tab(this.$els.tab, {connect: this.$els.content});

	    },

	    computed: {

	        sections: function () {

	            var sections = [], hash = window.location.hash.replace('#', '');

	            _.forIn(this.$options.components, function (component, name) {

	                var options = component.options || {}, section = options.section;

	                if (section) {
	                    section.name = name;
	                    section.active = name == hash;
	                    sections.push(section);
	                }

	            });

	            return sections;
	        }

	    },

	    methods: {

	        save: function () {
	            this.$broadcast('save', this.config);

	            this.$http.post('admin/system/settings/config', {name: 'system/site', config: this.config}).then(function () {
	                        this.$notify('Settings saved.');
	                    }, function (res) {
	                        this.$notify(res.data, 'danger');
	                    });
	        }

	    },

	    components: {

	        'site-code': __webpack_require__(16),
	        'site-general': __webpack_require__(19),
	        'site-maintenance': __webpack_require__(22)

	    }

	};

	Vue.ready(window.Site);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(17)
	__vue_template__ = __webpack_require__(18)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/site-code.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//         <div data-uk-margin>
	//             <h2 class="uk-margin-remove">{{ 'Code' | trans }}</h2>
	//         </div>
	//         <div data-uk-margin>
	//             <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
	//         </div>
	//     </div>
	//
	//     <p>{{ 'Insert code in the header and footer of your theme. This is useful for tracking codes and meta tags.' | trans }}</p>
	//
	//     <div class="uk-form uk-form-stacked">
	//         <div class="uk-form-row">
	//             <label for="form-codeheader" class="uk-form-label">{{ 'Header' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <v-editor type="code" :value.sync="config.code.header"></v-editor>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-codeheader" class="uk-form-label">{{ 'Footer' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <v-editor type="code" :value.sync="config.code.footer"></v-editor>
	//             </div>
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Code',
	        icon: 'pk-icon-large-code',
	        priority: 20
	    },

	    props: ['config']

	};

	// </script>
	//

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'Code' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <p>{{ 'Insert code in the header and footer of your theme. This is useful for tracking codes and meta tags.' | trans }}</p>\n\n    <div class=\"uk-form uk-form-stacked\">\n        <div class=\"uk-form-row\">\n            <label for=\"form-codeheader\" class=\"uk-form-label\">{{ 'Header' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <v-editor type=\"code\" :value.sync=\"config.code.header\"></v-editor>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-codeheader\" class=\"uk-form-label\">{{ 'Footer' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <v-editor type=\"code\" :value.sync=\"config.code.footer\"></v-editor>\n            </div>\n        </div>\n    </div>\n\n";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(20)
	__vue_template__ = __webpack_require__(21)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/site-general.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//         <div data-uk-margin>
	//             <h2 class="uk-margin-remove">{{ 'General' | trans }}</h2>
	//         </div>
	//         <div data-uk-margin>
	//             <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
	//         </div>
	//     </div>
	//
	//     <div class="uk-form uk-form-horizontal">
	//
	//         <div class="uk-form-row">
	//             <label for="form-title" class="uk-form-label">{{ 'Title' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <input id="form-title" class="uk-form-width-large" name="title" type="text" v-model="config.title" v-validate:required>
	//                 <p class="uk-form-help-block uk-text-danger" v-show="form.title.invalid">{{ 'Site title cannot be blank.' | trans }}</p>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-appicon" class="uk-form-label">{{ 'Logo' | trans }}</label>
	//             <div class="uk-form-controls uk-form-width-large">
	//                 <input-image :source.sync="config.view.logo"></input-image>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-favicon" class="uk-form-label">{{ 'Favicon' | trans }}</label>
	//             <div class="uk-form-controls uk-form-width-large">
	//                 <input-image :source.sync="config.icons.favicon"></input-image>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-appicon" class="uk-form-label">{{ 'Appicon' | trans }}</label>
	//             <div class="uk-form-controls uk-form-width-large">
	//                 <input-image :source.sync="config.icons.appicon"></input-image>
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
	        label: 'General',
	        icon: 'pk-icon-large-settings',
	        priority: 10
	    },

	    props: ['config']

	};

	// </script>
	//

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'General' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-title\" class=\"uk-form-width-large\" name=\"title\" type=\"text\" v-model=\"config.title\" v-validate:required>\n                <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Site title cannot be blank.' | trans }}</p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-appicon\" class=\"uk-form-label\">{{ 'Logo' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-width-large\">\n                <input-image :source.sync=\"config.view.logo\"></input-image>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-favicon\" class=\"uk-form-label\">{{ 'Favicon' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-width-large\">\n                <input-image :source.sync=\"config.icons.favicon\"></input-image>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-appicon\" class=\"uk-form-label\">{{ 'Appicon' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-width-large\">\n                <input-image :source.sync=\"config.icons.appicon\"></input-image>\n            </div>\n        </div>\n\n    </div>\n\n";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(23)
	__vue_template__ = __webpack_require__(24)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/site-maintenance.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//         <div data-uk-margin>
	//             <h2 class="uk-margin-remove">{{ 'Maintenance' | trans }}</h2>
	//         </div>
	//         <div data-uk-margin>
	//             <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
	//         </div>
	//     </div>
	//
	//     <div class="uk-form uk-form-horizontal">
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Offline' | trans }}</span>
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <label><input type="checkbox" value="1" v-model="config.maintenance.enabled"> {{ 'Put the site offline and show the offline message.' | trans }}</label>
	//             </div>
	//         </div>
	//
	//
	//         <div class="uk-form-row">
	//             <label for="form-offlinemessage" class="uk-form-label">{{ 'Message' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <textarea id="form-offlinemessage" class="uk-form-width-large" :placeholder="'We\'ll be back soon.' | trans" rows="5" v-model="config.maintenance.msg"></textarea>
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
	        label: 'Maintenance',
	        icon: 'pk-icon-large-cone',
	        priority: 30
	    },

	    props: ['config']

	};

	// </script>
	//

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'Maintenance' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Offline' | trans }}</span>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"config.maintenance.enabled\"> {{ 'Put the site offline and show the offline message.' | trans }}</label>\n            </div>\n        </div>\n\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-offlinemessage\" class=\"uk-form-label\">{{ 'Message' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <textarea id=\"form-offlinemessage\" class=\"uk-form-width-large\" :placeholder=\"'We\\'ll be back soon.' | trans\" rows=\"5\" v-model=\"config.maintenance.msg\"></textarea>\n            </div>\n        </div>\n\n    </div>\n\n";

/***/ }
/******/ ]);