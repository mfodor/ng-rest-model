import {HttpEvent, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {last} from 'rxjs/operators/last';
import {map} from 'rxjs/operators/map';
import {ApiUrlMaker, RestService} from '../../';

export interface FileUploadRequestData {
    file: File;
    key: string;
}

@Injectable()
export abstract class UploadService<I = any> extends RestService<I> {
    protected upload_prefix = 'upload';

    upload<T = any>(formData: FormData | File | FileUploadRequestData): Observable<T> {
        return this.doUpload(this.uploadUrl(), this.createFormData(formData));
    }

    propertyUpload<T = any>(property: string, formData: FormData | File | FileUploadRequestData): Observable<T> {
        return this.doUpload(this.propertyUploadUrl(property), this.createFormData(formData));
    }

    uploadWithProgress<T = any>(
        formData: FormData | File | FileUploadRequestData,
        onEvent?: (event: HttpEvent<any>, index: number) => any
    ): Observable<T> {
        return this.doUploadWithProgress(this.uploadUrl(), this.createFormData(formData), onEvent);
    }

    propertyUploadWithProgress<T = any>(
        property: string,
        formData: FormData | File | FileUploadRequestData,
        onEvent?: (event: HttpEvent<any>, index: number) => any
    ): Observable<T> {
        return this.doUploadWithProgress(this.propertyUploadUrl(property), this.createFormData(formData), onEvent);
    }

    protected doUpload(url: ApiUrlMaker, formData: FormData): Observable<any> {
        return <any>this._http.post(url.build(), formData);
    }

    protected doUploadWithProgress(
        url: string | ApiUrlMaker,
        formData: FormData,
        onEvent?: (event: HttpEvent<any>, index: number) => any
    ): Observable<any> {
        const req = new HttpRequest('POST', url.toString(), formData, {
            reportProgress: true
        });

        if (typeof onEvent !== 'function') {
            onEvent = () => void 0;
        }

        // The `HttpClient.request` API produces a raw event stream
        // which includes start (sent), progress, and response events.
        return <any>this._http.request(req).pipe(
            map(onEvent),
            // tap(onTap),
            last() // return last (completed) message to caller
            // , catchError(onError)
        );
    }

    protected uploadUrl(): ApiUrlMaker {
        return this.getUploadBaseUrl().all(this.route);
    }

    protected propertyUploadUrl(property: string): ApiUrlMaker {
        return this.getUploadBaseUrl().one(this.route, this.primaryValue).all(property);
    }

    protected getUploadBaseUrl(): ApiUrlMaker {
        const uploadBase = new ApiUrlMaker().all(this.upload_prefix);
        return this.addParentRoutesTo(uploadBase);
    }

    protected createFormData(of: FormData | File | FileUploadRequestData): FormData {
        if (of instanceof FormData) {
            return of;
        }
        if (of instanceof File) {
            of = {
                file: of,
                key: 'file'
            };
        }
        const formData = new FormData();
        formData.append(of.key, of.file);
        return formData;
    }
}
