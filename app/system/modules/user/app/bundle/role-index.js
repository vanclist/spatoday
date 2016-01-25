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

	module.exports = {

	    el: '#roles',

	    mixins: [
	        __webpack_require__(6)
	    ],

	    data: {
	        role: {},
	        config: window.$config
	    },

	    ready: function () {

	        $(this.$el).on('change.uk.sortable', this.reorder);

	    },

	    computed: {

	        current: function () {
	            return _.find(this.roles, 'id', this.config.role) || this.roles[0];
	        }

	    },

	    methods: {

	        edit: function (role) {
	            this.$set('role', $.extend({}, role || {}));
	            this.$refs.modal.open();
	        },

	        save: function () {
	            if (!this.role) {
	                return;
	            }

	            this.Roles.save({ id: this.role.id }, { role: this.role }).then(function (res) {

	                var data = res.data;

	                if (this.role.id) {

	                    var role = _.findIndex(this.roles, 'id', this.role.id);
	                    this.roles.splice(role, 1, data.role);

	                    this.$notify('Role saved');
	                } else {
	                    this.roles.push(data.role);
	                    this.$notify('Role added');
	                }

	            }, function (res) {
	                this.$notify(res.data, 'danger');
	            });

	            this.$refs.modal.close();
	        },

	        remove: function (role) {

	            this.Roles.remove({ id: role.id }, function () {
	                this.roles.splice(_.findIndex(this.roles, { id: role.id }), 1);
	            });
	        },

	        reorder: function (e, sortable) {

	            if (!sortable) {
	                return;
	            }

	            sortable.element.children().each(function(i) {
	                this.__vfrag__.scope.$set('role.priority', i);
	            });

	            this.Roles.save({ id: 'bulk' }, { roles: this.roles }, function (data) {
	                this.$notify('Roles reordered.');
	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        }

	    }

	};

	Vue.ready(module.exports);


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