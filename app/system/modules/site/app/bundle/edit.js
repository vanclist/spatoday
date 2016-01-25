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

	    el: '#site-edit',

	    data: function () {
	        return _.merge({sections: [], form: {}}, window.$data);
	    },

	    created: function () {

	        var sections = [], type = _.kebabCase(this.type.id), active;

	        _.forIn(this.$options.components, function (component, name) {

	            var options = component.options || {};

	            if (options.section) {
	                sections.push(_.extend({name: name, priority: 0}, options.section));
	            }

	        });

	        sections = _.sortBy(sections.filter(function (section) {

	            active = section.name.match('(.+):(.+)');

	            if (active === null) {
	                return !_.find(sections, {name: type + ':' + section.name});
	            }

	            return active[1] == type;
	        }, this), 'priority');

	        this.$set('sections', sections);

	    },

	    ready: function () {
	        this.Nodes = this.$resource('api/site/node/:id');
	        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
	    },

	    computed: {

	        path: function () {
	            return (this.node.path ? this.node.path.split('/').slice(0, -1).join('/') : '') + '/' + (this.node.slug || '');
	        }

	    },

	    methods: {

	        save: function () {
	            var data = {node: this.node};

	            this.$broadcast('save', data);

	            this.Nodes.save({id: this.node.id}, data).then(function (res) {
	                        var data = res.data;
	                        if (!this.node.id) {
	                            window.history.replaceState({}, '', this.$url.route('admin/site/page/edit', {id: data.node.id}));
	                        }

	                        this.$set('node', data.node);

	                        this.$notify(this.$trans('%type% saved.', {type: this.type.label}));

	                    }, function (res) {
	                        this.$notify(res.data, 'danger');
	                    }
	                );
	        }

	    },

	    partials: {

	        settings: __webpack_require__(1)

	    },

	    components: {

	        'settings': __webpack_require__(2),
	        'link:settings': __webpack_require__(5)

	    }

	};

	Vue.ready(window.Site);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-row\">\n    <label for=\"form-menu-title\" class=\"uk-form-label\">{{ 'Menu Title' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <input id=\"form-menu-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"node.title\" v-validate:required>\n        <div class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Invalid name.' | trans }}</div>\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <input id=\"form-slug\" class=\"uk-form-width-large\" type=\"text\" v-model=\"node.slug\">\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <select id=\"form-status\" class=\"uk-form-width-large\" v-model=\"node.status\">\n            <option value=\"0\">{{ 'Disabled' | trans }}</option>\n            <option value=\"1\">{{ 'Enabled' | trans }}</option>\n        </select>\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n    <div class=\"uk-form-controls uk-form-controls-text\">\n        <p v-for=\"role in roles\" class=\"uk-form-controls-condensed\">\n            <label><input type=\"checkbox\" :value=\"role.id\" v-model=\"node.roles\" number> {{ role.name }}</label>\n        </p>\n    </div>\n</div>\n\n<div class=\"uk-form-row\">\n    <span class=\"uk-form-label\">{{ 'Menu' | trans }}</span>\n    <div class=\"uk-form-controls uk-form-controls-text\">\n        <label><input type=\"checkbox\" value=\"center-content\" v-model=\"node.data.menu_hide\"> {{ 'Hide in menu' | trans }}</label>\n    </div>\n</div>\n";

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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/node-settings.vue"
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
	//     <div class="uk-form-horizontal">
	//         <partial name="settings"></partial>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['node'],

	    section: {
	        label: 'Settings'
	    },

	    created: function created() {
	        this.$options.partials.settings = this.$root.$options.partials.settings;
	    }

	};

	// </script>
	//

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form-horizontal\">\n        <partial name=\"settings\"></partial>\n    </div>\n\n";

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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/node-link.vue"
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
	//             <label for="form-url" class="uk-form-label">{{ 'Url' | trans }}</label>
	//             <div class="uk-form-controls">
	//                 <input-link id="form-url" class="uk-form-width-large" name="link" :link.sync="node.link" required></input-link>
	//                 <div class="uk-form-help-block uk-text-danger" v-show="form.link.invalid">{{ 'Invalid url.' | trans }}</div>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-type" class="uk-form-label">{{ 'Type' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <select id="form-type" class="uk-form-width-large" v-model="behavior">
	//                     <option value="link">{{ 'Link' | trans }}</option>
	//                     <option value="alias">{{ 'URL Alias' | trans }}</option>
	//                     <option value="redirect">{{ 'Redirect' | trans }}</option>
	//                 </select>
	//             </div>
	//         </div>
	//
	//         <partial name="settings"></partial>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    section: {
	        label: 'Settings',
	        priority: 0,
	        active: 'link'
	    },

	    props: ['node', 'roles', 'form'],

	    created: function created() {

	        this.$options.partials = this.$parent.$options.partials;

	        if (this.behavior === 'redirect') {
	            this.node.link = this.node.data.redirect;
	        }

	        if (!this.node.id) {
	            this.node.status = 1;
	        }
	    },

	    computed: {

	        behavior: {

	            get: function get() {
	                if (this.node.data.alias) {
	                    return 'alias';
	                } else if (this.node.data.redirect) {
	                    return 'redirect';
	                }

	                return 'link';
	            },

	            set: function set(type) {
	                this.$set('node.data', _.extend(this.node.data, {
	                    alias: type === 'alias',
	                    redirect: type === 'redirect' ? this.node.link : false
	                }));
	            }

	        }

	    },

	    events: {

	        save: function save() {
	            if (this.behavior === 'redirect') {
	                this.node.data.redirect = this.node.link;
	            }
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-url\" class=\"uk-form-label\">{{ 'Url' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input-link id=\"form-url\" class=\"uk-form-width-large\" name=\"link\" :link.sync=\"node.link\" required></input-link>\n                <div class=\"uk-form-help-block uk-text-danger\" v-show=\"form.link.invalid\">{{ 'Invalid url.' | trans }}</div>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-type\" class=\"uk-form-label\">{{ 'Type' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <select id=\"form-type\" class=\"uk-form-width-large\" v-model=\"behavior\">\n                    <option value=\"link\">{{ 'Link' | trans }}</option>\n                    <option value=\"alias\">{{ 'URL Alias' | trans }}</option>\n                    <option value=\"redirect\">{{ 'Redirect' | trans }}</option>\n                </select>\n            </div>\n        </div>\n\n        <partial name=\"settings\"></partial>\n\n    </div>\n\n";

/***/ }
/******/ ]);