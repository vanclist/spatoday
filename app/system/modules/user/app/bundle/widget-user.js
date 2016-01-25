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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/user/app/components/widget-user.vue"
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
	//     <form class="pk-panel-teaser uk-form uk-form-stacked" v-if="editing">
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'User Type' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="login" v-model="widget.show"> {{ 'Logged in' | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="registered" v-model="widget.show"> {{ 'Last registered' | trans }}</label>
	//                 </p>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Display' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="thumbnail" v-model="widget.display"> {{ 'Thumbnail' | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="list" v-model="widget.display"> {{ 'List' | trans }}</label>
	//                 </p>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Total Users' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="1" v-model="widget.total"> {{ 'Show' | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="" v-model="widget.total"> {{ 'Hide' | trans }}</label>
	//                 </p>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label class="uk-form-label" for="form-user-number">{{ 'Number of Users' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <select id="form-user-number" class="uk-width-1-1" v-model="widget.count" number>
	//                     <option value="6">6</option>
	//                     <option value="12">12</option>
	//                     <option value="18">18</option>
	//                     <option value="24">24</option>
	//                 </select>
	//             </div>
	//         </div>
	//
	//     </form>
	//
	//     <div class="pk-text-large" v-if="widget.total">{{ userscount }}</div>
	//
	//     <h3 class="uk-panel-title" v-if="widget.show == 'registered' && widget.total">{{ '{0} Registered Users|{1} Registered User|]1,Inf[ Registered Users' | transChoice userscount}}</h3>
	//
	//     <h3 class="uk-panel-title" v-if="widget.show != 'registered' && widget.total">{{ '{0} Logged in Users|{1} Logged in User|]1,Inf[ Logged in Users' | transChoice userscount}}</h3>
	//
	//     <h3 class="uk-panel-title" v-if="widget.show == 'registered' && !widget.total">{{ 'Latest registered Users' | trans }}</h3>
	//
	//     <h3 class="uk-panel-title" v-if="widget.show != 'registered' && !widget.total">{{ 'Latest logged in Users' | trans }}</h3>
	//
	//     <ul v-show="users.length && widget.display == 'thumbnail'" data-user class="uk-grid uk-grid-small uk-grid-width-1-4 uk-grid-width-small-1-6 uk-grid-width-medium-1-4 uk-grid-width-xlarge-1-6" v-stack-margin="users">
	//         <li v-for="user in users">
	//             <a :href="$url.route('admin/user/edit', {id: user.id})" :title="user.username">
	//                 <img class="uk-border-rounded" width="200" height="200" :alt="user.name" v-gravatar="user.email">
	//             </a>
	//         </li>
	//     </ul>
	//
	//     <ul v-show="users.length && widget.display == 'list'" data-user class="uk-list uk-list-line">
	//         <li class="uk-flex uk-flex-middle" v-for="user in users">
	//             <img class="uk-border-circle uk-margin-right" width="40" height="40" :alt="user.name" v-gravatar="user.email">
	//
	//             <div class="uk-flex-item-1 uk-text-truncate">
	//                 <a :href="$url.route('admin/user/edit', {id: user.id})" :title="user.name">{{ user.username }}</a>
	//                 <br><a class="uk-link-muted" href="mailto:{{ user.email }}">{{ user.email }}</a>
	//             </div>
	//         </li>
	//     </ul>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    type: {

	        id: 'user',
	        label: 'User',
	        description: function description() {},
	        defaults: {
	            show: 'login',
	            display: 'thumbnail',
	            total: true,
	            count: 12
	        }

	    },

	    replace: false,

	    props: ['widget', 'editing'],

	    data: function data() {
	        return {
	            users: [],
	            userscount: null
	        };
	    },

	    watch: {

	        'widget.show': {
	            handler: 'load',
	            immediate: true
	        },

	        'widget.count': 'load'

	    },

	    methods: {

	        load: function load() {

	            var query;

	            if (this.$get('widget.show') === 'registered') {
	                query = {
	                    filter: { order: 'registered DESC' }
	                };
	            } else {
	                query = {
	                    filter: { access: 300, order: 'login DESC' }
	                };
	            }

	            this.$http.get('api/user/count', query).then(function (res) {
	                this.$set('userscount', res.data.count);
	            });

	            query.limit = this.$get('widget.count');

	            this.$http.get('api/user/:id', query).then(function (res) {
	                this.$set('users', res.data.users.slice(0, this.$get('widget.count')));
	            });
	        }

	    }

	};

	window.Dashboard.components['user'] = module.exports;

	// </script>
	//

