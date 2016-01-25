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

	Vue.ready(_.merge(__webpack_require__(6), {el: '#permissions'}));


/***/ },

/***/ 6:
/***/ function(module, exports) {

	module.exports = {

	    data: function () {
	        return window.$data;
	    },

	    created: function () {

	        this.Roles = this.$resource('api/user/role/:id');

	        this.debounced = [];

	        this.saveCb = Vue.util.debounce(function() {
	            this.Roles.save({ id: 'bulk' }, { roles: this.debounced }).then(function () {
	                this.$notify('Permissions saved');
	            });

	            this.debounced = [];
	        }.bind(this), 1000);

	    },

	    computed: {

	        authenticated: function () {
	            return this.roles.filter(function (role) {
	                return role.authenticated;
	            })[0];
	        }

	    },

	    methods: {

	        savePermissions: function(role) {

	            if (!_.find(this.debounced, 'id', role.id)) {
	                this.debounced.push(role);
	            }

	            this.saveCb();
	        },

	        addPermission: function (role, permission) {
	            return !role.administrator ? role.permissions.push(permission) : null;
	        },

	        hasPermission: function (role, permission) {
	            return -1 !== role.permissions.indexOf(permission);
	        },

	        isInherited: function (role, permission) {
	            return !role.locked && this.hasPermission(this.authenticated, permission);
	        },

	        showFakeCheckbox: function (role, permission) {
	            return role.administrator || (this.isInherited(role, permission) && !this.hasPermission(role, permission));
	        }

	    }

	};


/***/ }

/******/ });