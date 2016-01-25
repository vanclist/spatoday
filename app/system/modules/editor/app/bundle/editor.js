var Editor =
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
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/editor/app/components/editor.vue"
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
	//     <div>
	//         <textarea autocomplete="off" :style="{height: height + 'px'}" :class="{'uk-invisible': !show}" v-el:editor v-model="value"></textarea>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['type', 'value', 'options'],

	    data: function data() {
	        return {
	            editor: {},
	            height: 500
	        };
	    },

	    compiled: function compiled() {

	        if (this.options && this.options.height) {
	            this.height = this.options.height;
	        }

	        if (this.$el.hasAttributes()) {

	            var attrs = this.$el.attributes;

	            for (var i = attrs.length - 1; i >= 0; i--) {
	                this.$els.editor.setAttribute(attrs[i].name, attrs[i].value);
	                this.$el.removeAttribute(attrs[i].name);
	            }
	        }

	        var components = this.$options.components,
	            type = 'editor-' + this.type,
	            self = this,
	            Editor = components[type] || components['editor-' + window.$pagekit.editor] || components['editor-textarea'];

	        new Editor({ parent: this }).$on('ready', function () {

	            _.forIn(self.$options.components, function (Component) {
	                if (Component.options && Component.options.plugin) {
	                    new Component({ parent: self });
	                }
	            }, this);
	        });
	    },

	    components: {

	        'editor-textarea': {

	            created: function created() {
	                this.$emit('ready');
	                this.$parent.$set('show', true);
	            }

	        },
	        'editor-html': __webpack_require__(2),
	        'editor-code': __webpack_require__(3),
	        'plugin-link': __webpack_require__(4),
	        'plugin-image': __webpack_require__(11),
	        'plugin-video': __webpack_require__(18),
	        'plugin-url': __webpack_require__(25)

	    }

	};

	Vue.component('v-editor', function (resolve) {
	    resolve(module.exports);
	});

	// </script>
	//

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {

	    created: function () {

	        this.$parent.$set('height', this.$parent.height + 47);

	        this.$asset({

	            css: [
	                'app/assets/codemirror/hint.css',
	                'app/assets/codemirror/codemirror.css'
	            ],
	            js: [
	                'app/assets/codemirror/codemirror.js',
	                'app/assets/marked/marked.js',
	                'app/assets/uikit/js/components/htmleditor.min.js'
	            ]

	        }).then(function () {

	            var editor = this.$parent.editor = UIkit.htmleditor(this.$parent.$els.editor, _.extend({
	                marked: window.marked,
	                CodeMirror: window.CodeMirror
	            }, this.$parent.options));

	            editor.element
	                .on('htmleditor-save', function (e, editor) {
	                    if (editor.element[0].form) {
	                        var event = document.createEvent('HTMLEvents');
	                        event.initEvent('submit', true, false);
	                        editor.element[0].form.dispatchEvent(event);
	                    }
	                });

	            this.$watch('$parent.value', function (value) {
	                if (value != editor.editor.getValue()) {
	                    editor.editor.setValue(value);
	                }
	            });

	            this.$watch('$parent.options.markdown', function (markdown) {
	                    editor.trigger(markdown ? 'enableMarkdown' : 'disableMarkdown');
	                }, {immediate: true}
	            );

	            this.$emit('ready');
	        })

	    }

	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {

	    created: function () {

	        var self = this, $el = $(this.$parent.$els.editor), $parent = $el.parent();

	        $parent.addClass('pk-editor');

	        this.$asset({
	            css: [
	                'app/assets/codemirror/hint.css',
	                'app/assets/codemirror/codemirror.css'
	            ],
	            js: [
	                'app/assets/codemirror/codemirror.js'
	            ]

	        }).then(function () {

	            this.editor = CodeMirror.fromTextArea(this.$parent.$els.editor, _.extend({
	                mode: 'htmlmixed',
	                dragDrop: false,
	                autoCloseTags: true,
	                matchTags: true,
	                autoCloseBrackets: true,
	                matchBrackets: true,
	                indentUnit: 4,
	                indentWithTabs: false,
	                tabSize: 4
	            }, this.$parent.options));

	            $parent.attr('data-uk-check-display', 'true').on('display.uk.check', function (e) {
	                self.editor.refresh();
	            });

	            this.editor.on('change', function () {
	                self.editor.save();
	                $el.trigger('input');
	            });

	            this.$watch('$parent.value', function (value) {
	                if (value != this.editor.getValue()) {
	                    this.editor.setValue(value);
	                }
	            });

	            this.$emit('ready');

	        });
	    }

	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Link plugin.
	 */

	var Picker = Vue.extend(__webpack_require__(5));

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.$parent.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.links = [];

	        editor
	            .off('action.link')
	            .on('action.link', function (e, editor) {
	                vm.openModal(_.find(vm.links, function (link) {
	                    return link.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                var regexp = editor.getMode() != 'gfm' ? /<a(?:.+?)>(?:[^<]*)<\/a>/gi : /<a(?:.+?)>(?:[^<]*)<\/a>|(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?/gi;
	                vm.links = editor.replaceInPreview(regexp, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function () {
	                    editor.preview.find('link-preview').each(function () {
	                        vm.$compile(this);
	                    });
	                });

	            });

	    },

	    methods: {

	        openModal: function (link) {

	            var editor = this.$parent.editor, cursor = editor.editor.getCursor();

	            if (!link) {
	                link = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            new Picker({
	                parent: this,
	                data: {
	                    link: link
	                }
	            }).$mount()
	                .$appendTo('body')
	                .$on('select', function (link) {

	                    link.replace(this.$interpolate(
	                        (link.tag || editor.getCursorMode()) == 'html' ?
	                            (link.outerHTML ? link.outerHTML : '<a href="{{ link.link }}">{{ link.txt }}</a>')
	                            : '[{{ link.txt }}]({{ link.link }})'
	                        )
	                    );
	                });
	        },

	        replaceInPreview: function (data, index) {

	            if (data.matches[0][0] == '<') {

	                var anchor = $(data.matches[0]);

	                data.link = anchor.attr('href');
	                data.txt = anchor.html();
	                data.class = anchor.attr('class') || '';

	                data.outerHTML = anchor.attr('href', '{{ link.link }}').text('{{ link.txt }}')[0].outerHTML;

	            } else {

	                if (data.matches[data.matches.length - 1][data.matches[data.matches.length - 2] - 1] == '!') return false;

	                data.link = data.matches[2];
	                data.txt = data.matches[1];
	                data.class = '';

	            }

	            return '<link-preview index="' + index + '"></link-preview>';
	        }

	    },

	    components: {

	        'link-preview': __webpack_require__(8)

	    }

	};


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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/editor/app/components/link-picker.vue"
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
	//     <div>
	//         <v-modal v-ref:modal :closed="close">
	//             <form class="uk-form uk-form-stacked" @submit.prevent="update">
	//
	//                 <div class="uk-modal-header">
	//                     <h2>{{ 'Add Link' | trans }}</h2>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-link-title" class="uk-form-label">{{ 'Title' | trans }}</label>
	//                     <div class="uk-form-controls">
	//                         <input id="form-link-title" class="uk-width-1-1" type="text" v-model="link.txt">
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-link-url" class="uk-form-label">{{ 'Url' | trans }}</label>
	//                     <div class="uk-form-controls">
	//                         <input-link id="form-link-url" class="uk-width-1-1" :link.sync="link.link"></input-link>
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-modal-footer uk-text-right">
	//                     <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//                     <button class="uk-button uk-button-link" type="submit">{{ 'Update' | trans }}</button>
	//                 </div>
	//
	//             </form>
	//         </v-modal>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    data: function data() {
	        return {
	            link: { link: '', txt: '', class: '' }
	        };
	    },

	    ready: function ready() {
	        this.$refs.modal.open();
	    },

	    methods: {

	        close: function close() {
	            this.$destroy(true);
	        },

	        update: function update() {
	            this.$refs.modal.close();
	            this.$emit('select', this.link);
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n        <v-modal v-ref:modal :closed=\"close\">\n            <form class=\"uk-form uk-form-stacked\" @submit.prevent=\"update\">\n\n                <div class=\"uk-modal-header\">\n                    <h2>{{ 'Add Link' | trans }}</h2>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-link-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-link-title\" class=\"uk-width-1-1\" type=\"text\" v-model=\"link.txt\">\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-link-url\" class=\"uk-form-label\">{{ 'Url' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input-link id=\"form-link-url\" class=\"uk-width-1-1\" :link.sync=\"link.link\"></input-link>\n                    </div>\n                </div>\n\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                    <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n                </div>\n\n            </form>\n        </v-modal>\n    </div>\n\n";

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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/editor/app/components/link-preview.vue"
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
	//     <a :class="link.class" :href="link.link" @click.prevent="$parent.openModal(link)">{{{ link.txt ? link.txt : 'Select Link' | trans }}} <span class="pk-icon-link pk-icon-hover"></span></a>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['index'],

	    computed: {

	        link: function link() {
	            return this.$parent.links[this.index] || {};
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "\n\n    <a :class=\"link.class\" :href=\"link.link\" @click.prevent=\"$parent.openModal(link)\">{{{ link.txt ? link.txt : 'Select Link' | trans }}} <span class=\"pk-icon-link pk-icon-hover\"></span></a>\n\n";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Image plugin.
	 */

	var Picker = Vue.extend(__webpack_require__(12));

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.$parent.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.images = [];

	        editor
	            .off('action.image')
	            .on('action.image', function (e, editor) {
	                vm.openModal(_.find(vm.images, function (img) {
	                    return img.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                var regexp = editor.getMode() != 'gfm' ? /<img(.+?)>/gi : /(?:<img(.+?)>|!(?:\[([^\n\]]*)])(?:\(([^\n\]]*?)\))?)/gi;
	                vm.images = editor.replaceInPreview(regexp, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function () {
	                    editor.preview.find('image-preview').each(function () {
	                        vm.$compile(this);
	                    });
	                });
	            });

	    },

	    methods: {

	        openModal: function (image) {

	            var editor = this.$parent.editor, cursor = editor.editor.getCursor();

	            if (!image) {
	                image = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            new Picker({
	                parent: this,
	                data: {
	                    image: image
	                }
	            }).$mount()
	                .$appendTo('body')
	                .$on('select', function (image) {
	                    image.replace(this.$interpolate(
	                        (image.tag || editor.getCursorMode()) == 'html' ?
	                            '<img src="{{ image.src }}" alt="{{ image.alt }}">'
	                            : '![{{ image.alt }}]({{ image.src }})'
	                        )
	                    );
	                });
	        },

	        replaceInPreview: function (data, index) {

	            if (data.matches[0][0] == '<') {
	                data.src = data.matches[0].match(/src="(.*?)"/)[1];
	                data.alt = data.matches[0].match(/alt="(.*?)"/)[1];
	                data.tag = 'html';
	            } else {
	                data.src = data.matches[3];
	                data.alt = data.matches[2];
	                data.tag = 'gfm';
	            }

	            return '<image-preview index="' + index + '"></image-preview>';
	        }

	    },

	    components: {

	        'image-preview': __webpack_require__(15)

	    }

	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(13)
	__vue_template__ = __webpack_require__(14)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/editor/app/components/image-picker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div>
	//         <v-modal v-ref:modal :closed="close">
	//             <form class="uk-form uk-form-stacked" @submit.prevent="update">
	//
	//                 <div class="uk-modal-header">
	//                     <h2>{{ 'Add Image' | trans }}</h2>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <input-image :source.sync="image.src"></input-image>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-src" class="uk-form-label">{{ 'URL' | trans }}</label>
	//                     <div class="uk-form-controls">
	//                         <input id="form-src" class="uk-width-1-1" type="text" v-model="image.src" lazy>
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-alt" class="uk-form-label">{{ 'Alt' | trans }}</label>
	//                     <div class="uk-form-controls">
	//                         <input id="form-alt" class="uk-width-1-1" type="text" v-model="image.alt">
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-modal-footer uk-text-right">
	//                     <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//                     <button class="uk-button uk-button-link" type="submit">{{ 'Update' | trans }}</button>
	//                 </div>
	//
	//             </form>
	//         </v-modal>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    data: function data() {
	        return {
	            image: { src: '', alt: '' }
	        };
	    },

	    ready: function ready() {

	        this.$refs.modal.open();

	        this.$on('image-selected', function (path) {

	            if (path && !this.image.alt) {

	                var alt = path.split('/').slice(-1)[0].replace(/\.(jpeg|jpg|png|svg|gif)$/i, '').replace(/(_|-)/g, ' ').trim(),
	                    first = alt.charAt(0).toUpperCase();

	                this.image.alt = first + alt.substr(1);
	            }
	        });
	    },

	    methods: {

	        close: function close() {
	            this.$destroy(true);
	        },

	        update: function update() {
	            this.$refs.modal.close();
	            this.$emit('select', this.image);
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n        <v-modal v-ref:modal :closed=\"close\">\n            <form class=\"uk-form uk-form-stacked\" @submit.prevent=\"update\">\n\n                <div class=\"uk-modal-header\">\n                    <h2>{{ 'Add Image' | trans }}</h2>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <input-image :source.sync=\"image.src\"></input-image>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-src\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-src\" class=\"uk-width-1-1\" type=\"text\" v-model=\"image.src\" lazy>\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-alt\" class=\"uk-form-label\">{{ 'Alt' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-alt\" class=\"uk-width-1-1\" type=\"text\" v-model=\"image.alt\">\n                    </div>\n                </div>\n\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                    <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n                </div>\n\n            </form>\n        </v-modal>\n    </div>\n\n";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(16)
	__vue_template__ = __webpack_require__(17)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/editor/app/components/image-preview.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div class="uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover" v-if="!image.src">
	//
	//         <img width="60" height="60" :alt="'Placeholder Image' | trans" :src="$url('app/system/assets/images/placeholder-image.svg')">
	//         <p class="uk-text-muted uk-margin-small-top">{{ 'Add Image' | trans }}</p>
	//
	//         <a class="uk-position-cover" @click.prevent="config"></a>
	//
	//         <div class="uk-panel-badge pk-panel-badge uk-hidden">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a></li>
	//             </ul>
	//         </div>
	//
	//     </div>
	//
	//     <div class="uk-overlay uk-overlay-hover uk-visible-hover" v-else>
	//
	//         <img :src="$url(image.src)" :alt="image.alt">
	//
	//         <div class="uk-overlay-panel uk-overlay-background uk-overlay-fade"></div>
	//
	//         <a class="uk-position-cover" @click.prevent="config"></a>
	//
	//         <div class="uk-panel-badge pk-panel-badge uk-hidden">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a></li>
	//             </ul>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['index'],

	    computed: {

	        image: function image() {
	            return this.$parent.images[this.index] || {};
	        }

	    },

	    methods: {

	        config: function config() {
	            this.$parent.openModal(this.image);
	        },

	        remove: function remove() {
	            this.image.replace('');
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover\" v-if=\"!image.src\">\n\n        <img width=\"60\" height=\"60\" :alt=\"'Placeholder Image' | trans\" :src=\"$url('app/system/assets/images/placeholder-image.svg')\">\n        <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Add Image' | trans }}</p>\n\n        <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n    <div class=\"uk-overlay uk-overlay-hover uk-visible-hover\" v-else>\n\n        <img :src=\"$url(image.src)\" :alt=\"image.alt\">\n\n        <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n        <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Video plugin.
	 */

	var Picker = Vue.extend(__webpack_require__(19));

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.$parent.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.videos = [];

	        editor.addButton('video', {
	            title: 'Video',
	            label: '<i class="uk-icon-video-camera"></i>'
	        });

	        editor.options.toolbar.push('video');

	        editor
	            .on('action.video', function (e, editor) {
	                vm.openModal(_.find(vm.videos, function (vid) {
	                    return vid.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                vm.videos = editor.replaceInPreview(/\(video\)(\{.+?})/gi, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function () {
	                    editor.preview.find('video-preview').each(function () {
	                        vm.$compile(this);
	                    });
	                });

	            });


	        editor.debouncedRedraw();
	    },

	    methods: {

	        openModal: function (video) {

	            var editor = this.$parent.editor, cursor = editor.editor.getCursor();

	            if (!video) {
	                video = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            new Picker({
	                parent: this,
	                data: {
	                    video: video
	                }
	            }).$mount()
	                .$appendTo('body')
	                .$on('select', function (video) {
	                    video.replace('(video)' + JSON.stringify(video.data));
	                });
	        },

	        replaceInPreview: function (data, index) {

	            var settings;

	            try {

	                settings = JSON.parse(data.matches[1]);

	            } catch (e) {
	            }

	            data.data = settings || {src: ''};

	            return '<video-preview index="' + index + '"></video-preview>';
	        }

	    },

	    components: {

	        'video-preview': __webpack_require__(22)

	    }

	};


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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/editor/app/components/video-picker.vue"
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
	//     <div>
	//         <v-modal v-ref:modal :closed="close">
	//             <form class="uk-form uk-form-stacked" @submit.prevent="update">
	//
	//                 <div class="uk-modal-header">
	//                     <h2>{{ 'Add Video' | trans }}</h2>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <input-video :source.sync="video.data.src"></input-video>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <label for="form-src" class="uk-form-label">{{ 'URL' | trans }}</label>
	//                     <div class="uk-form-controls">
	//                         <input id="form-src" class="uk-width-1-1" type="text" :placeholder="'URL' | trans" v-model="video.data.src" debounce="500">
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-form-row">
	//                     <label><input type="checkbox" v-model="video.data.autoplay"> {{ 'Autoplay' | trans }}</label>
	//                     <label class="uk-margin-small-left" v-show="!isVimeo"><input type="checkbox" v-model="video.data.controls"> {{ 'Controls' | trans }}</label>
	//                     <label class="uk-margin-small-left"><input type="checkbox" v-model="video.data.loop"> {{ 'Loop' | trans }}</label>
	//                     <label class="uk-margin-small-left" v-show="!isVimeo && !isYoutube"><input type="checkbox" v-model="video.data.muted"> {{ 'Muted' | trans }}</label>
	//                 </div>
	//
	//                 <div class="uk-form-row" v-show="!isYoutube && !isVimeo">
	//                     <span class="uk-form-label">{{ 'Poster Image' | trans }}</span>
	//                     <div class="uk-form-controls">
	//                         <input-image class="uk-width-1-1" :source.sync="video.data.poster"></input-image>
	//                     </div>
	//                 </div>
	//
	//                 <div class="uk-modal-footer uk-text-right">
	//                     <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//                     <button class="uk-button uk-button-link" type="submit">{{ 'Update' | trans }}</button>
	//                 </div>
	//
	//             </form>
	//
	//         </v-modal>
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    data: function data() {
	        return {
	            video: { data: { src: '', controls: true } }
	        };
	    },

	    ready: function ready() {
	        this.$refs.modal.open();
	    },

	    computed: {

	        isYoutube: function isYoutube() {
	            return Boolean(this.video.data.src.match(/(?:\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/) || this.video.data.src.match(/youtu\.be\/(.*)/));
	        },

	        isVimeo: function isVimeo() {
	            return Boolean(this.video.data.src.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/));
	        }

	    },

	    methods: {

	        close: function close() {
	            this.$destroy(true);
	        },

	        update: function update() {
	            this.$refs.modal.close();

	            var vm = this;
	            _.forEach(this.video.data, function (value, key) {

	                if (_.isBoolean(value)) {
	                    vm.video.data[key] = Number(value);
	                }

	                if (!value && (key !== 'controls' || !vm.isYoutube)) {
	                    Vue.delete(vm.video.data, key);
	                }
	            });

	            this.$emit('select', this.video);
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n        <v-modal v-ref:modal :closed=\"close\">\n            <form class=\"uk-form uk-form-stacked\" @submit.prevent=\"update\">\n\n                <div class=\"uk-modal-header\">\n                    <h2>{{ 'Add Video' | trans }}</h2>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <input-video :source.sync=\"video.data.src\"></input-video>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-src\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-src\" class=\"uk-width-1-1\" type=\"text\" :placeholder=\"'URL' | trans\" v-model=\"video.data.src\" debounce=\"500\">\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label><input type=\"checkbox\" v-model=\"video.data.autoplay\"> {{ 'Autoplay' | trans }}</label>\n                    <label class=\"uk-margin-small-left\" v-show=\"!isVimeo\"><input type=\"checkbox\" v-model=\"video.data.controls\"> {{ 'Controls' | trans }}</label>\n                    <label class=\"uk-margin-small-left\"><input type=\"checkbox\" v-model=\"video.data.loop\"> {{ 'Loop' | trans }}</label>\n                    <label class=\"uk-margin-small-left\" v-show=\"!isVimeo && !isYoutube\"><input type=\"checkbox\" v-model=\"video.data.muted\"> {{ 'Muted' | trans }}</label>\n                </div>\n\n                <div class=\"uk-form-row\" v-show=\"!isYoutube && !isVimeo\">\n                    <span class=\"uk-form-label\">{{ 'Poster Image' | trans }}</span>\n                    <div class=\"uk-form-controls\">\n                        <input-image class=\"uk-width-1-1\" :source.sync=\"video.data.poster\"></input-image>\n                    </div>\n                </div>\n\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                    <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n                </div>\n\n            </form>\n\n        </v-modal>\n    </div>\n\n";

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
	  var id = "/home/vartemchuk/spatoday/app/system/modules/editor/app/components/video-preview.vue"
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
	//     <div class="uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover" v-if="!video.data.src">
	//
	//         <img width="60" height="60" :alt="'Placeholder Video' | trans" :src="$url('app/system/assets/images/placeholder-video.svg')">
	//         <p class="uk-text-muted uk-margin-small-top">{{ 'Add Video' | trans }}</p>
	//
	//         <a class="uk-position-cover" @click.prevent="config"></a>
	//
	//         <div class="uk-panel-badge pk-panel-badge uk-hidden">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a></li>
	//             </ul>
	//         </div>
	//
	//     </div>
	//
	//     <div class="uk-overlay uk-overlay-hover uk-visible-hover" v-else>
	//
	//         <img class="uk-width-1-1" :src="imageSrc" v-if="imageSrc">
	//         <video class="uk-width-1-1" :src="videoSrc" v-if="videoSrc"></video>
	//
	//         <div class="uk-overlay-panel uk-overlay-background uk-overlay-fade"></div>
	//
	//         <a class="uk-position-cover" @click.prevent="config"></a>
	//
	//         <div class="uk-panel-badge pk-panel-badge uk-hidden">
	//             <ul class="uk-subnav pk-subnav-icon">
	//                 <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a></li>
	//             </ul>
	//         </div>
	//
	//     </div>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['index'],

	    data: function data() {
	        return { imageSrc: undefined, videoSrc: undefined };
	    },

	    watch: {
	        'video.data.src': {
	            handler: 'update',
	            immediate: true
	        }
	    },

	    computed: {

	        video: function video() {
	            return this.$parent.videos[this.index] || {};
	        }

	    },

	    methods: {

	        config: function config() {
	            this.$parent.openModal(this.video);
	        },

	        remove: function remove() {
	            this.video.replace('');
	        },

	        update: function update(src) {

	            var matches;

	            this.$set('imageSrc', undefined);
	            this.$set('videoSrc', undefined);

	            src = src || '';
	            if (matches = src.match(/(?:\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/) || src.match(/youtu\.be\/(.*)/)) {

	                this.imageSrc = '//img.youtube.com/vi/' + matches[1] + '/hqdefault.jpg';
	            } else if (src.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/)) {

	                var id = btoa(src);

	                if (this.$session[id]) {

	                    this.imageSrc = this.$session[id];
	                } else {

	                    this.$http.get('http://vimeo.com/api/oembed.json', { url: src }).then(function (res) {

	                        this.imageSrc = this.$session[id] = res.data.thumbnail_url;
	                    });
	                }
	            } else {

	                this.videoSrc = this.$url(src);
	            }
	        }

	    }

	};

	// </script>
	//

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover\" v-if=\"!video.data.src\">\n\n        <img width=\"60\" height=\"60\" :alt=\"'Placeholder Video' | trans\" :src=\"$url('app/system/assets/images/placeholder-video.svg')\">\n        <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Add Video' | trans }}</p>\n\n        <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n    <div class=\"uk-overlay uk-overlay-hover uk-visible-hover\" v-else>\n\n        <img class=\"uk-width-1-1\" :src=\"imageSrc\" v-if=\"imageSrc\">\n        <video class=\"uk-width-1-1\" :src=\"videoSrc\" v-if=\"videoSrc\"></video>\n\n        <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n        <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n        <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n            <ul class=\"uk-subnav pk-subnav-icon\">\n                <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n            </ul>\n        </div>\n\n    </div>\n\n";

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * URL resolver plugin
	 */

	module.exports = {

	    plugin: true,

	    created: function () {

	        var editor = this.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        editor.element.on('renderLate', function () {

	            editor.replaceInPreview(/src=["'](.+?)["']/gi, function (data) {

	                var replacement = data.matches[0];

	                if (!data.matches[1].match(/^(\/|http:|https:|ftp:)/i)) {
	                    replacement = replacement.replace(data.matches[1], Vue.url(data.matches[1], true));
	                }

	                return replacement;
	            });

	        });

	    }

	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div>\n        <textarea autocomplete=\"off\" :style=\"{height: height + 'px'}\" :class=\"{'uk-invisible': !show}\" v-el:editor v-model=\"value\"></textarea>\n    </div>\n\n";

/***/ }
/******/ ]);