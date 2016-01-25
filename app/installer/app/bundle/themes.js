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

	window.Themes = _.merge(
	    __webpack_require__(1),
	    {
	        el: '#themes',
	        filters: {
	            themeorder: function (packages) {

	                var index = packages.indexOf(_.find(packages, {enabled: true}));

	                if (index !== -1) {
	                    packages.splice(0, 0, packages.splice(index, 1)[0]);
	                }

	                return packages;
	            }
	        }
	    }
	);

	Vue.ready(window.Themes);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	    mixins: [
	        __webpack_require__(2)
	    ],

	    data: function () {
	        return _.extend({
	            package: {},
	            view: false,
	            updates: null,
	            search: '',
	            status: ''
	        }, window.$data);
	    },

	    ready: function () {
	        this.load();
	    },

	    methods: {

	        load: function () {
	            this.$set('status', 'loading');

	            this.queryUpdates(this.packages).then(function (res) {
	                var data = res.data;
	                this.$set('updates', data.packages.length ? _.indexBy(data.packages, 'name') : null);
	                this.$set('status', '');
	            }, function () {
	                this.$set('status', 'error');
	            });
	        },

	        icon: function (pkg) {

	            if (pkg.extra && pkg.extra.icon) {
	                return pkg.url + '/' + pkg.extra.icon;
	            } else {
	                return this.$url('app/system/assets/images/placeholder-icon.svg');
	            }

	        },

	        image: function (pkg) {

	            if (pkg.extra && pkg.extra.image) {
	                return pkg.url + '/' + pkg.extra.image;
	            } else {
	                return this.$url('app/system/assets/images/placeholder-800x600.svg');
	            }

	        },

	        details: function (pkg) {
	            this.$set('package', pkg);
	            this.$refs.details.open();
	        },

	        settings: function (pkg) {

	            if (!pkg.settings) {
	                return;
	            }

	            var view, options;

	            _.forIn(this.$options.components, function (component, name) {

	                options = component.options || {};

	                if (options.settings && pkg.settings === name) {
	                    view = name;
	                }

	            });

	            if (view) {

	                this.$set('package', pkg);
	                this.$set('view', view);
	                this.$refs.settings.open();

	            } else {
	                window.location = pkg.settings;
	            }

	        },

	        update: function (pkg) {
	            var vm = this;

	            this.install(pkg, this.packages, function (output) {
	                if (output.status === 'success') {
	                    vm.updates.$delete(pkg.name);
	                }

	                setTimeout(function () {
	                    location.reload();
	                }, 300);
	            });
	        }

	    },

	    filters: {

	        empty: function (packages) {
	            return Vue.filter('filterBy')(packages, this.search, 'title').length === 0;
	        }

	    },

	    components: {

	        'package-upload': __webpack_require__(10),
	        'package-details': __webpack_require__(12)

	    }

	};


