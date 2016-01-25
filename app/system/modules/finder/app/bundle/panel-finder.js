var Finder =
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
	__vue_template__ = __webpack_require__(4)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/finder/app/components/panel-finder.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <div class="uk-form" data-uk-observe v-show="items">
	//
	//         <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
	//             <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>
	//
	//                 <h2 class="uk-margin-remove" v-show="!selected.length">{{ '{0} %count% Files|{1} %count% File|]1,Inf[ %count% Files' | transChoice count {count:count} }}</h2>
	//
	//                 <h2 class="uk-margin-remove" v-else>{{ '{1} %count% File selected|]1,Inf[ %count% Files selected' | transChoice selected.length {count:selected.length} }}</h2>
	//
	//                 <div class="uk-margin-left" v-if="isWritable" v-show="selected.length">
	//                     <ul class="uk-subnav pk-subnav-icon">
	//                         <li v-show="selected.length === 1"><a class="pk-icon-edit pk-icon-hover" :title="'Rename' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="rename"></a></li>
	//                         <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove" v-confirm="'Delete files?'"></a></li>
	//                     </ul>
	//                 </div>
	//
	//                 <div class="pk-search">
	//                     <div class="uk-search">
	//                         <input class="uk-search-field" type="text" v-model="search">
	//                     </div>
	//                 </div>
	//
	//             </div>
	//             <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>
	//
	//                 <div class="uk-margin-right">
	//                     <ul class="uk-subnav pk-subnav-icon">
	//                         <li :class="{'uk-active': view == 'table'}">
	//                             <a class="pk-icon-table pk-icon-hover" :title="'Table View' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="view = 'table'"></a>
	//                         </li>
	//                         <li class="{'uk-active': view == 'thumbnail'}">
	//                             <a class="pk-icon-thumbnails pk-icon-hover" :title="'Thumbnails View' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="view = 'thumbnail'"></a>
	//                         </li>
	//                     </ul>
	//                 </div>
	//
	//                 <div>
	//                     <button class="uk-button uk-margin-small-right" @click.prevent="createFolder()">{{ 'Add Folder' | trans }}</button>
	//                     <span class="uk-button uk-form-file" :class="{'uk-button-primary': !modal}">
	//                         {{ 'Upload' | trans }}
	//                         <input type="file" name="files[]" multiple="multiple">
	//                     </span>
	//                 </div>
	//
	//             </div>
	//         </div>
	//
	//         <ul class="uk-breadcrumb uk-margin-large-top">
	//             <li v-for="bc in breadcrumbs" :class="{'uk-active': bc.current}">
	//                 <span v-show="bc.current">{{ bc.title }}</span>
	//                 <a v-else @click.prevent="setPath(bc.path)">{{ bc.title }}</a>
	//             </li>
	//         </ul>
	//
	//         <div class="uk-progress uk-progress-mini uk-margin-remove" v-show="upload.running">
	//             <div class="uk-progress-bar" :style="{width: upload.progress + '%'}"></div>
	//         </div>
	//
	//         <div class="uk-overflow-container tm-overflow-container">
	//             <partial :name="view"></partial>
	//             <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="!count">{{ 'No files found.' | trans }}</h3>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: {
	        root: { type: String, default: '/' },
	        path: { type: String, default: '/' },
	        mode: { type: String, default: 'write' },
	        view: { type: String, default: 'table' },
	        modal: Boolean
	    },

	    data: function data() {
	        return {
	            upload: {},
	            selected: [],
	            items: false,
	            search: ''
	        };
	    },

	    ready: function ready() {

	        this.resource = this.$resource('system/finder/:cmd');

	        this.load().then(function () {
	            this.$dispatch('ready.finder', this);
	        });

	        UIkit.init(this.$el);
	    },

	    watch: {

	        path: function path() {
	            this.load();
	        },

	        selected: function selected() {
	            this.$dispatch('select.finder', this.getSelected(), this);
	        },

	        search: function search() {
	            this.$set('selected', _.filter(this.selected, function (name) {
	                return _.find(this.searched, 'name', name);
	            }, this));
	        }

	    },

	    computed: {

	        breadcrumbs: function breadcrumbs() {

	            var path = '',
	                crumbs = [{ path: '/', title: this.$trans('Home') }].concat(this.path.substr(1).split('/').filter(function (str) {
	                return str.length;
	            }).map(function (part) {
	                return { path: path += '/' + part, title: part };
	            }));

	            crumbs[crumbs.length - 1].current = true;

	            return crumbs;
	        },

	        searched: function searched() {
	            return _.filter(this.items, function (file) {
	                return !this.search || file.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
	            }, this);
	        },

	        count: function count() {
	            return this.searched.length;
	        }

	    },

	    methods: {

	        /**
	         * API
	         */

	        setPath: function setPath(path) {
	            this.$set('path', path);
	        },

	        getPath: function getPath() {
	            return this.path;
	        },

	        getFullPath: function getFullPath() {
	            return (this.getRoot() + this.getPath()).replace(/^\/+|\/+$/g, '') + '/';
	        },

	        getRoot: function getRoot() {
	            return this.root.replace(/^\/+|\/+$/g, '');
	        },

	        getSelected: function getSelected() {
	            return this.selected.map(function (name) {
	                return _.find(this.items, 'name', name).url;
	            }, this);
	        },

	        removeSelection: function removeSelection() {
	            this.selected = [];
	        },

	        toggleSelect: function toggleSelect(name) {
	            var index = this.selected.indexOf(name);
	            -1 === index ? this.selected.push(name) : this.selected.splice(index, 1);
	        },

	        isSelected: function isSelected(name) {
	            return this.selected.indexOf(name.toString()) != -1;
	        },

	        createFolder: function createFolder() {

	            UIkit.modal.prompt(this.$trans('Folder Name'), '', function (name) {

	                if (!name) return;

	                this.command('createfolder', { name: name });
	            }.bind(this));
	        },

	        rename: function rename(oldname) {

	            if (oldname.target) {
	                oldname = this.selected[0];
	            }

	            if (!oldname) return;

	            UIkit.modal.prompt(this.$trans('Name'), oldname, function (newname) {

	                if (!newname) return;

	                this.command('rename', { oldname: oldname, newname: newname });
	            }.bind(this), { title: this.$trans('Rename') });
	        },

	        remove: function remove(names) {

	            if (names.target) {
	                names = this.selected;
	            }

	            if (names) {
	                this.command('removefiles', { names: names });
	            }
	        },

	        /**
	         * Helper functions
	         */

	        encodeURI: function (_encodeURI) {
	            function encodeURI(_x) {
	                return _encodeURI.apply(this, arguments);
	            }

	            encodeURI.toString = function () {
	                return _encodeURI.toString();
	            };

	            return encodeURI;
	        }(function (url) {
	            return encodeURI(url).replace(/'/g, '%27');
	        }),

	        isWritable: function isWritable() {
	            return this.mode === 'w' || this.mode === 'write';
	        },

	        isImage: function isImage(url) {
	            return url.match(/\.(?:gif|jpe?g|png|svg|ico)$/i);
	        },

	        isVideo: function isVideo(url) {
	            return url.match(/\.(mpeg|ogv|mp4|webm|wmv)$/i);
	        },

	        command: function command(cmd, params) {

	            return this.resource.save({ cmd: cmd }, $.extend({ path: this.path, root: this.getRoot() }, params)).then(function (res) {
	                this.load();
	                this.$notify(res.data.message, res.data.error ? 'danger' : '');
	            }, function (res) {
	                this.$notify(res.status == 500 ? 'Unknown error.' : res.data, 'danger');
	            });
	        },

	        load: function load() {

	            return this.resource.get({ path: this.path, root: this.getRoot() }).then(function (res) {
	                this.$set('items', res.data.items || []);
	                this.$set('selected', []);
	                this.$dispatch('path.finder', this.getFullPath(), this);
	            }, function () {
	                this.$notify('Unable to access directory.', 'danger');
	            });
	        }

	    },

	    events: {

	        /**
	         * Init upload
	         */

	        'hook:ready': function hookReady() {

	            var finder = this,
	                settings = {

	                action: this.$url.route('system/finder/upload'),

	                before: function before(options) {
	                    $.extend(options.params, { path: finder.path, root: finder.getRoot(), _csrf: $pagekit.csrf });
	                },

	                loadstart: function loadstart() {
	                    finder.$set('upload.running', true);
	                    finder.$set('upload.progress', 0);
	                },

	                progress: function progress(percent) {
	                    finder.$set('upload.progress', Math.ceil(percent));
	                },

	                allcomplete: function allcomplete(response) {

	                    var data = $.parseJSON(response);

	                    finder.load();

	                    finder.$notify(data.message, data.error ? 'danger' : '');

	                    finder.$set('upload.progress', 100);

	                    setTimeout(function () {
	                        finder.$set('upload.running', false);
	                    }, 1500);
	                }

	            };

	            UIkit.uploadSelect(this.$el.querySelector('.uk-form-file > input'), settings);
	            UIkit.uploadDrop($(this.$el).parents('.uk-modal').length ? this.$el : $('html'), settings);
	        }

	    },

	    partials: {

	        table: __webpack_require__(2),
	        thumbnail: __webpack_require__(3)

	    }

	};

	Vue.component('panel-finder', function (resolve) {
	    resolve(module.exports);
	});

	// </script>
	//

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<table class=\"uk-table uk-table-hover uk-table-middle\">\n    <thead>\n        <th class=\"pk-table-width-minimum\"><input type=\"checkbox\" v-check-all:selected.literal=\"input[name=name]\"></th>\n        <th colspan=\"2\">{{ 'Name' | trans }}</th>\n        <th class=\"pk-table-width-minimum uk-text-center\">{{ 'Size' | trans }}</th>\n        <th class=\"pk-table-width-minimum\">{{ 'Modified' | trans }}</th>\n    </thead>\n    <tbody>\n\n        <tr v-for=\"folder in searched | filterBy 'application/folder' in 'mime'\" class=\"uk-visible-hover\" :class=\"{'uk-active': isSelected(folder.name)}\" @click.prevent=\"toggleSelect(folder.name)\">\n            <td><input type=\"checkbox\" name=\"name\" :value=\"folder.name\" v-model=\"selected\" @click.stop></td>\n            <td class=\"pk-table-width-minimum\">\n                <i class=\"pk-icon-folder-circle\"></i>\n            </td>\n            <td class=\"pk-table-text-break pk-table-min-width-200\"><a @click.stop=\"setPath(folder.path)\">{{ folder.name }}</a></td>\n            <td></td>\n            <td></td>\n        </tr>\n\n        <tr v-for=\"file in searched | filterBy 'application/file' in 'mime'\" class=\"uk-visible-hover\" :class=\"{'uk-active': isSelected(file.name)}\" @click.prevent=\"toggleSelect(file.name)\">\n            <td><input type=\"checkbox\" name=\"name\" :value=\"file.name\" v-model=\"selected\" @click.stop></td>\n            <td class=\"pk-table-width-minimum\">\n                <i v-if=\"isImage(file.url)\" class=\"pk-icon-contain\" v-lazy-background=\"$url(file.url)\"></i>\n                <i v-else class=\"pk-icon-file-circle\"></i>\n            </td>\n            <td class=\"pk-table-text-break pk-table-min-width-200\">{{ file.name }}</td>\n            <td class=\"uk-text-right uk-text-nowrap\">{{ file.size }}</td>\n            <td class=\"uk-text-nowrap\">{{ file.lastmodified | relativeDate }}</td>\n        </tr>\n\n    </tbody>\n</table>\n";

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<ul v-if=\"items.length\" class=\"uk-grid uk-grid-medium uk-grid-match uk-grid-width-small-1-2 uk-grid-width-large-1-3 uk-grid-width-xlarge-1-4\" data-uk-grid-margin>\n\n    <li v-for=\"folder in searched | filterBy 'application/folder' in 'mime'\">\n        <div class=\"uk-panel uk-panel-box uk-text-center\" @click.prevent=\"toggleSelect(folder.name)\">\n            <div class=\"uk-panel-teaser uk-position-relative\">\n                <div class=\"uk-cover-background uk-position-cover pk-thumbnail-folder\"></div>\n                <canvas class=\"uk-responsive-width uk-display-block\" width=\"800\" height=\"550\"></canvas>\n            </div>\n            <div class=\"uk-text-truncate\">\n                <input type=\"checkbox\" :value=\"folder.name\" v-model=\"selected\" @click.stop>\n                <a @click.stop=\"setPath(folder.path, $event)\">{{ folder.name }}</a>\n            </div>\n        </div>\n    </li>\n\n    <li v-for=\"file in searched | filterBy 'application/file' in 'mime'\">\n        <div class=\"uk-panel uk-panel-box uk-text-center\" @click.prevent=\"toggleSelect(file.name)\">\n            <div class=\"uk-panel-teaser uk-position-relative\">\n                <div class=\"pk-background-contain uk-position-cover\" v-if=\"isImage(file.path)\" v-lazy-background=\"$url(file.url)\"></div>\n                <div class=\"uk-cover-background uk-position-cover pk-thumbnail-file\" v-else></div>\n                <canvas class=\"uk-responsive-width uk-display-block\" width=\"800\" height=\"550\"></canvas>\n            </div>\n            <div class=\"uk-text-nowrap uk-text-truncate\">\n                <input type=\"checkbox\" :value=\"file.name\" v-model=\"selected\" @click.stop>\n                {{ file.name }}\n            </div>\n        </div>\n    </li>\n\n</ul>\n";

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-form\" data-uk-observe v-show=\"items\">\n\n        <div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n            <div class=\"uk-flex uk-flex-middle uk-flex-wrap\" data-uk-margin>\n\n                <h2 class=\"uk-margin-remove\" v-show=\"!selected.length\">{{ '{0} %count% Files|{1} %count% File|]1,Inf[ %count% Files' | transChoice count {count:count} }}</h2>\n\n                <h2 class=\"uk-margin-remove\" v-else>{{ '{1} %count% File selected|]1,Inf[ %count% Files selected' | transChoice selected.length {count:selected.length} }}</h2>\n\n                <div class=\"uk-margin-left\" v-if=\"isWritable\" v-show=\"selected.length\">\n                    <ul class=\"uk-subnav pk-subnav-icon\">\n                        <li v-show=\"selected.length === 1\"><a class=\"pk-icon-edit pk-icon-hover\" :title=\"'Rename' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"rename\"></a></li>\n                        <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\" v-confirm=\"'Delete files?'\"></a></li>\n                    </ul>\n                </div>\n\n                <div class=\"pk-search\">\n                    <div class=\"uk-search\">\n                        <input class=\"uk-search-field\" type=\"text\" v-model=\"search\">\n                    </div>\n                </div>\n\n            </div>\n            <div class=\"uk-flex uk-flex-middle uk-flex-wrap\" data-uk-margin>\n\n                <div class=\"uk-margin-right\">\n                    <ul class=\"uk-subnav pk-subnav-icon\">\n                        <li :class=\"{'uk-active': view == 'table'}\">\n                            <a class=\"pk-icon-table pk-icon-hover\" :title=\"'Table View' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"view = 'table'\"></a>\n                        </li>\n                        <li class=\"{'uk-active': view == 'thumbnail'}\">\n                            <a class=\"pk-icon-thumbnails pk-icon-hover\" :title=\"'Thumbnails View' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"view = 'thumbnail'\"></a>\n                        </li>\n                    </ul>\n                </div>\n\n                <div>\n                    <button class=\"uk-button uk-margin-small-right\" @click.prevent=\"createFolder()\">{{ 'Add Folder' | trans }}</button>\n                    <span class=\"uk-button uk-form-file\" :class=\"{'uk-button-primary': !modal}\">\n                        {{ 'Upload' | trans }}\n                        <input type=\"file\" name=\"files[]\" multiple=\"multiple\">\n                    </span>\n                </div>\n\n            </div>\n        </div>\n\n        <ul class=\"uk-breadcrumb uk-margin-large-top\">\n            <li v-for=\"bc in breadcrumbs\" :class=\"{'uk-active': bc.current}\">\n                <span v-show=\"bc.current\">{{ bc.title }}</span>\n                <a v-else @click.prevent=\"setPath(bc.path)\">{{ bc.title }}</a>\n            </li>\n        </ul>\n\n        <div class=\"uk-progress uk-progress-mini uk-margin-remove\" v-show=\"upload.running\">\n            <div class=\"uk-progress-bar\" :style=\"{width: upload.progress + '%'}\"></div>\n        </div>\n\n        <div class=\"uk-overflow-container tm-overflow-container\">\n            <partial :name=\"view\"></partial>\n            <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-show=\"!count\">{{ 'No files found.' | trans }}</h3>\n        </div>\n\n    </div>\n\n";

/***/ }
/******/ ]);