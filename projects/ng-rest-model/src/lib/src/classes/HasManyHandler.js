"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/internal/operators");
var Observable_1 = require("rxjs/internal/Observable");
var index_1 = require("../helpers/index");
var index_2 = require("./index");
var HasManyHandler = /** @class */ (function () {
    function HasManyHandler(_owner, _config) {
        this._owner = _owner;
        this._config = _config;
    }
    Object.defineProperty(HasManyHandler.prototype, "list", {
        get: function () {
            if (this._list || this._config.fetch === index_2.FetchMode.EAGER) {
                return index_1.getter(this._config.async, this._list);
            }
            return this.getAll();
        },
        enumerable: true,
        configurable: true
    });
    HasManyHandler.prototype.getAll = function (options) {
        return this._list = this.fetchAll(options);
    };
    HasManyHandler.prototype.getPage = function (page, options) {
        return this.fetchPage(page, options);
    };
    HasManyHandler.prototype.setList = function (list) {
        var _this = this;
        this._list = Array.isArray(list)
            ? list.map(function (i) { return new _this._config.type().addParent(_this._owner).init(i); })
            : list;
    };
    HasManyHandler.prototype.find = function (key) {
        if (!this.listIsLoaded()) {
            return;
        }
        return this._list.find(function (i) { return i.primaryValue === key; });
    };
    HasManyHandler.prototype.find$ = function (key, options) {
        return this.fetchItem(key, options);
    };
    HasManyHandler.prototype.save = function (item, options) {
        var _this = this;
        return item.save(options).pipe(operators_1.map(function (saved) { return _this.push(saved); }));
    };
    HasManyHandler.prototype.create = function (obj, options) {
        var newItem = new this._config.type().addParent(this._owner).init(obj);
        return this.save(newItem, options);
    };
    HasManyHandler.prototype.remove = function (item, options) {
        var _this = this;
        return item.remove(options).pipe(operators_1.map(function (removed) { return _this.pull(removed); }));
    };
    HasManyHandler.prototype.push = function (item) {
        if (!this.listIsLoaded()) {
            return;
        }
        this._list.push(item);
        return item;
    };
    HasManyHandler.prototype.pull = function (item) {
        if (!this.listIsLoaded()) {
            return;
        }
        var index = this._list.findIndex(function (i) { return i.primaryValue === item.primaryValue; });
        if (index > -1) {
            this._list.splice(index, 1);
        }
        else {
            console.warn('The item was not in the list!', item, this._list);
        }
        return item;
    };
    HasManyHandler.prototype.set = function (item, key) {
        if (!this.listIsLoaded()) {
            return;
        }
        key = key || item.primaryValue;
        var index = this._list.findIndex(function (i) { return i.primaryValue === key; });
        if (index > -1) {
            this._list.splice(index, 1, item);
            return item;
        }
        else {
            console.warn('The item was not in the list!', item, this._list);
            return void 0;
        }
    };
    HasManyHandler.prototype.fetchItem = function (key, options) {
        var _this = this;
        return this.getParentedInstance().find(key, options)
            .pipe(operators_1.map(function (resp) {
            _this.set(resp);
            return resp;
        }));
    };
    HasManyHandler.prototype.fetchAll = function (options) {
        var _this = this;
        return this.getParentedInstance().all(options)
            .pipe(operators_1.map(function (resp) {
            _this.setList(resp);
            return _this._list;
        }));
    };
    HasManyHandler.prototype.fetchPage = function (page, options) {
        var _this = this;
        var instance = this.getParentedInstance();
        return instance.page(page, options)
            .pipe(operators_1.map(function (resp) {
            _this.paging = resp;
            _this.setList(resp[instance['$pagingItemsKey']]);
            return _this._list;
        }));
    };
    HasManyHandler.prototype.getParentedInstance = function () {
        return new this._config.type().addParent(this._owner);
    };
    HasManyHandler.prototype.listIsLoaded = function () {
        if (!this._list || this._list instanceof Observable_1.Observable) {
            console.warn('No list present or is not fetched yet. This has prevented item to be pushed.');
            return false;
        }
        return true;
    };
    return HasManyHandler;
}());
exports.HasManyHandler = HasManyHandler;
//# sourceMappingURL=HasManyHandler.js.map