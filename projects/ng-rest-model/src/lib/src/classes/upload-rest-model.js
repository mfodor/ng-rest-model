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
var operators_1 = require("rxjs/internal/operators");
var ng_rest_model_config_1 = require("../service/ng-rest-model-config");
var index_1 = require("./index");
var rest_model_1 = require("./rest-model");
var UploadRestModel = /** @class */ (function (_super) {
    __extends(UploadRestModel, _super);
    function UploadRestModel() {
        var _this = _super.call(this) || this;
        _this.$upload_prefix = _this.$upload_prefix || 'upload';
        return _this;
    }
    UploadRestModel.prototype.upload = function (formData) {
        return this.doUpload(this.uploadUrl(), this.createFormData(formData));
    };
    UploadRestModel.prototype.propertyUpload = function (property, formData) {
        return this.doUpload(this.propertyUploadUrl(property), this.createFormData(formData));
    };
    UploadRestModel.prototype.uploadWithProgress = function (formData, onEvent) {
        return this.doUploadWithProgress(this.uploadUrl(), this.createFormData(formData), onEvent);
    };
    UploadRestModel.prototype.propertyUploadWithProgress = function (property, formData, onEvent) {
        return this.doUploadWithProgress(this.propertyUploadUrl(property), this.createFormData(formData), onEvent);
    };
    UploadRestModel.prototype.doUpload = function (url, formData) {
        return this.http.post(url.build(), formData);
    };
    UploadRestModel.prototype.doUploadWithProgress = function (url, formData, onEvent) {
        if (typeof onEvent !== 'function') {
            onEvent = function () { return void 0; };
        }
        // The `HttpClient.request` API produces a raw event stream
        // which includes start (sent), progress, and response events.
        return this.http.post(url.toString(), formData, { reportProgress: true, observe: 'events' }).pipe(operators_1.map(onEvent), 
        // tap(onTap),
        operators_1.last() // return last (completed) message to caller
        // , catchError(onError)
        );
    };
    UploadRestModel.prototype.uploadUrl = function () {
        return this.getUploadBaseUrl().all(this.$route);
    };
    UploadRestModel.prototype.propertyUploadUrl = function (property) {
        return this.getUploadBaseUrl().one(this.$route, this.primaryValue).all(property);
    };
    UploadRestModel.prototype.getUploadBaseUrl = function () {
        var uploadBase = new index_1.ApiUrlMaker(ng_rest_model_config_1.ngRestModelBaseUrl()).all(this.$upload_prefix);
        return this.addParentRoutesTo(uploadBase);
    };
    UploadRestModel.prototype.createFormData = function (of) {
        if (of instanceof FormData) {
            return of;
        }
        if (of instanceof File) {
            of = {
                file: of,
                key: 'file'
            };
        }
        var formData = new FormData();
        formData.append(of.key, of.file);
        return formData;
    };
    return UploadRestModel;
}(rest_model_1.RestModel));
exports.UploadRestModel = UploadRestModel;
//# sourceMappingURL=upload-rest-model.js.map