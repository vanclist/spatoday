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
	__vue_script__ = __webpack_require__(8)
	__vue_template__ = __webpack_require__(9)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/vartemchuk/spatoday/app/system/modules/site/app/components/input-link.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 8:
/***/ function(module, exports) {

	'use strict';

	// <template>
	//
	//     <div :class="[class]">
	//         <div class="pk-form-link uk-width-1-1">
	//             <input class="uk-width-1-1" type="text" v-model="link" :id="id" :name="name" v-validate:required="isRequired" v-el:input lazy>
	//             <a class="pk-form-link-toggle pk-link-icon uk-flex-middle" @click.prevent="open">{{ 'Select' | trans }} <i class="pk-icon-link pk-icon-hover uk-margin-small-left"></i></a>
	//         </div>
	//     </div>
	//
	//     <p class="uk-text-muted uk-margin-small-top uk-margin-bottom-remove" v-show="url">{{ url }}</p>
	//
	//     <v-modal v-ref:modal>
	//
	//         <form class="uk-form uk-form-stacked" @submit.prevent="update">
	//
	//             <div class="uk-modal-header">
	//                 <h2>{{ 'Select Link' | trans }}</h2>
	//             </div>
	//
	//             <panel-link v-ref:links></panel-link>
	//
	//             <div class="uk-modal-footer uk-text-right">
	//                 <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
	//                 <button class="uk-button uk-button-link" type="submit" :disabled="!showUpdate()">{{ 'Update' | trans }}</button>
	//             </div>
	//
	//         </form>
	//
	//     </v-modal>
	//
	// </template>
	//
	// <script>

	module.exports = {

	    props: ['link', 'name', 'class', 'id', 'required'],

	    data: function data() {
	        return { url: false };
	    },

	    watch: {

	        link: {
	            handler: 'load',
	            immediate: true
	        }

	    },

	    computed: {

	        isRequired: function isRequired() {
	            return this.required !== undefined;
	        }

	    },

	    methods: {

	        load: function load() {
	            if (this.link) {
	                this.$http.get('api/site/link', { link: this.link }).then(function (res) {
	                    this.url = res.data.url || false;
	                }, function () {
	                    this.url = false;
	                });
	            } else {
	                this.url = false;
	            }
	        },

	        open: function open() {
	            this.$refs.modal.open();
	        },

	        update: function update() {
	            this.$set('link', this.$refs.links.link);

	            Vue.nextTick(function () {
	                this.$els.input.dispatchEvent(new Event('input'));
	            }.bind(this));

	            this.$refs.modal.close();
	        },

	        showUpdate: function showUpdate() {
	            return !!this.$refs.links.link;
	        }

	    }

	};

	Vue.component('input-link', function (resolve) {
	    resolve(module.exports);
	});

	// </script>
	//

/***/ },

/***/ 9:
/***/ function(module, exports) {

	module.exports = "\n\n    <div :class=\"[class]\">\n        <div class=\"pk-form-link uk-width-1-1\">\n            <input class=\"uk-width-1-1\" type=\"text\" v-model=\"link\" :id=\"id\" :name=\"name\" v-validate:required=\"isRequired\" v-el:input lazy>\n            <a class=\"pk-form-link-toggle pk-link-icon uk-flex-middle\" @click.prevent=\"open\">{{ 'Select' | trans }} <i class=\"pk-icon-link pk-icon-hover uk-margin-small-left\"></i></a>\n        </div>\n    </div>\n\n    <p class=\"uk-text-muted uk-margin-small-top uk-margin-bottom-remove\" v-show=\"url\">{{ url }}</p>\n\n    <v-modal v-ref:modal>\n\n        <form class=\"uk-form uk-form-stacked\" @submit.prevent=\"update\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Select Link' | trans }}</h2>\n            </div>\n\n            <panel-link v-ref:links></panel-link>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" type=\"submit\" :disabled=\"!showUpdate()\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </form>\n\n    </v-modal>\n\n";

/***/ }

/******/ });