"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HasManyHandler_1 = require("../classes/HasManyHandler");
var index_1 = require("../classes/index");
var index_2 = require("../helpers/index");
function HasMany(field, type, fetch, route, async) {
    var config;
    if (typeof field === 'object') {
        config = {
            type: field.type,
            route: field.route || field.field,
            fetch: field.fetch || index_1.FetchMode.LAZY,
            async: !!field.async,
            field: field.field
        };
    }
    else {
        config = {
            route: route || field,
            fetch: fetch || index_1.FetchMode.LAZY,
            async: !!async,
            type: type,
            field: field
        };
    }
    config.async = config.fetch === index_1.FetchMode.LAZY || config.async;
    return function (target, propertyKey) {
        if (typeof target !== 'function') {
            throw new Error('HasMany decorator should be applied on the class and not on the property!' +
                (" Class: " + index_2.getClassName(target) + ", property: " + propertyKey));
        }
        if (!index_1.RestModel.isPrototypeOf(target)) {
            throw new Error('HasMany decorator should be applied on a class that extends RestModel!' +
                (" But " + index_2.getClassName(target) + " is not extending it."));
        }
        if (!config.type) {
            throw new Error("HasMany: The type should be specified!" +
                (" Class: " + index_2.getClassName(target) + ", field: " + config.field));
        }
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                var $hasMany = _this['$hasMany'];
                $hasMany[config.field] = new HasManyHandler_1.HasManyHandler(_this, config);
                return _this;
            }
            Object.defineProperty(class_1.prototype, config.field, {
                get: function () {
                    return this['$hasMany'][config.field].list;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(class_1.prototype, config.field, {
                set: function (items) {
                    this['$hasMany'][config.field].setList(items);
                },
                enumerable: true,
                configurable: true
            });
            return class_1;
        }(target));
    };
}
exports.HasMany = HasMany;
//# sourceMappingURL=HasMany.js.map