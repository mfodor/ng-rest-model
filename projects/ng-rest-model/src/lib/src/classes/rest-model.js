"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var index_1 = require("../../index");
var ng_rest_model_config_1 = require("../service/ng-rest-model-config");
var RestModel = /** @class */ (function () {
    /* *
     * Construction
     */
    function RestModel() {
        var _this = this;
        this.$primaryKey = 'id';
        this.$pagingItemsKey = 'data';
        this.$primaryKey = this.$primaryKey || 'id';
        this.$protected = [
            '$route', '$primaryKey', '$fillable', '$protected', '$mappingsTo', '$mappingsFrom', '$pagingItemsKey', '$parents', '$hasMany'
        ]
            .concat((this.$protected || []));
        this.$parents = this.$parents || [];
        this.$hasMany = this.$hasMany || {};
        this.$mappingsTo = this.$mappingsTo || {};
        this.$mappingsFrom = this.$mappingsFrom || {};
        ['$protected', '$parents', '$hasMany', '$mappingsTo', '$mappingsFrom'].forEach(function (p) { return Object.defineProperty(_this, p, { value: _this[p], writable: false }); });
    }
    Object.defineProperty(RestModel.prototype, "http", {
        get: function () {
            return ng_rest_model_config_1.ngRestModelHttp();
        },
        enumerable: true,
        configurable: true
    });
    RestModel.prototype.init = function (obj) {
        this.clear();
        return this.trustedFill(obj);
    };
    RestModel.prototype.clear = function () {
        var fieldsToFill = this.getFieldsToFill();
        for (var _i = 0, fieldsToFill_1 = fieldsToFill; _i < fieldsToFill_1.length; _i++) {
            var key = fieldsToFill_1[_i];
            this[key] = void 0;
        }
        this[this.$primaryKey] = void 0;
        return this;
    };
    RestModel.prototype.clone = function () {
        var clone = this._instantiate(this);
        this.$parents.forEach(function (p) { return clone.addParent(p); });
        return clone;
    };
    Object.defineProperty(RestModel.prototype, "primaryValue", {
        /* *
         * Getters and setters
         */
        get: function () {
            return this[this.$primaryKey];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestModel.prototype, "postData", {
        get: function () {
            return this.plain(true);
        },
        enumerable: true,
        configurable: true
    });
    /* *
     * General functions
     */
    RestModel.prototype.plain = function (toServer) {
        if (toServer === void 0) { toServer = false; }
        var json = {};
        for (var _i = 0, _a = this.getFieldsToFill(); _i < _a.length; _i++) {
            var key = _a[_i];
            json[this.getMappedKey(key, toServer)] = this[key];
        }
        json[this.$primaryKey] = this.primaryValue;
        return json;
    };
    RestModel.prototype.equals = function (other) {
        if (!other || typeof other !== 'object' || this.primaryValue !== other[this.$primaryKey]) {
            return false;
        }
        var fieldsToCheck = this.getFieldsToFill();
        for (var _i = 0, fieldsToCheck_1 = fieldsToCheck; _i < fieldsToCheck_1.length; _i++) {
            var f = fieldsToCheck_1[_i];
            if (this[f] !== other[f]) {
                return false;
            }
        }
        return true;
    };
    /* *
     * REST functions
     */
    // GET
    RestModel.prototype.all = function (options) {
        var _this = this;
        var obs = this.http.get(this.itemsUrl().build(), options);
        if (!options || !options.observe || options.observe === 'body') {
            return obs.map(function (items) { return items.map(_this._instantiate.bind(_this)); });
        }
        return obs;
    };
    RestModel.prototype.page = function (page, options) {
        var _this = this;
        if (!options && typeof page === 'object') {
            options = page;
            page = void 0;
        }
        var url;
        if (isNaN(+page) && typeof page === 'string') {
            url = page;
        }
        else {
            if (typeof page === 'number') {
                options = options || {};
                options.params = Object.assign(options.params || {}, { page: page });
            }
            url = this.itemsUrl().build();
        }
        var obs = this.http.get(url, options);
        if (!options || !options.observe || options.observe === 'body') {
            return obs.map(function (resp) {
                resp[_this.$pagingItemsKey] = resp[_this.$pagingItemsKey].map(_this._instantiate.bind(_this));
                return resp;
            });
        }
        return obs;
    };
    RestModel.prototype.find = function (id, options) {
        return this.http.get(this.itemUrl(id).build(), options).pipe(operators_1.map(this._instantiate.bind(this)));
    };
    RestModel.prototype.fresh = function (options) {
        return this.http.get(this.itemUrl(this.primaryValue).build(), options).pipe(operators_1.map(this.init.bind(this)));
    };
    // POST
    RestModel.prototype.create = function (options) {
        return this.http.post(this.itemsUrl().build(), this.postData, options).pipe(operators_1.map(this.init.bind(this)));
    };
    // PUT
    RestModel.prototype.update = function (options) {
        return this.http.put(this.itemUrl().build(), this.postData, options).pipe(operators_1.map(this.init.bind(this)));
    };
    RestModel.prototype.save = function (options) {
        return this.primaryValue ? this.update(options) : this.create(options);
    };
    // DELETE
    RestModel.prototype.remove = function (options) {
        return this.http.delete(this.itemUrl().build(), options).pipe(operators_1.map(this.init.bind(this)));
    };
    /* *
     * Initialization functions
     */
    RestModel.prototype.onAfterFill = function () {
        // This method is to be overridden
    };
    RestModel.prototype.fill = function (obj, clearMissing) {
        if (clearMissing === void 0) { clearMissing = false; }
        if (!obj || typeof obj !== 'object') {
            console.error('Trying to fill with non-object! This is a silence error.', obj);
            return this;
        }
        var fieldsToFill = this.getFieldsToFill();
        for (var _i = 0, fieldsToFill_2 = fieldsToFill; _i < fieldsToFill_2.length; _i++) {
            var keyInModel = fieldsToFill_2[_i];
            var keyOnServer = this.getMappedKey(keyInModel, true);
            var hasValue = obj.hasOwnProperty(keyInModel) || obj.hasOwnProperty(keyOnServer);
            var value = hasValue
                ? obj.hasOwnProperty(keyInModel) ? obj[keyInModel] : obj[keyOnServer]
                : null;
            if (clearMissing || hasValue) {
                this[keyInModel] = value;
            }
        }
        this.onAfterFill();
        return this;
    };
    RestModel.prototype.trustedFill = function (obj) {
        if (!obj || typeof obj !== 'object') {
            return this;
        }
        for (var prop in obj) {
            if (this.$protected.indexOf(prop) === -1 && obj.hasOwnProperty(prop)) {
                this[this.getMappedKey(prop)] = obj[prop];
            }
        }
        this.onAfterFill();
        return this;
    };
    /* *
     * URL generation
     */
    RestModel.prototype.addParent = function (parent) {
        this.$parents.push(parent);
        return this;
    };
    RestModel.prototype.getBaseUrl = function () {
        return this.addParentRoutesTo();
    };
    RestModel.prototype.addParentRoutesTo = function (maker) {
        maker = maker || new index_1.ApiUrlMaker(ng_rest_model_config_1.ngRestModelBaseUrl());
        if (this.$parents.length) {
            this.$parents.forEach(function (p) { return maker.one(p.$route, p.primaryValue); });
        }
        return maker;
    };
    RestModel.prototype.itemsUrl = function () {
        return this.getBaseUrl().all(this.$route);
    };
    RestModel.prototype.itemUrl = function (id) {
        if (id === void 0) { id = null; }
        return this.getBaseUrl().one(this.$route, id || this.primaryValue);
    };
    /* *
     * Overrides
     */
    RestModel.prototype.toJSON = function () {
        return this.plain();
    };
    /* *
     * Private
     */
    RestModel.prototype._instantiate = function (i) {
        return new this.constructor().init(i);
    };
    RestModel.prototype.getMappedKey = function (key, toServer) {
        if (toServer === void 0) { toServer = false; }
        if (!toServer) {
            return this.$mappingsFrom && this.$mappingsFrom[key] || key;
        }
        else {
            return this.$mappingsTo && this.$mappingsTo[key] || key;
        }
    };
    RestModel.prototype.getFieldsToFill = function () {
        if (!this.$protected || !this.$protected.length) {
            throw new Error('Overwriting or deleting $protected field is forbidden!');
        }
        var excludeKeys = this.$protected.concat(this.$primaryKey);
        return (this.$fillable || Object.keys(this))
            .filter(function (key) { return excludeKeys.indexOf(key) === -1; });
    };
    return RestModel;
}());
exports.RestModel = RestModel;
//# sourceMappingURL=rest-model.js.map