/***/ },
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(11)
	__vue_template__ = __webpack_require__(16)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/installer/app/components/package-upload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <a class="uk-button uk-button-primary uk-form-file">
	//         <span v-show="!progress">{{ 'Upload' | trans }}</span>
	//         <span v-else><i class="uk-icon-spinner uk-icon-spin"></i> {{ progress }}</span>
	//         <input type="file" name="file" v-el:input>
	//     </a>
	//
	//     <div class="uk-modal" v-el:modal>
	//         <div class="uk-modal-dialog">
	//
	//             <package-details :api="api" :package="package"></package-details>
	//
	//             <div class="uk-modal-footer uk-text-right">
	//                 <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//                 <button class="uk-button uk-button-link" @click.prevent="doInstall">{{ 'Install' | trans }}</button>
	//             </div>
	//
	//         </div>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    mixins: [__webpack_require__(2)],

	    props: {
	        api: { type: String, default: '' },
	        packages: Array,
	        type: String
	    },

	    data: function data() {
	        return {
	            package: {},
	            upload: null,
	            progress: ''
	        };
	    },

	    ready: function ready() {

	        var type = this.type,
	            settings = {
	            action: this.$url.route('admin/system/package/upload'),
	            type: 'json',
	            param: 'file',
	            before: function before(options) {
	                _.merge(options.params, { _csrf: $pagekit.csrf, type: type });
	            },
	            loadstart: this.onStart,
	            progress: this.onProgress,
	            allcomplete: this.onComplete
	        };

	        UIkit.uploadSelect(this.$els.input, settings);

	        this.modal = UIkit.modal(this.$els.modal);
	    },

	    methods: {

	        onStart: function onStart() {
	            this.progress = '1%';
	        },

	        onProgress: function onProgress(percent) {
	            this.progress = Math.ceil(percent) + '%';
	        },

	        onComplete: function onComplete(data) {

	            var vm = this;

	            this.progress = '100%';

	            setTimeout(function () {
	                vm.progress = '';
	            }, 250);

	            if (!data.package) {
	                this.$notify(data, 'danger');
	                return;
	            }

	            this.$set('upload', data);
	            this.$set('package', data.package);

	            this.modal.show();
	        },

	        doInstall: function doInstall() {

	            this.modal.hide();

	            this.install(this.upload.package, this.packages, function (output) {
	                if (output.status === 'success') {
	                    setTimeout(function () {
	                        location.reload();
	                    }, 300);
	                }
	            });
	        }

	    },

	    components: {

	        'package-details': __webpack_require__(12)

	    }
	};

	// </script>
	//

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(13)
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/installer/app/components/package-details.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//
	//     <div class="uk-modal-header uk-flex uk-flex-middle">
	//         <img class="uk-margin-right" width="50" height="50" :alt="package.title" :src="package | icon" v-if="package.extra.icon">
	//
	//         <div class="uk-flex-item-1">
	//             <h2 class="uk-margin-small-bottom">{{ package.title }}</h2>
	//             <ul class="uk-subnav uk-subnav-line uk-margin-bottom-remove">
	//                 <li class="uk-text-muted">{{ package.authors[0].name }}</li>
	//                 <li class="uk-text-muted">{{ 'Version %version%' | trans {version:package.version} }}</li>
	//             </ul>
	//         </div>
	//     </div>
	//
	//     <div class="uk-alert uk-alert-danger" v-show="messages.checksum">
	//         {{ 'The checksum of the uploaded package does not match the one from the marketplace. The file might be
	//         manipulated.' | trans }}
	//     </div>
	//
	//     <div class="uk-alert" v-show="messages.update">
	//         {{ 'There is an update available for the package.' | trans }}
	//     </div>
	//
	//     <p>{{ package.description }}</p>
	//
	//     <ul class="uk-list">
	//         <li v-if="package.license"><strong>{{ 'License:' | trans }}</strong> {{ package.license }}</li>
	//         <li v-if="package.authors[0].homepage"><strong>{{ 'Homepage:' | trans }}</strong>
	//             <a :href="package.authors[0].homepage" target="_blank">{{ package.authors[0].homepage }}</a></li>
	//         <li v-if="package.authors[0].email"><strong>{{ 'Email:' | trans }}</strong>
	//             <a href="mailto:{{ package.authors[0].email }}">{{ package.authors[0].email }}</a></li>
	//     </ul>
	//
	//     <img width="800" height="600" :alt="package.title" :src="package | image" v-if="package.extra.image">
	//
	// </template>
	//
	// <script>

	var Version = __webpack_require__(14);

	module.exports = {

	    props: {
	        api: {
	            type: String,
	            default: ''
	        },
	        package: {
	            type: Object,
	            default: function _default() {
	                return {};
	            }
	        }
	    },

	    data: function data() {
	        return {
	            messages: {}
	        };
	    },

	    filters: {

	        icon: function icon(pkg) {

	            var extra = pkg.extra || {};

	            if (!extra.icon) {
	                return this.$url('app/system/assets/images/placeholder-icon.svg');
	            } else if (!extra.icon.match(/^(https?:)?\//)) {
	                return pkg.url + '/' + extra.icon;
	            }

	            return extra.icon;
	        },

	        image: function image(pkg) {

	            var extra = pkg.extra || {};

	            if (!extra.image) {
	                return this.$url('app/system/assets/images/placeholder-image.svg');
	            } else if (!extra.image.match(/^(https?:)?\//)) {
	                return pkg.url + '/' + extra.image;
	            }

	            return extra.image;
	        }

	    },

	    watch: {

	        package: {

	            handler: function handler() {

	                if (!this.package.name) {
	                    return;
	                }

	                if (_.isArray(this.package.authors)) {
	                    this.package.author = this.package.authors[0];
	                }

	                this.$set('messages', {});

	                this.queryPackage(this.package, function (res) {
	                    var data = res.data;

	                    var version = this.package.version,
	                        pkg = data.versions[version];

	                    // verify checksum
	                    if (pkg && this.package.shasum) {
	                        this.messages.checksum = pkg.dist.shasum != this.package.shasum;
	                    }

	                    // check version
	                    _.each(data.versions, function (pkg) {
	                        if (Version.compare(pkg.version, version, '>')) {
	                            version = pkg.version;
	                        }
	                    });

	                    this.messages.update = version != this.package.version;
	                });
	            },

	            immediate: true

	        }
	    },

	    methods: {

	        queryPackage: function queryPackage(pkg, success) {
	            return this.$http.get(this.api + '/api/package/{+name}', {
	                name: _.isObject(pkg) ? pkg.name : pkg
	            }).then(success, this.error);
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n        <img class=\"uk-margin-right\" width=\"50\" height=\"50\" :alt=\"package.title\" :src=\"package | icon\" v-if=\"package.extra.icon\">\n\n        <div class=\"uk-flex-item-1\">\n            <h2 class=\"uk-margin-small-bottom\">{{ package.title }}</h2>\n            <ul class=\"uk-subnav uk-subnav-line uk-margin-bottom-remove\">\n                <li class=\"uk-text-muted\">{{ package.authors[0].name }}</li>\n                <li class=\"uk-text-muted\">{{ 'Version %version%' | trans {version:package.version} }}</li>\n            </ul>\n        </div>\n    </div>\n\n    <div class=\"uk-alert uk-alert-danger\" v-show=\"messages.checksum\">\n        {{ 'The checksum of the uploaded package does not match the one from the marketplace. The file might be\n        manipulated.' | trans }}\n    </div>\n\n    <div class=\"uk-alert\" v-show=\"messages.update\">\n        {{ 'There is an update available for the package.' | trans }}\n    </div>\n\n    <p>{{ package.description }}</p>\n\n    <ul class=\"uk-list\">\n        <li v-if=\"package.license\"><strong>{{ 'License:' | trans }}</strong> {{ package.license }}</li>\n        <li v-if=\"package.authors[0].homepage\"><strong>{{ 'Homepage:' | trans }}</strong>\n            <a :href=\"package.authors[0].homepage\" target=\"_blank\">{{ package.authors[0].homepage }}</a></li>\n        <li v-if=\"package.authors[0].email\"><strong>{{ 'Email:' | trans }}</strong>\n            <a href=\"mailto:{{ package.authors[0].email }}\">{{ package.authors[0].email }}</a></li>\n    </ul>\n\n    <img width=\"800\" height=\"600\" :alt=\"package.title\" :src=\"package | image\" v-if=\"package.extra.image\">\n\n";

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "\n\n    <a class=\"uk-button uk-button-primary uk-form-file\">\n        <span v-show=\"!progress\">{{ 'Upload' | trans }}</span>\n        <span v-else><i class=\"uk-icon-spinner uk-icon-spin\"></i> {{ progress }}</span>\n        <input type=\"file\" name=\"file\" v-el:input>\n    </a>\n\n    <div class=\"uk-modal\" v-el:modal>\n        <div class=\"uk-modal-dialog\">\n\n            <package-details :api=\"api\" :package=\"package\"></package-details>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" @click.prevent=\"doInstall\">{{ 'Install' | trans }}</button>\n            </div>\n\n        </div>\n    </div>\n\n";

/***/ }
/******/ ]);