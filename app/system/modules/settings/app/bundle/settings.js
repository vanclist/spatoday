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

	window.Settings = {

	    el: '#settings',

	    data: function () {
	        return window.$settings;
	    },

	    ready: function () {

	        UIkit.tab(this.$els.tab, {connect: this.$els.content});

	    },

	    computed: {

	        sections: function () {

	            var sections = [];

	            _.forIn(this.$options.components, function (component, name) {

	                var options = component.options || {}, section = options.section;

	                if (section) {
	                    section.name = name;
	                    sections.push(section);
	                }

	            });

	            return sections;
	        }

	    },

	    methods: {

	        save: function () {
	            this.$broadcast('save', this.$data);
	            this.$resource('admin/system/settings/save').save({config: this.config, options: this.options}).then(function () {
	                        this.$notify('Settings saved.');
	                    }, function (res) {
	                        this.$notify(res.data, 'danger');
	                    }
	                );
	        }

	    },

	    components: {

	        locale: __webpack_require__(1),
	        system: __webpack_require__(4)

	    }

	};

	Vue.ready(window.Settings);


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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/settings/app/components/locale.vue"
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
	//     <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//         <div data-uk-margin>
	//             <h2 class="uk-margin-remove">{{ 'Localization' | trans }}</h2>
	//         </div>
	//         <div data-uk-margin>
	//             <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <label for="form-sitelocale" class="uk-form-label">{{ 'Site Locale' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <select id="form-sitelocale" class="uk-form-width-large" v-model="option.site.locale">
	//                 <option v-for="lang in locales" :value="$key">{{ lang }}</option>
	//             </select>
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <label for="form-adminlocale" class="uk-form-label">{{ 'Admin Locale' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <select id="form-adminlocale" class="uk-form-width-large" v-model="option.admin.locale">
	//                 <option v-for="lang in locales" :value="$key">{{ lang }}</option>
	//             </select>
	//         </div>
	//     </div>
	//
	//     <p>{{{ 'Is your language not available? Please help out by translating Pagekit into your own language on %link%.' | trans {link:link} }}}</p>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Localization',
	        icon: 'pk-icon-large-pin',
	        priority: 20
	    },

	    props: ['config', 'options'],

	    data: function data() {
	        return { locales: window.$system.locales };
	    },

	    computed: {

	        link: function link() {
	            return '<a href="https://www.transifex.com/pagekit/pagekit-cms/">Transifex</a>';
	        },

	        option: function option() {
	            return this.$root.$get('options.system');
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'Localization' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-sitelocale\" class=\"uk-form-label\">{{ 'Site Locale' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-sitelocale\" class=\"uk-form-width-large\" v-model=\"option.site.locale\">\n                <option v-for=\"lang in locales\" :value=\"$key\">{{ lang }}</option>\n            </select>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-adminlocale\" class=\"uk-form-label\">{{ 'Admin Locale' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-adminlocale\" class=\"uk-form-width-large\" v-model=\"option.admin.locale\">\n                <option v-for=\"lang in locales\" :value=\"$key\">{{ lang }}</option>\n            </select>\n        </div>\n    </div>\n\n    <p>{{{ 'Is your language not available? Please help out by translating Pagekit into your own language on %link%.' | trans {link:link} }}}</p>\n\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(5)
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/settings/app/components/system.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//         <div data-uk-margin>
	//             <h2 class="uk-margin-remove">{{ 'System' | trans }}</h2>
	//         </div>
	//         <div data-uk-margin>
	//             <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <label for="form-uploadfolder" class="uk-form-label">{{ 'Storage' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <input id="form-uploadfolder" class="uk-form-width-large" type="text" placeholder="/storage" v-model="$root.config['system/finder'].storage">
	//         </div>
	//     </div>
	//
	//     <div class="uk-form-row">
	//         <span class="uk-form-label">{{ 'Developer' | trans }}</span>
	//         <div class="uk-form-controls uk-form-controls-text">
	//             <p class="uk-form-controls-condensed">
	//                 <label><input type="checkbox" value="1" v-model="$root.config.application.debug"> {{ 'Enable debug mode' | trans }}</label>
	//             </p>
	//             <p class="uk-form-controls-condensed">
	//                 <label><input type="checkbox" value="1" v-model="$root.config.debug.enabled" :disabled="!sqlite"> {{ 'Enable debug toolbar' | trans }}</label>
	//             </p>
	//             <p class="uk-form-help-block" v-if="!sqlite">{{ 'Please enable the SQLite database extension.' | trans }}</p>
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'System',
	        icon: 'pk-icon-large-settings',
	        priority: 10
	    },

	    props: ['config', 'options'],

	    data: function data() {
	        return window.$system;
	    }

	};

	// </script>
	//

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n        <div data-uk-margin>\n            <h2 class=\"uk-margin-remove\">{{ 'System' | trans }}</h2>\n        </div>\n        <div data-uk-margin>\n            <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-uploadfolder\" class=\"uk-form-label\">{{ 'Storage' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <input id=\"form-uploadfolder\" class=\"uk-form-width-large\" type=\"text\" placeholder=\"/storage\" v-model=\"$root.config['system/finder'].storage\">\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Developer' | trans }}</span>\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <p class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"$root.config.application.debug\"> {{ 'Enable debug mode' | trans }}</label>\n            </p>\n            <p class=\"uk-form-controls-condensed\">\n                <label><input type=\"checkbox\" value=\"1\" v-model=\"$root.config.debug.enabled\" :disabled=\"!sqlite\"> {{ 'Enable debug toolbar' | trans }}</label>\n            </p>\n            <p class=\"uk-form-help-block\" v-if=\"!sqlite\">{{ 'Please enable the SQLite database extension.' | trans }}</p>\n        </div>\n    </div>\n\n";

/***/ }
/******/ ]);