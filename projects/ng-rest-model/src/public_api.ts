/*
 * Public API Surface of ng-rest-model
 */

export {BelongsTo, BelongsToConfig} from './lib/src/annotations/BelongsTo';
export {Column} from './lib/src/annotations/Column';
export {Fillable} from './lib/src/annotations/Fillable';
export {HasMany, HasManyConfig} from './lib/src/annotations/HasMany';
export {Path} from './lib/src/annotations/Path';
export {PrimaryKey} from './lib/src/annotations/PrimaryKey';
export {Protected} from './lib/src/annotations/Protected';

export {ApiUrlMaker} from './lib/src/classes/ApiUrlMaker';
export {FetchMode, TFetchMode} from './lib/src/classes/FetchMode';
export {HasManyHandler} from './lib/src/classes/HasManyHandler';
export {RestModel} from './lib/src/classes/rest-model';
export {UploadRestModel, FileUploadRequestData} from './lib/src/classes/upload-rest-model';

export {ILengthAwarePaginator} from './lib/src/interfaces/ILengthAwarePaginator';

export {NgRestModelConfig, NgRestModelService} from './lib/src/service/ng-rest-model.service';

export {NG_REST_MODEL_OPTIONS} from './lib/src/ng-rest-model.token';

export * from './lib/ng-rest-model.module';
