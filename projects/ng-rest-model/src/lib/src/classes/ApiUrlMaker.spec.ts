import {ApiUrlMaker} from './ApiUrlMaker';

describe('ApiUrlMaker', () => {
    let maker: ApiUrlMaker;
    const baseUrl = 'host:8000/api';

    beforeEach(() => {
        maker = new ApiUrlMaker(baseUrl);
    });

    describe('constructor', () => {
        it('should be initialized with backend base url', () => {
            expect(maker.build()).toBe('host:8000/api');
        });
    });

    describe('one', () => {
        it('should accept string parameters', () => {
            maker.one('my', 'path');
            expect(maker.build()).toBe('host:8000/api/my/path');
        });

        it('should accept number parameters', () => {
            maker.one('my', 5);
            expect(maker.build()).toBe('host:8000/api/my/5');
        });

        it('should throw error if param is not string or number (or is empty string or not a number)', () => {
            expect(() => maker.one(<any>{}, 1)).toThrowError('InvalidArgumentException');
            expect(() => maker.one(<any>[], 1)).toThrowError('InvalidArgumentException');
            expect(() => maker.one(void 0, 1)).toThrowError('InvalidArgumentException');
            expect(() => maker.one(null, 1)).toThrowError('InvalidArgumentException');
            expect(() => maker.one(<any>(() => {
            }), 1)).toThrowError('InvalidArgumentException');
            expect(() => maker.one('', 1)).toThrowError('InvalidArgumentException');
            expect(() => maker.one(NaN, 1)).toThrowError('InvalidArgumentException');

            expect(() => maker.one('my', <any>{})).toThrowError('InvalidArgumentException');
            expect(() => maker.one('my', <any>[])).toThrowError('InvalidArgumentException');
            expect(() => maker.one('my', void 0)).toThrowError('InvalidArgumentException');
            expect(() => maker.one('my', null)).toThrowError('InvalidArgumentException');
            expect(() => maker.one('my', <any>(() => {
            }))).toThrowError('InvalidArgumentException');
            expect(() => maker.one('my', '')).toThrowError('InvalidArgumentException');
            expect(() => maker.one('my', NaN)).toThrowError('InvalidArgumentException');
        });
    });

    describe('all', () => {
        it('should accept string parameters', () => {
            maker.all('my');
            expect(maker.build()).toBe('host:8000/api/my');
        });

        it('should accept number parameters', () => {
            maker.all(7);
            expect(maker.build()).toBe('host:8000/api/7');
        });

        it('should throw error if param is not string or number (or is empty string or not a number)', () => {
            expect(() => maker.all(<any>{})).toThrowError('InvalidArgumentException');
            expect(() => maker.all(<any>[])).toThrowError('InvalidArgumentException');
            expect(() => maker.all(void 0)).toThrowError('InvalidArgumentException');
            expect(() => maker.all(null)).toThrowError('InvalidArgumentException');
            expect(() => maker.all(<any>(() => {
            }))).toThrowError('InvalidArgumentException');
            expect(() => maker.all('')).toThrowError('InvalidArgumentException');
            expect(() => maker.all(NaN)).toThrowError('InvalidArgumentException');
        });
    });

    describe('params', () => {
        it('should accept parameters and be joined after the path', () => {
            maker.one('my', 'path');
            maker.params({rows: 20, page: 3});
            expect(maker.build()).toBe('host:8000/api/my/path?rows=20&page=3');
        });
    });

    describe('param', () => {
        it('should accept parameters and be joined after the path', () => {
            maker.one('my', 'path');
            maker.param('rows', 20);
            maker.param('page', 3);
            expect(maker.build()).toBe('host:8000/api/my/path?rows=20&page=3');
        });

        it('should skip with no error if there is no key or is not string or number', () => {
            maker.one('my', 'path');
            maker.param('rows', 20);
            maker.param('', 3);
            maker.param(0, 3);
            maker.param(null, 3);
            maker.param(void 0, 3);
            maker.param(<any>[], 3);
            maker.param(<any>{}, 3);
            expect(maker.build()).toBe('host:8000/api/my/path?rows=20');
        });
    });

    describe('build', () => {
        it('should join parts with / and append query', () => {
            maker.one('users', '20934820394');
            maker.all('roles');
            maker.param('q', '');
            maker.params({rows: 20, page: 3});
            expect(maker.build()).toBe('host:8000/api/users/20934820394/roles?q=&rows=20&page=3');
        });
    });

    describe('toString', () => {
        it('should return with the result of build', () => {
            expect(maker.toString()).toBe(maker.build());
        });
    });
});
