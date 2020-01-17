import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/internal/Observable';
import {Fillable} from '../annotations/Fillable';
import {HasMany} from '../annotations/HasMany';
import {Path} from '../annotations/Path';
import {FetchMode} from './FetchMode';
import {HasManyHandler} from './HasManyHandler';
import {RestModel} from './rest-model';

describe('HasManyHandler', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
        });
    });

    describe('async: false, fetch: EAGER', () => {
        @Path('others')
        class OtherModel extends RestModel<OtherModel> {
            id: number;
            @Fillable() property: string;
        }

        @Path('models')
        @HasMany({
            field: 'others',
            type: OtherModel,
            fetch: FetchMode.EAGER,
            async: false
        })
        class Model extends RestModel<Model> {
            id: number;
            @Fillable() property: string;
            others: OtherModel[];
        }

        let model: Model;
        let handler: HasManyHandler<OtherModel>;

        beforeEach(() => {
            model = new Model();
            handler = model.$hasMany.others;
        });

        describe('list getter', () => {
            it('should return synchronously', () => {
                const others = [new OtherModel().fill({id: 1, property: 'prop'})];
                model.others = others;
                expect(handler.list instanceof Observable).toBe(false);
                expect(Array.isArray(handler.list)).toBe(true);
                expect((<OtherModel[]>handler.list).length).toBe(1);
                expect(handler.list[0].equals(others[0])).toBe(true);
            });
        });

    });

    describe('getAll', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('getPage', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('setList', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('find', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('find$', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('save', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('create', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('remove', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('push', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('pull', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });

    describe('set', () => {
        it('should aaaa', () => {
            expect(true).toBe(true);
        });
    });
});
