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

	module.exports = {

	    el: '#marketplace',

	    data: _.extend(window.$data, {
	        search: ''
	    }),

	    components: {
	        'marketplace': __webpack_require__(17)
	    }

	};

	Vue.ready(module.exports);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Install = Vue.extend(__webpack_require__(3));
	var Uninstall = Vue.extend(__webpack_require__(7));

	module.exports = {

	    methods: {

	        queryUpdates: function (packages, success) {

	            var pkgs = {}, options = {emulateJSON: true};

	            _.each(packages, function (pkg) {
	                pkgs[pkg.name] = pkg.version;
	            });

	            return this.$http.post(this.api + '/api/package/update', {
	                packages: JSON.stringify(pkgs)
	            }, options).then(success, this.error);
	        },

	        enable: function (pkg) {
	            return this.$http.post('admin/system/package/enable', {name: pkg.name}).then(function () {
	                    this.$notify(this.$trans('"%title%" enabled.', {title: pkg.title}));
	                    Vue.set(pkg, 'enabled', true);
	                    document.location.reload();
	                }, this.error);
	        },

	        disable: function (pkg) {
	            return this.$http.post('admin/system/package/disable', {name: pkg.name})
	                .then(function () {
	                    this.$notify(this.$trans('"%title%" disabled.', {title: pkg.title}));
	                    Vue.set(pkg, 'enabled', false);
	                    document.location.reload();
	                }, this.error);
	        },

	        install: function (pkg, packages) {
	            var install = new Install({parent: this});

	            return install.install(pkg, packages);
	        },

	        uninstall: function (pkg, packages) {
	            var uninstall = new Uninstall({parent: this});

	            return uninstall.uninstall(pkg, packages);
	        },

	        error: function (message) {
	            this.$notify(message.data, 'danger');
	        }

	    }

	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(4)
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/installer/app/lib/install.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <div>
	//         <v-modal v-ref:output :options="options">
	//
	//             <div class="uk-modal-header uk-flex uk-flex-middle">
	//                 <h2>{{ 'Installing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>
	//             </div>
	//
	//             <pre class="pk-pre uk-text-break" v-html="output"></pre>
	//
	//             <v-loader v-show="status == 'loading'"></v-loader>
	//
	//             <div class="uk-alert uk-alert-success" v-show="status == 'success'">{{ 'Successfully installed.' | trans }}</div>
	//             <div class="uk-alert uk-alert-danger" v-show="status == 'error'">{{ 'Error' | trans}}</div>
	//
	//             <div class="uk-modal-footer uk-text-right" v-show="status != 'loading'">
	//                 <a class="uk-button uk-button-link" @click.prevent="close">{{ 'Close' | trans }}</a>
	//                 <a class="uk-button uk-button-primary" @click.prevent="enable" v-show="status == 'success'">{{ 'Enable' | trans }}</a>
	//             </div>
	//
	//         </v-modal>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    mixins: [__webpack_require__(5)],

	    methods: {

	        install: function install(pkg, packages, onClose) {
	            this.$set('pkg', pkg);
	            this.cb = onClose;

	            return this.$http.post('admin/system/package/install', { package: pkg }, null, { xhr: this.init() }).then(function () {
	                if (this.status === 'success' && packages) {
	                    var index = _.findIndex(packages, 'name', pkg.name);

	                    if (-1 !== index) {
	                        packages.splice(index, 1, pkg);
	                    } else {
	                        packages.push(pkg);
	                    }
	                }
	            }, function (msg) {
	                this.$notify(msg.data, 'danger');
	                this.close();
	            });
	        },

	        enable: function enable() {
	            this.$parent.enable(this.pkg);
	            this.close();
	        }
	    }

	};

	// </script>
	//

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {

	    data: function () {
	        return {
	            pkg: {},
	            output: '',
	            status: 'loading',
	            options: {
	                bgclose: false,
	                keyboard: false
	            }
	        }
	    },

	    created: function () {
	        this.$mount().$appendTo('body');
	    },

	    methods: {

	        init: function () {
	            var vm = this;

	            this.open();
	            return {
	                onprogress: function () {
	                    vm.setOutput(this.responseText);
	                }
	            }

	        },

	        setOutput: function (output) {
	            var lines = output.split("\n");
	            var match = lines[lines.length - 1].match(/^status=(success|error)$/);

	            if (match) {
	                this.status = match[1];
	                delete lines[lines.length - 1];
	                this.output = lines.join("\n");
	            } else {
	                this.output = output;
	            }
	        },

	        open: function () {
	            this.$refs.output.open();
	            this.$refs.output.modal.on('hide.uk.modal', this.onClose);
	        },

	        close: function () {
	            this.$refs.output.close();
	        },

	        onClose: function () {
	            if (this.cb) {
	                cb(this);
	            }

	            this.$destroy();
	        }

	    },

	    watch: {
	        status: function () {
	            if (this.status !== 'loading') {
	                this.$refs.output.modal.options.bgclose = true;
	                this.$refs.output.modal.options.keyboard = true;
	            }
	        }
	    }

	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n        <v-modal v-ref:output :options=\"options\">\n\n            <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n                <h2>{{ 'Installing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>\n            </div>\n\n            <pre class=\"pk-pre uk-text-break\" v-html=\"output\"></pre>\n\n            <v-loader v-show=\"status == 'loading'\"></v-loader>\n\n            <div class=\"uk-alert uk-alert-success\" v-show=\"status == 'success'\">{{ 'Successfully installed.' | trans }}</div>\n            <div class=\"uk-alert uk-alert-danger\" v-show=\"status == 'error'\">{{ 'Error' | trans}}</div>\n\n            <div class=\"uk-modal-footer uk-text-right\" v-show=\"status != 'loading'\">\n                <a class=\"uk-button uk-button-link\" @click.prevent=\"close\">{{ 'Close' | trans }}</a>\n                <a class=\"uk-button uk-button-primary\" @click.prevent=\"enable\" v-show=\"status == 'success'\">{{ 'Enable' | trans }}</a>\n            </div>\n\n        </v-modal>\n    </div>\n\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(8)
	__vue_template__ = __webpack_require__(9)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/installer/app/lib/uninstall.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <div>
	//         <v-modal v-ref:output :options="options">
	//
	//             <div class="uk-modal-header uk-flex uk-flex-middle">
	//                 <h2>{{ 'Removing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>
	//             </div>
	//
	//             <pre class="pk-pre uk-text-break" v-html="output"></pre>
	//
	//             <v-loader v-show="status == 'loading'"></v-loader>
	//
	//             <div class="uk-alert uk-alert-success" v-show="status == 'success'">{{ 'Successfully removed.' | trans }}
	//             </div>
	//             <div class="uk-alert uk-alert-danger" v-show="status == 'error'">{{ 'Error' | trans}}</div>
	//
	//             <div class="uk-modal-footer uk-text-right" v-show="status != 'loading'">
	//                 <a class="uk-button uk-button-link" @click.prevent="close">{{ 'Close' | trans }}</a>
	//             </div>
	//
	//         </v-modal>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    mixins: [__webpack_require__(5)],

	    methods: {

	        uninstall: function uninstall(pkg, packages) {
	            this.$set('pkg', pkg);

	            return this.$http.post('admin/system/package/uninstall', { name: pkg.name }, { xhr: this.init() }).then(function () {
	                if (this.status === 'success' && packages) {
	                    packages.splice(packages.indexOf(pkg), 1);
	                }
	            }, function (msg) {
	                this.$notify(msg.data, 'danger');
	                this.close();
	            });
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n        <v-modal v-ref:output :options=\"options\">\n\n            <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n                <h2>{{ 'Removing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>\n            </div>\n\n            <pre class=\"pk-pre uk-text-break\" v-html=\"output\"></pre>\n\n            <v-loader v-show=\"status == 'loading'\"></v-loader>\n\n            <div class=\"uk-alert uk-alert-success\" v-show=\"status == 'success'\">{{ 'Successfully removed.' | trans }}\n            </div>\n            <div class=\"uk-alert uk-alert-danger\" v-show=\"status == 'error'\">{{ 'Error' | trans}}</div>\n\n            <div class=\"uk-modal-footer uk-text-right\" v-show=\"status != 'loading'\">\n                <a class=\"uk-button uk-button-link\" @click.prevent=\"close\">{{ 'Close' | trans }}</a>\n            </div>\n\n        </v-modal>\n    </div>\n\n";

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(18)
	__vue_template__ = __webpack_require__(19)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/installer/app/components/marketplace.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <div>
	//
	//         <div class="uk-grid uk-grid-medium uk-grid-match uk-grid-width-small-1-2 uk-grid-width-xlarge-1-3" data-uk-grid-margin id="123">
	//             <div v-for="pkg in packages">
	//                 <div class="uk-panel uk-panel-box uk-overlay-hover">
	//
	//                     <div class="uk-panel-teaser">
	//                         <div class="uk-overlay uk-display-block">
	//                             <div class="uk-cover-background uk-position-cover" :style="{'background-image': 'url('+pkg.extra.image+')'}"></div>
	//                             <canvas class="uk-responsive-width uk-display-block" width="800" height="550"></canvas>
	//                             <div class="uk-overlay-panel uk-overlay-background pk-overlay-background uk-overlay-fade"></div>
	//                         </div>
	//                     </div>
	//
	//                     <h2 class="uk-panel-title uk-margin-remove">{{ pkg.title }}</h2>
	//
	//                     <p class="uk-text-muted uk-margin-remove">{{ pkg.author.name }}</p>
	//                     <a class="uk-position-cover" @click="details(pkg)"></a>
	//
	//                 </div>
	//             </div>
	//         </div>
	//
	//         <v-pagination :page.sync="page" :pages="pages" v-show="pages > 1"></v-pagination>
	//
	//         <div class="uk-modal" v-el:modal>
	//             <div class="uk-modal-dialog uk-modal-dialog-large">
	//
	//                 <div class="pk-modal-dialog-badge">
	//                     <button class="uk-button" disabled v-show="isInstalled(pkg)">{{ 'Installed' | trans }}</button>
	//                     <button class="uk-button uk-button-primary" @click="doInstall(pkg)" v-else>{{ 'Install' | trans }}</button>
	//                 </div>
	//
	//                 <div class="uk-modal-header">
	//                     <h2 class="uk-margin-small-bottom">{{ pkg.title }}</h2>
	//                     <ul class="uk-subnav uk-subnav-line uk-margin-bottom-remove">
	//                         <li class="uk-text-muted">{{ pkg.author.name }}</li>
	//                         <li class="uk-text-muted">{{ 'Version %version%' | trans {version:pkg.version} }}</li>
	//                     </ul>
	//                 </div>
	//
	//                 <div class="uk-grid">
	//                     <div class="uk-width-medium-1-2">
	//                         <img width="800" height="600" :alt="pkg.title" :src="pkg.extra.image">
	//                     </div>
	//                     <div class="uk-width-medium-1-2">
	//                         <div>{{ pkg.description }}</div>
	//
	//
	//                         <ul class="uk-list">
	//                             <li v-if="pkg.license"><strong>{{ 'License:' | trans }}</strong> {{ pkg.license }}</li>
	//                             <li v-if="pkg.author.homepage"><strong>{{ 'Homepage:' | trans }}</strong> <a :href="pkg.author.homepage" target="_blank">{{ pkg.author.homepage }}</a></li>
	//                             <li v-if="pkg.author.email"><strong>{{ 'Email:' | trans }}</strong> <a href="mailto:{{ pkg.author.email }}">{{ pkg.author.email }}</a></li>
	//                         </ul>
	//
	//                     </div>
	//                 </div>
	//
	//             </div>
	//         </div>
	//
	//         <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="!packages.length">{{ 'Nothing found.' | trans }}</h3>
	//
	//         <p class="uk-alert uk-alert-warning" v-show="status == 'error'">{{ 'Cannot connect to the marketplace. Please try again later.' | trans }}</p>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    mixins: [__webpack_require__(2)],

	    props: {
	        api: { type: String, default: '' },
	        search: { type: String, default: '' },
	        type: { type: String, default: 'pagekit-extension' },
	        installed: {
	            type: Array, default: function _default() {
	                return [];
	            }
	        }
	    },

	    data: function data() {
	        return {
	            pkg: null,
	            packages: null,
	            updates: null,
	            page: 0,
	            pages: 0,
	            iframe: '',
	            status: ''
	        };
	    },

	    created: function created() {
	        this.query();
	        this.queryUpdates(this.installed, function (res) {
	            var data = res.data;
	            this.$set('updates', data.packages.length ? data.packages : null);
	        });
	    },

	    watch: {

	        search: function search() {
	            this.query();
	        },

	        type: function type() {
	            this.query();
	        },

	        page: function page() {
	            this.query(this.page);
	        }

	    },

	    methods: {

	        query: function query(page) {

	            var url = this.api + '/api/package/search',
	                options = { emulateJSON: true };

	            this.$http.post(url, { q: this.search, type: this.type, page: page || 0 }, options).then(function (res) {
	                var data = res.data;
	                this.$set('packages', data.packages);
	                this.$set('pages', data.pages);
	            }, function () {
	                this.$set('packages', null);
	                this.$set('status', 'error');
	            });
	        },

	        details: function details(pkg) {

	            if (!this.modal) {
	                this.modal = UIkit.modal(this.$els.modal);
	            }

	            this.$set('pkg', pkg);
	            this.$set('status', '');

	            this.modal.show();
	        },

	        doInstall: function doInstall(pkg) {

	            this.modal.hide();
	            this.install(pkg, this.installed);
	        },

	        isInstalled: function isInstalled(pkg) {
	            return _.isObject(pkg) ? _.find(this.installed, 'name', pkg.name) : undefined;
	        }
	    }

	};

	// </script>
	//

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n\n        <div class=\"uk-grid uk-grid-medium uk-grid-match uk-grid-width-small-1-2 uk-grid-width-xlarge-1-3\" data-uk-grid-margin id=\"123\">\n            <div v-for=\"pkg in packages\">\n                <div class=\"uk-panel uk-panel-box uk-overlay-hover\">\n\n                    <div class=\"uk-panel-teaser\">\n                        <div class=\"uk-overlay uk-display-block\">\n                            <div class=\"uk-cover-background uk-position-cover\" :style=\"{'background-image': 'url('+pkg.extra.image+')'}\"></div>\n                            <canvas class=\"uk-responsive-width uk-display-block\" width=\"800\" height=\"550\"></canvas>\n                            <div class=\"uk-overlay-panel uk-overlay-background pk-overlay-background uk-overlay-fade\"></div>\n                        </div>\n                    </div>\n\n                    <h2 class=\"uk-panel-title uk-margin-remove\">{{ pkg.title }}</h2>\n\n                    <p class=\"uk-text-muted uk-margin-remove\">{{ pkg.author.name }}</p>\n                    <a class=\"uk-position-cover\" @click=\"details(pkg)\"></a>\n\n                </div>\n            </div>\n        </div>\n\n        <v-pagination :page.sync=\"page\" :pages=\"pages\" v-show=\"pages > 1\"></v-pagination>\n\n        <div class=\"uk-modal\" v-el:modal>\n            <div class=\"uk-modal-dialog uk-modal-dialog-large\">\n\n                <div class=\"pk-modal-dialog-badge\">\n                    <button class=\"uk-button\" disabled v-show=\"isInstalled(pkg)\">{{ 'Installed' | trans }}</button>\n                    <button class=\"uk-button uk-button-primary\" @click=\"doInstall(pkg)\" v-else>{{ 'Install' | trans }}</button>\n                </div>\n\n                <div class=\"uk-modal-header\">\n                    <h2 class=\"uk-margin-small-bottom\">{{ pkg.title }}</h2>\n                    <ul class=\"uk-subnav uk-subnav-line uk-margin-bottom-remove\">\n                        <li class=\"uk-text-muted\">{{ pkg.author.name }}</li>\n                        <li class=\"uk-text-muted\">{{ 'Version %version%' | trans {version:pkg.version} }}</li>\n                    </ul>\n                </div>\n\n                <div class=\"uk-grid\">\n                    <div class=\"uk-width-medium-1-2\">\n                        <img width=\"800\" height=\"600\" :alt=\"pkg.title\" :src=\"pkg.extra.image\">\n                    </div>\n                    <div class=\"uk-width-medium-1-2\">\n                        <div>{{ pkg.description }}</div>\n\n\n                        <ul class=\"uk-list\">\n                            <li v-if=\"pkg.license\"><strong>{{ 'License:' | trans }}</strong> {{ pkg.license }}</li>\n                            <li v-if=\"pkg.author.homepage\"><strong>{{ 'Homepage:' | trans }}</strong> <a :href=\"pkg.author.homepage\" target=\"_blank\">{{ pkg.author.homepage }}</a></li>\n                            <li v-if=\"pkg.author.email\"><strong>{{ 'Email:' | trans }}</strong> <a href=\"mailto:{{ pkg.author.email }}\">{{ pkg.author.email }}</a></li>\n                        </ul>\n\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-show=\"!packages.length\">{{ 'Nothing found.' | trans }}</h3>\n\n        <p class=\"uk-alert uk-alert-warning\" v-show=\"status == 'error'\">{{ 'Cannot connect to the marketplace. Please try again later.' | trans }}</p>\n\n    </div>\n\n";

/***/ }
/******/ ]);