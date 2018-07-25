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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var testing_1 = require("@angular/common/http/testing");
var testing_2 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var index_1 = require("../annotations/index");
var FetchMode_1 = require("./FetchMode");
var rest_model_1 = require("./rest-model");
describe('HasManyHandler', function () {
    beforeEach(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [
                http_1.HttpClientModule,
                testing_1.HttpClientTestingModule
            ],
        });
    });
    describe('async: false, fetch: EAGER', function () {
        var OtherModel = (function (_super) {
            __extends(OtherModel, _super);
            function OtherModel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                index_1.Fillable(),
                __metadata("design:type", String)
            ], OtherModel.prototype, "property", void 0);
            OtherModel = __decorate([
                index_1.Path('others')
            ], OtherModel);
            return OtherModel;
        }(rest_model_1.RestModel));
        var Model = (function (_super) {
            __extends(Model, _super);
            function Model() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                index_1.Fillable(),
                __metadata("design:type", String)
            ], Model.prototype, "property", void 0);
            Model = __decorate([
                index_1.Path('models'),
                index_1.HasMany({
                    field: 'others',
                    type: OtherModel,
                    fetch: FetchMode_1.FetchMode.EAGER,
                    async: false
                })
            ], Model);
            return Model;
        }(rest_model_1.RestModel));
        var model;
        var handler;
        beforeEach(function () {
            model = new Model();
            handler = model.$hasMany.others;
        });
        describe('list getter', function () {
            it('should return synchronously', function () {
                var others = [new OtherModel().fill({ id: 1, property: 'prop' })];
                model.others = others;
                expect(handler.list instanceof rxjs_1.Observable).toBe(false);
                expect(Array.isArray(handler.list)).toBe(true);
                expect(handler.list.length).toBe(1);
                expect(handler.list[0].equals(others[0])).toBe(true);
            });
        });
    });
    describe('getAll', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('getPage', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('setList', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('find', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('find$', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('save', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('create', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('remove', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('push', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('pull', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
    describe('set', function () {
        it('should aaaa', function () {
            expect(true).toBe(true);
        });
    });
});
//# sourceMappingURL=HasManyHandler.spec.js.map