/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = "\n\n    <form class=\"pk-panel-teaser uk-form uk-form-stacked\" v-if=\"editing\">\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'User Type' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"login\" v-model=\"widget.show\"> {{ 'Logged in' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"registered\" v-model=\"widget.show\"> {{ 'Last registered' | trans }}</label>\n                </p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Display' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"thumbnail\" v-model=\"widget.display\"> {{ 'Thumbnail' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"list\" v-model=\"widget.display\"> {{ 'List' | trans }}</label>\n                </p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Total Users' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"1\" v-model=\"widget.total\"> {{ 'Show' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"\" v-model=\"widget.total\"> {{ 'Hide' | trans }}</label>\n                </p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label class=\"uk-form-label\" for=\"form-user-number\">{{ 'Number of Users' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <select id=\"form-user-number\" class=\"uk-width-1-1\" v-model=\"widget.count\" number>\n                    <option value=\"6\">6</option>\n                    <option value=\"12\">12</option>\n                    <option value=\"18\">18</option>\n                    <option value=\"24\">24</option>\n                </select>\n            </div>\n        </div>\n\n    </form>\n\n    <div class=\"pk-text-large\" v-if=\"widget.total\">{{ userscount }}</div>\n\n    <h3 class=\"uk-panel-title\" v-if=\"widget.show == 'registered' && widget.total\">{{ '{0} Registered Users|{1} Registered User|]1,Inf[ Registered Users' | transChoice userscount}}</h3>\n\n    <h3 class=\"uk-panel-title\" v-if=\"widget.show != 'registered' && widget.total\">{{ '{0} Logged in Users|{1} Logged in User|]1,Inf[ Logged in Users' | transChoice userscount}}</h3>\n\n    <h3 class=\"uk-panel-title\" v-if=\"widget.show == 'registered' && !widget.total\">{{ 'Latest registered Users' | trans }}</h3>\n\n    <h3 class=\"uk-panel-title\" v-if=\"widget.show != 'registered' && !widget.total\">{{ 'Latest logged in Users' | trans }}</h3>\n\n    <ul v-show=\"users.length && widget.display == 'thumbnail'\" data-user class=\"uk-grid uk-grid-small uk-grid-width-1-4 uk-grid-width-small-1-6 uk-grid-width-medium-1-4 uk-grid-width-xlarge-1-6\" v-stack-margin=\"users\">\n        <li v-for=\"user in users\">\n            <a :href=\"$url.route('admin/user/edit', {id: user.id})\" :title=\"user.username\">\n                <img class=\"uk-border-rounded\" width=\"200\" height=\"200\" :alt=\"user.name\" v-gravatar=\"user.email\">\n            </a>\n        </li>\n    </ul>\n\n    <ul v-show=\"users.length && widget.display == 'list'\" data-user class=\"uk-list uk-list-line\">\n        <li class=\"uk-flex uk-flex-middle\" v-for=\"user in users\">\n            <img class=\"uk-border-circle uk-margin-right\" width=\"40\" height=\"40\" :alt=\"user.name\" v-gravatar=\"user.email\">\n\n            <div class=\"uk-flex-item-1 uk-text-truncate\">\n                <a :href=\"$url.route('admin/user/edit', {id: user.id})\" :title=\"user.name\">{{ user.username }}</a>\n                <br><a class=\"uk-link-muted\" href=\"mailto:{{ user.email }}\">{{ user.email }}</a>\n            </div>\n        </li>\n    </ul>\n\n";

/***/ }

/******/ });