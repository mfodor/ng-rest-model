import {HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map, last} from 'rxjs/internal/operators';
import {ApiUrlMaker} from './ApiUrlMaker';
import {RestModel} from './rest-model';


export interface FileUploadRequestData {
    file: File;
    key: string;
}

export abstract class UploadRestModel<I = any> extends RestModel<I> {
    protected $upload_prefix: string;

    constructor() {
        super();
        this.$upload_prefix = this.$upload_prefix || 'upload';
    }

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
        return <any>this.http.post(url.build(), formData);
    }

    protected doUploadWithProgress(
        url: string | ApiUrlMaker,
        formData: FormData,
        onEvent?: (event: HttpEvent<any>, index: number) => any
    ): Observable<any> {
        if (typeof onEvent !== 'function') {
            onEvent = () => void 0;
        }

        // The `HttpClient.request` API produces a raw event stream
        // which includes start (sent), progress, and response events.
        return <any>this.http.post(url.toString(), formData, {reportProgress: true, observe: 'events'}).pipe(
            map(onEvent),
            // tap(onTap),
            last() // return last (completed) message to caller
            // , catchError(onError)
        );
    }

    protected uploadUrl(): ApiUrlMaker {
        return this.getUploadBaseUrl().all(this.$route);
    }

    protected propertyUploadUrl(property: string): ApiUrlMaker {
        return this.getUploadBaseUrl().one(this.$route, this.primaryValue).all(property);
    }

    protected getUploadBaseUrl(): ApiUrlMaker {
        const uploadBase = new ApiUrlMaker(this.baseUrl).all(this.$upload_prefix);
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
