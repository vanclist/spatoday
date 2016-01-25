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

	var Version = __webpack_require__(1);

	window.Dashboard = {

	    el: '#dashboard',

	    data: function () {
	        return _.extend({
	            editing: {},
	            update: {}
	        }, window.$data);
	    },

	    created: function () {

	        var self = this;

	        this.Widgets = this.$resource('admin/dashboard/:id');

	        this.$set('widgets', this.widgets.filter(function (widget, idx) {

	            if (self.getType(widget.type)) {

	                widget.idx = widget.idx === undefined ? idx : widget.idx;
	                widget.column = widget.column === undefined ? 0 : widget.column;

	                return true;
	            }

	            return false;
	        }));

	        this.checkVersion();
	    },

	    ready: function () {

	        var self = this, list, startindex;

	        // widget re-ordering
	        var sortables = $(this.$el).find('.uk-sortable[data-column]').each(function () {

	            UIkit.sortable(this, {group: 'widgets', dragCustomClass: 'pk-sortable-dragged-panel'});

	        }).on('change.uk.sortable', function (e, sortable, item, mode) {

	            if (!mode) {
	                return;
	            }

	            sortable = sortable.element ? sortable : sortable.data('sortable');

	            switch (mode) {
	                case 'added':
	                case 'moved':

	                    var widgets = self.widgets, column = parseInt(sortable.element.data('column'), 10), data = {}, widget;

	                    sortable.element.children('[data-idx]').each(function (idx) {

	                        widget = _.find(widgets, 'id', this.getAttribute('data-id'));
	                        widget.column = column;
	                        widget.idx = idx;
	                    });

	                    widgets.forEach(function (widget) {
	                        data[widget.id] = widget;
	                    });

	                    self.$http.post('admin/dashboard/savewidgets', {widgets: data}).then(function () {

	                        // cleanup empty items - maybe fixed with future vue.js version
	                        sortables.children().each(function () {
	                            if (!this.children.length) $(this).remove();
	                        });
	                    });
	            }
	        });
	    },

	    filters: {

	        column: function (widgets, column) {

	            column = parseInt(column || 0, 10);

	            return _.sortBy(widgets.filter(function (widget) {
	                return widget.column == column;
	            }), 'idx');
	        }
	    },

	    computed: {

	        columns: function () {
	            var i = 0;
	            return _.groupBy(this.widgets, function () {
	                return i++ % 3;
	            });
	        },

	        hasUpdate: function () {
	            return this.update && Version.compare(this.update.version, this.version, '>');
	        }

	    },

	    methods: {

	        add: function (type) {

	            var column = 0, sortables = $('#dashboard').find('.uk-sortable[data-column]');

	            sortables.each(function (idx) {
	                column = (this.children.length < sortables.eq(column)[0].children.length) ? idx : column;
	            });

	            this.Widgets.save({widget: _.merge({type: type.id, column: column, idx: 100}, type.defaults)}).then(function (res) {
	                var data = res.data;
	                this.widgets.push(data);
	                this.editing[data.id] = true;
	            });
	        },

	        save: function (widget) {

	            var data = {widget: widget};

	            this.$broadcast('save', data);
	            this.Widgets.save({id: widget.id}, data);
	        },

	        remove: function (widget) {

	            this.Widgets.delete({id: widget.id}).then(function () {
	                this.widgets.splice(_.findIndex(this.widgets, {id: widget.id}), 1);
	            });
	        },

	        getType: function (id) {
	            return _.find(this.getTypes(), 'id', id);
	        },

	        getTypes: function () {

	            var types = [];

	            _.forIn(this.$options.components, function (component, name) {

	                var options = component.options || {}, type = options.type;

	                if (type) {
	                    type.component = name;
	                    types.push(type);
	                }

	            });

	            return types;
	        },

	        checkVersion: function () {

	            if (this.$cache.get('pagekit.update')) {
	                this.$set('update', this.$cache.get('pagekit.update'));
	            } else {
	                this.$http.get(this.api + '/api/update').then(function (res) {
	                    var data = res.data;
	                    var update = data[this.channel == 'nightly' ? 'nightly' : 'latest'];

	                    if (update) {
	                        this.$cache.set('pagekit.update', update, 1440);
	                        this.$set('update', update);
	                    }
	                });
	            }

	        }

	    },

	    components: {

	        panel: __webpack_require__(2),
	        feed: __webpack_require__(5),
	        location: __webpack_require__(8)

	    }

	};

	Vue.ready(window.Dashboard);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// https://raw.githubusercontent.com/kvz/phpjs/master/functions/info/version_compare.js
	exports.compare = function (v1, v2, operator) {
	  //       discuss at: http://phpjs.org/functions/version_compare/
	  //      original by: Philippe Jausions (http://pear.php.net/user/jausions)
	  //      original by: Aidan Lister (http://aidanlister.com/)
	  // reimplemented by: Kankrelune (http://www.webfaktory.info/)
	  //      improved by: Brett Zamir (http://brett-zamir.me)
	  //      improved by: Scott Baker
	  //      improved by: Theriault
	  //        example 1: version_compare('8.2.5rc', '8.2.5a');
	  //        returns 1: 1
	  //        example 2: version_compare('8.2.50', '8.2.52', '<');
	  //        returns 2: true
	  //        example 3: version_compare('5.3.0-dev', '5.3.0');
	  //        returns 3: -1
	  //        example 4: version_compare('4.1.0.52','4.01.0.51');
	  //        returns 4: 1

	  this.php_js = this.php_js || {};
	  this.php_js.ENV = this.php_js.ENV || {};
	  // END REDUNDANT
	  // Important: compare must be initialized at 0.
	  var i,
	    x,
	    compare = 0,
	    // vm maps textual PHP versions to negatives so they're less than 0.
	    // PHP currently defines these as CASE-SENSITIVE. It is important to
	    // leave these as negatives so that they can come before numerical versions
	    // and as if no letters were there to begin with.
	    // (1alpha is < 1 and < 1.1 but > 1dev1)
	    // If a non-numerical value can't be mapped to this table, it receives
	    // -7 as its value.
	    vm = {
	      'dev': -6,
	      'alpha': -5,
	      'a': -5,
	      'beta': -4,
	      'b': -4,
	      'RC': -3,
	      'rc': -3,
	      '#': -2,
	      'p': 1,
	      'pl': 1
	    },
	    // This function will be called to prepare each version argument.
	    // It replaces every _, -, and + with a dot.
	    // It surrounds any nonsequence of numbers/dots with dots.
	    // It replaces sequences of dots with a single dot.
	    //    version_compare('4..0', '4.0') == 0
	    // Important: A string of 0 length needs to be converted into a value
	    // even less than an unexisting value in vm (-7), hence [-8].
	    // It's also important to not strip spaces because of this.
	    //   version_compare('', ' ') == 1
	    prepVersion = function (v) {
	      v = ('' + v)
	        .replace(/[_\-+]/g, '.');
	      v = v.replace(/([^.\d]+)/g, '.$1.')
	        .replace(/\.{2,}/g, '.');
	      return (!v.length ? [-8] : v.split('.'));
	    },
	  // This converts a version component to a number.
	  // Empty component becomes 0.
	  // Non-numerical component becomes a negative number.
	  // Numerical component becomes itself as an integer.
	  numVersion = function (v) {
	    return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
	  };
	  v1 = prepVersion(v1);
	  v2 = prepVersion(v2);
	  x = Math.max(v1.length, v2.length);
	  for (i = 0; i < x; i++) {
	    if (v1[i] == v2[i]) {
	      continue;
	    }
	    v1[i] = numVersion(v1[i]);
	    v2[i] = numVersion(v2[i]);
	    if (v1[i] < v2[i]) {
	      compare = -1;
	      break;
	    } else if (v1[i] > v2[i]) {
	      compare = 1;
	      break;
	    }
	  }
	  if (!operator) {
	    return compare;
	  }

	  // Important: operator is CASE-SENSITIVE.
	  // "No operator" seems to be treated as "<."
	  // Any other values seem to make the function return null.
	  switch (operator) {
	  case '>':
	  case 'gt':
	    return (compare > 0);
	  case '>=':
	  case 'ge':
	    return (compare >= 0);
	  case '<=':
	  case 'le':
	    return (compare <= 0);
	  case '==':
	  case '=':
	  case 'eq':
	    return (compare === 0);
	  case '<>':
	  case '!=':
	  case 'ne':
	    return (compare !== 0);
	  case '':
	  case '<':
	  case 'lt':
	    return (compare < 0);
	  default:
	    return null;
	  }
	};


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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/dashboard/app/components/widget-panel.vue"
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
	//     <div>
	//
	//         <div class="uk-panel-badge" v-if="!type.disableToolbar">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li v-show="type.editable !== false && !editing">
	//                     <a class="pk-icon-edit pk-icon-hover uk-hidden" title="{{ 'Edit' | trans }}" data-uk-tooltip="{delay: 500}" @click.prevent="edit"></a>
	//                 </li>
	//                 <li v-show="editing">
	//                     <a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove" v-confirm="'Delete widget?'"></a>
	//                 </li>
	//                 <li v-show="editing">
	//                     <a class="pk-icon-check pk-icon-hover" title="{{ 'Close' | trans }}" data-uk-tooltip="{delay: 500}" @click.prevent="save"></a>
	//                 </li>
	//             </ul>
	//         </div>
	//
	//         <component :is="type.component" :widget="widget" :editing.sync="editing"></component>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: { 'widget': {}, 'editing': { default: false } },

	    created: function created() {
	        this.$options.components = this.$parent.$options.components;
	    },

	    computed: {

	        type: function type() {
	            return this.$root.getType(this.widget.type);
	        }

	    },

	    methods: {

	        edit: function edit() {
	            this.$set('editing', true);
	        },

	        save: function save() {
	            this.$root.save(this.widget);
	            this.$set('editing', false);
	        },

	        remove: function remove() {
	            this.$root.remove(this.widget);
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n\n        <div class=\"uk-panel-badge\" v-if=\"!type.disableToolbar\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li v-show=\"type.editable !== false && !editing\">\n                    <a class=\"pk-icon-edit pk-icon-hover uk-hidden\" title=\"{{ 'Edit' | trans }}\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"edit\"></a>\n                </li>\n                <li v-show=\"editing\">\n                    <a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\" v-confirm=\"'Delete widget?'\"></a>\n                </li>\n                <li v-show=\"editing\">\n                    <a class=\"pk-icon-check pk-icon-hover\" title=\"{{ 'Close' | trans }}\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"save\"></a>\n                </li>\n            </ul>\n        </div>\n\n        <component :is=\"type.component\" :widget=\"widget\" :editing.sync=\"editing\"></component>\n\n    </div>\n\n";

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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/dashboard/app/components/widget-feed.vue"
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
	//     <form class="pk-panel-teaser uk-form uk-form-stacked" v-if="editing">
	//
	//         <div class="uk-form-row">
	//             <label for="form-feed-title" class="uk-form-label">{{ 'Title' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-feed-title" class="uk-width-1-1" type="text" name="widget[title]" v-model="widget.title">
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-feed-url" class="uk-form-label">{{ 'URL' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <input id="form-feed-url" class="uk-width-1-1" type="text" name="url" v-model="widget.url" lazy>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <label for="form-feed-count" class="uk-form-label">{{ 'Number of Posts' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <select id="form-feed-count" class="uk-width-1-1" v-model="widget.count" number>
	//                     <option value="1">1</option>
	//                     <option value="2">2</option>
	//                     <option value="3">3</option>
	//                     <option value="4">4</option>
	//                     <option value="5">5</option>
	//                     <option value="6">6</option>
	//                     <option value="7">7</option>
	//                     <option value="8">8</option>
	//                     <option value="9">9</option>
	//                     <option value="10">10</option>
	//                 </select>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Post Content' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="" v-model="widget.content"> {{ "Don't show" | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="1" v-model="widget.content"> {{ 'Show on all posts' | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="2" v-model="widget.content"> {{ 'Only show on first post.' | trans }}</label>
	//                 </p>
	//             </div>
	//         </div>
	//
	//     </form>
	//
	//     <div v-show="status != 'loading'">
	//
	//         <h3 class="uk-panel-title" v-if="widget.title">{{ widget.title }}</h3>
	//
	//         <ul class="uk-list uk-list-line uk-margin-remove">
	//             <li v-for="entry in feed.entries | count">
	//                 <a :href="entry.link" target="_blank">{{ entry.title }}</a> <span class="uk-text-muted uk-text-nowrap">{{ entry.publishedDate | relativeDate }}</span>
	//
	//                 <p class="uk-margin-small-top" v-if="widget.content == '1'">{{ entry.contentSnippet }}</p>
	//
	//                 <p class="uk-margin-small-top" v-if="widget.content == '2'">{{ $index == 0 ? entry.contentSnippet : '' }}</p>
	//             </li>
	//         </ul>
	//
	//         <div v-if="status == 'error'">{{ 'Unable to retrieve feed data.' | trans }}</div>
	//
	//         <div v-if="!widget.url && !editing">{{ 'No URL given.' | trans }}</div>
	//
	//     </div>
	//
	//     <div class="uk-text-center" v-else>
	//         <v-loader></v-loader>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    type: {

	        id: 'feed',
	        label: 'Feed',
	        description: function description() {},
	        defaults: {
	            count: 5,
	            url: 'http://pagekit.com/blog/feed',
	            content: ''
	        }

	    },

	    replace: false,

	    props: ['widget', 'editing'],

	    data: function data() {
	        return {
	            status: '',
	            feed: {}
	        };
	    },

	    filters: {

	        count: function count(entries) {
	            return entries ? entries.slice(0, this.$get('widget.count')) : [];
	        }

	    },

	    watch: {

	        'widget.url': function widgetUrl(url) {

	            if (!url) {
	                this.$parent.edit(true);
	            }

	            this.load();
	        },

	        'widget.count': function widgetCount(count, old) {
	            var entries = this.$get('feed.entries');
	            if (entries && count > old && count > entries.length) {
	                this.load();
	            }
	        }

	    },

	    ready: function ready() {
	        if (this.$get('widget.url')) {
	            this.load();
	        }
	    },

	    methods: {

	        load: function load() {

	            this.$set('feed', {});
	            this.$set('status', '');

	            if (!this.$get('widget.url')) {
	                return;
	            }

	            this.$set('status', 'loading');

	            // TODO: The Google Feed API is deprecated.
	            this.$http.jsonp('//ajax.googleapis.com/ajax/services/feed/load', { v: '1.0', q: this.$get('widget.url'), num: this.$get('widget.count') }).then(function (res) {
	                var data = res.data;

	                if (data.responseStatus === 200) {
	                    this.$set('feed', data.responseData.feed);
	                    this.$set('status', 'done');
	                } else {
	                    this.$set('status', 'error');
	                }
	            }, function () {
	                this.$set('status', 'error');
	            });
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n\n    <form class=\"pk-panel-teaser uk-form uk-form-stacked\" v-if=\"editing\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-feed-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-feed-title\" class=\"uk-width-1-1\" type=\"text\" name=\"widget[title]\" v-model=\"widget.title\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-feed-url\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-feed-url\" class=\"uk-width-1-1\" type=\"text\" name=\"url\" v-model=\"widget.url\" lazy>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-feed-count\" class=\"uk-form-label\">{{ 'Number of Posts' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <select id=\"form-feed-count\" class=\"uk-width-1-1\" v-model=\"widget.count\" number>\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                    <option value=\"10\">10</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Post Content' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"\" v-model=\"widget.content\"> {{ \"Don't show\" | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"1\" v-model=\"widget.content\"> {{ 'Show on all posts' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"2\" v-model=\"widget.content\"> {{ 'Only show on first post.' | trans }}</label>\n                </p>\n            </div>\n        </div>\n\n    </form>\n\n    <div v-show=\"status != 'loading'\">\n\n        <h3 class=\"uk-panel-title\" v-if=\"widget.title\">{{ widget.title }}</h3>\n\n        <ul class=\"uk-list uk-list-line uk-margin-remove\">\n            <li v-for=\"entry in feed.entries | count\">\n                <a :href=\"entry.link\" target=\"_blank\">{{ entry.title }}</a> <span class=\"uk-text-muted uk-text-nowrap\">{{ entry.publishedDate | relativeDate }}</span>\n\n                <p class=\"uk-margin-small-top\" v-if=\"widget.content == '1'\">{{ entry.contentSnippet }}</p>\n\n                <p class=\"uk-margin-small-top\" v-if=\"widget.content == '2'\">{{ $index == 0 ? entry.contentSnippet : '' }}</p>\n            </li>\n        </ul>\n\n        <div v-if=\"status == 'error'\">{{ 'Unable to retrieve feed data.' | trans }}</div>\n\n        <div v-if=\"!widget.url && !editing\">{{ 'No URL given.' | trans }}</div>\n\n    </div>\n\n    <div class=\"uk-text-center\" v-else>\n        <v-loader></v-loader>\n    </div>\n\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(9)
	__vue_template__ = __webpack_require__(10)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/dashboard/app/components/widget-location.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-panel-badge">
	//         <ul class="uk-subnav pk-subnav-icon">
	//             <li v-show="!editing">
	//                 <a class="pk-icon-contrast pk-icon-edit pk-icon-hover uk-hidden" :title="'Edit' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="$parent.edit"></a>
	//             </li>
	//             <li v-show="editing">
	//                 <a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="$parent.remove" v-confirm="'Delete widget?'"></a>
	//             </li>
	//             <li v-show="editing">
	//                 <a class="pk-icon-check pk-icon-hover" :title="'Close' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="$parent.save"></a>
	//             </li>
	//         </ul>
	//     </div>
	//
	//     <form class="pk-panel-teaser uk-form uk-form-stacked" v-show="editing" @submit.prevent>
	//
	//         <div class="uk-form-row">
	//             <label for="form-city" class="uk-form-label">{{ 'Location' | trans }}</label>
	//
	//             <div class="uk-form-controls">
	//                 <div v-el:autocomplete class="uk-autocomplete uk-width-1-1">
	//                     <input id="form-city" class="uk-width-1-1" type="text" :placeholder="location" v-el:location @blur="clear" autocomplete="off">
	//                 </div>
	//             </div>
	//         </div>
	//
	//         <div class="uk-form-row">
	//             <span class="uk-form-label">{{ 'Unit' | trans }}</span>
	//
	//             <div class="uk-form-controls uk-form-controls-text">
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="metric" v-model="widget.units"> {{ 'Metric' | trans }}</label>
	//                 </p>
	//
	//                 <p class="uk-form-controls-condensed">
	//                     <label><input type="radio" value="imperial" v-model="widget.units"> {{ 'Imperial' | trans }}</label>
	//                 </p>
	//             </div>
	//         </div>
	//
	//     </form>
	//
	//     <div class="pk-panel-background uk-contrast" v-if="status != 'loading'">
	//         <h1 class="uk-margin-large-top uk-margin-small-bottom uk-text-center pk-text-xlarge" v-if="time">{{ time | date format }}</h1>
	//
	//         <h2 class="uk-text-center uk-h4 uk-margin-remove" v-if="time">{{ time | date 'longDate' }}</h2>
	//         <div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//             <h3 class="uk-margin-remove" v-if="widget.city">{{ widget.city }}</h3>
	//             <h3 class="uk-flex uk-flex-middle uk-margin-remove" v-if="status=='done'">{{ temperature }} <img class="uk-margin-small-left" :src="icon" width="25" height="25" alt="Weather"></h3>
	//         </div>
	//     </div>
	//
	//     <div class="uk-text-center" v-else>
	//         <v-loader></v-loader>
	//     </div>
	//
	// </template>
	//
	// <script>

	var api = 'http://api.openweathermap.org/data/2.5',
	    apiKey = '08c012f513db564bd6d4bae94b73cc94';

	module.exports = {

	    type: {

	        id: 'location',
	        label: 'Location',
	        disableToolbar: true,
	        description: function description() {},
	        defaults: {
	            units: 'metric'
	        }

	    },

	    replace: false,

	    props: ['widget', 'editing'],

	    data: function data() {
	        return {
	            status: '',
	            timezone: {},
	            icon: '',
	            temp: 0,
	            time: 0,
	            format: 'shortTime'
	        };
	    },

	    ready: function ready() {

	        var vm = this,
	            list;

	        UIkit.autocomplete(this.$els.autocomplete, {

	            source: function source(release) {

	                vm.$http.get(api + '/find', { q: this.input.val(), type: 'like', APPID: apiKey }).then(function (res) {

	                    var data = res.data;
	                    list = data.list || [];
	                    release(list);
	                }, function () {
	                    release([]);
	                });
	            },

	            template: '<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">\
	                              {{~items}}<li :data-value="$item.name" :data-id="$item.id"><a>{{$item.name}} <span>, {{$item.sys.country}}</span></a></li>{{/items}}\
	                              {{^items.length}}<li class="uk-skip"><a class="uk-text-muted">{{msgNoResults}}</a></li>{{/end}} \
	                           </ul>',

	            renderer: function renderer(data) {

	                this.dropdown.append(this.template({ items: data || [], msgNoResults: vm.$trans('No location found.') }));
	                this.show();
	            }

	        }).on('selectitem.uk.autocomplete', function (e, data) {

	            var location = _.find(list, 'id', data.id);

	            Vue.nextTick(function () {
	                vm.$els.location.blur();
	            });

	            if (!location) {
	                return;
	            }

	            vm.$set('widget.uid', location.id);
	            vm.$set('widget.city', location.name);
	            vm.$set('widget.country', location.sys.country);
	            vm.$set('widget.coords', location.coord);
	        });

	        this.timer = setInterval(this.updateClock(), 60 * 1000);
	    },

	    watch: {

	        'widget.uid': {

	            handler: function handler(uid) {

	                if (uid === undefined) {
	                    this.$set('widget.uid', '');
	                    this.$parent.save();
	                    this.$parent.edit(true);
	                }

	                if (!uid) return;

	                this.load();
	            },
	            immediate: true

	        },

	        'timezone': 'updateClock'

	    },

	    computed: {

	        location: function location() {
	            return this.widget.city ? this.widget.city + ', ' + this.widget.country : '';
	        },

	        temperature: function temperature() {

	            if (this.widget.units !== 'imperial') {
	                return Math.round(this.temp) + ' °C';
	            }

	            return Math.round(this.temp * (9 / 5) + 32) + ' °F';
	        }

	    },

	    methods: {

	        load: function load() {

	            if (!this.widget.uid) {
	                return;
	            }

	            var weatherKey = 'weather-' + this.widget.uid;

	            if (this.$cache.get(weatherKey)) {

	                this.init(this.$cache.get(weatherKey));
	            } else {

	                this.$http.get(api + '/weather', { id: this.widget.uid, units: 'metric', APPID: apiKey }).then(function (res) {
	                    var data = res.data;
	                    if (data.cod == 200) {
	                        this.$cache.set(weatherKey, data, 60);
	                        this.init(data);
	                    } else {
	                        this.$set('status', 'error');
	                    }
	                }, function () {
	                    this.$set('status', 'error');
	                });
	            }

	            var timezoneKey = 'timezone-' + this.widget.coords.lat + this.widget.coords.lon;

	            if (this.$cache.get(timezoneKey)) {

	                this.$set('timezone', this.$cache.get(timezoneKey));
	            } else {

	                this.$http.get('https://maps.googleapis.com/maps/api/timezone/json', { location: this.widget.coords.lat + ',' + this.widget.coords.lon, timestamp: Math.floor(Date.now() / 1000) }).then(function (res) {
	                    var data = res.data;
	                    data.offset = data.rawOffset + data.dstOffset;

	                    this.$cache.set(timezoneKey, data, 1440);
	                    this.$set('timezone', data);
	                }, function () {
	                    this.$set('status', 'error');
	                });
	            }
	        },

	        init: function init(data) {

	            this.$set('temp', data.main.temp);
	            this.$set('icon', this.getIconUrl(data.weather[0].icon));
	            this.$set('status', 'done');
	        },

	        getIconUrl: function getIconUrl(icon) {

	            var icons = {

	                '01d': 'sun.svg',
	                '01n': 'moon.svg',
	                '02d': 'cloud-sun.svg',
	                '02n': 'cloud-moon.svg',
	                '03d': 'cloud.svg',
	                '03n': 'cloud.svg',
	                '04d': 'cloud.svg',
	                '04n': 'cloud.svg',
	                '09d': 'drizzle-sun.svg',
	                '09n': 'drizzle-moon.svg',
	                '10d': 'rain-sun.svg',
	                '10n': 'rain-moon.svg',
	                '11d': 'lightning.svg',
	                '11n': 'lightning.svg',
	                '13d': 'snow.svg',
	                '13n': 'snow.svg',
	                '50d': 'fog.svg',
	                '50n': 'fog.svg'

	            };

	            return this.$url('app/system/modules/dashboard/assets/images/weather-:icon', { icon: icons[icon] });
	        },

	        updateClock: function updateClock() {

	            var offset = this.$get('timezone.offset') || 0,
	                date = new Date(),
	                time = offset ? new Date(date.getTime() + date.getTimezoneOffset() * 60000 + offset * 1000) : new Date();

	            this.$set('time', time);

	            return this.updateClock;
	        },

	        clear: function clear() {
	            this.$els.location.value = '';
	        }

	    },

	    destroyed: function destroyed() {

	        clearInterval(this.timer);
	    }

	};

	// </script>
	//

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-panel-badge\">\n        <ul class=\"uk-subnav pk-subnav-icon\">\n            <li v-show=\"!editing\">\n                <a class=\"pk-icon-contrast pk-icon-edit pk-icon-hover uk-hidden\" :title=\"'Edit' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"$parent.edit\"></a>\n            </li>\n            <li v-show=\"editing\">\n                <a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"$parent.remove\" v-confirm=\"'Delete widget?'\"></a>\n            </li>\n            <li v-show=\"editing\">\n                <a class=\"pk-icon-check pk-icon-hover\" :title=\"'Close' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"$parent.save\"></a>\n            </li>\n        </ul>\n    </div>\n\n    <form class=\"pk-panel-teaser uk-form uk-form-stacked\" v-show=\"editing\" @submit.prevent>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-city\" class=\"uk-form-label\">{{ 'Location' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <div v-el:autocomplete class=\"uk-autocomplete uk-width-1-1\">\n                    <input id=\"form-city\" class=\"uk-width-1-1\" type=\"text\" :placeholder=\"location\" v-el:location @blur=\"clear\" autocomplete=\"off\">\n                </div>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Unit' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"metric\" v-model=\"widget.units\"> {{ 'Metric' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"imperial\" v-model=\"widget.units\"> {{ 'Imperial' | trans }}</label>\n                </p>\n            </div>\n        </div>\n\n    </form>\n\n    <div class=\"pk-panel-background uk-contrast\" v-if=\"status != 'loading'\">\n        <h1 class=\"uk-margin-large-top uk-margin-small-bottom uk-text-center pk-text-xlarge\" v-if=\"time\">{{ time | date format }}</h1>\n\n        <h2 class=\"uk-text-center uk-h4 uk-margin-remove\" v-if=\"time\">{{ time | date 'longDate' }}</h2>\n        <div class=\"uk-margin-large-top uk-flex uk-flex-middle uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n            <h3 class=\"uk-margin-remove\" v-if=\"widget.city\">{{ widget.city }}</h3>\n            <h3 class=\"uk-flex uk-flex-middle uk-margin-remove\" v-if=\"status=='done'\">{{ temperature }} <img class=\"uk-margin-small-left\" :src=\"icon\" width=\"25\" height=\"25\" alt=\"Weather\"></h3>\n        </div>\n    </div>\n\n    <div class=\"uk-text-center\" v-else>\n        <v-loader></v-loader>\n    </div>\n\n";

/***/ }
/******/ ]);