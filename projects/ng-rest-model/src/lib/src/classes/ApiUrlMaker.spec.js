"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiUrlMaker_1 = require("./ApiUrlMaker");
describe('ApiUrlMaker', function () {
    var maker;
    var baseUrl = 'host:8000/api';
    beforeEach(function () {
        maker = new ApiUrlMaker_1.ApiUrlMaker(baseUrl);
    });
    describe('constructor', function () {
        it('should be initialized with backend base url', function () {
            expect(maker.build()).toBe('host:8000/api');
        });
    });
    describe('one', function () {
        it('should accept string parameters', function () {
            maker.one('my', 'path');
            expect(maker.build()).toBe('host:8000/api/my/path');
        });
        it('should accept number parameters', function () {
            maker.one('my', 5);
            expect(maker.build()).toBe('host:8000/api/my/5');
        });
        it('should throw error if param is not string or number (or is empty string or not a number)', function () {
            expect(function () { return maker.one({}, 1); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one([], 1); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one(void 0, 1); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one(null, 1); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one((function () {
            }), 1); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('', 1); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one(NaN, 1); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('my', {}); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('my', []); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('my', void 0); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('my', null); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('my', (function () {
            })); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('my', ''); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.one('my', NaN); }).toThrowError('InvalidArgumentException');
        });
    });
    describe('all', function () {
        it('should accept string parameters', function () {
            maker.all('my');
            expect(maker.build()).toBe('host:8000/api/my');
        });
        it('should accept number parameters', function () {
            maker.all(7);
            expect(maker.build()).toBe('host:8000/api/7');
        });
        it('should throw error if param is not string or number (or is empty string or not a number)', function () {
            expect(function () { return maker.all({}); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.all([]); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.all(void 0); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.all(null); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.all((function () {
            })); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.all(''); }).toThrowError('InvalidArgumentException');
            expect(function () { return maker.all(NaN); }).toThrowError('InvalidArgumentException');
        });
    });
    describe('params', function () {
        it('should accept parameters and be joined after the path', function () {
            maker.one('my', 'path');
            maker.params({ rows: 20, page: 3 });
            expect(maker.build()).toBe('host:8000/api/my/path?rows=20&page=3');
        });
    });
    describe('param', function () {
        it('should accept parameters and be joined after the path', function () {
            maker.one('my', 'path');
            maker.param('rows', 20);
            maker.param('page', 3);
            expect(maker.build()).toBe('host:8000/api/my/path?rows=20&page=3');
        });
        it('should skip with no error if there is no key or is not string or number', function () {
            maker.one('my', 'path');
            maker.param('rows', 20);
            maker.param('', 3);
            maker.param(0, 3);
            maker.param(null, 3);
            maker.param(void 0, 3);
            maker.param([], 3);
            maker.param({}, 3);
            expect(maker.build()).toBe('host:8000/api/my/path?rows=20');
        });
    });
    describe('build', function () {
        it('should join parts with / and append query', function () {
            maker.one('users', '20934820394');
            maker.all('roles');
            maker.param('q', '');
            maker.params({ rows: 20, page: 3 });
            expect(maker.build()).toBe('host:8000/api/users/20934820394/roles?q=&rows=20&page=3');
        });
    });
    describe('toString', function () {
        it('should return with the result of build', function () {
            expect(maker.toString()).toBe(maker.build());
        });
    });
});
//# sourceMappingURL=ApiUrlMaker.spec.js.map