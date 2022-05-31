//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.15.10.0 (NJsonSchema v10.6.10.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class ClientConfiguration {
  constructor(public accessToken: string) {}
}

export class ClientBase {
  constructor(private clientConfiguration: ClientConfiguration) {}
  private cacheableResponse = false;
  private cacheStrategy: "CacheFirst" | "NetworkFirst" = "NetworkFirst";
  private cacheAllowStatuses: number[] = [200];
  private cacheableOptions: RequestInit = null;
  private responseCallbackMap: Record<
    number,
    (response: Response) => void | Promise<void>
  > = null;
  private signal: AbortSignal = null;
  private customHeaders: Record<string, string> = {};

  public setCacheableResponse(
    cacheStrategy: ClientBase["cacheStrategy"] = "NetworkFirst",
    cacheAllowStatuses: ClientBase["cacheAllowStatuses"] = [200]
  ) {
    this.cacheableResponse = true;
    this.cacheStrategy = cacheStrategy;
    this.cacheAllowStatuses = cacheAllowStatuses;
  }

  public setStatusCallbackMap(
    responseCallbackMap: ClientBase["responseCallbackMap"]
  ) {
    this.responseCallbackMap = responseCallbackMap;
  }

  public setAbortSignal(signal: AbortSignal) {
    this.signal = signal;
  }

  public addCustomHeader(key: string, value: string) {
    this.customHeaders[key] = value;
  }

  protected async transformOptions(options: RequestInit): Promise<RequestInit> {
    if (this.signal != null) options.signal = this.signal;

    if (options.headers) {
      Object.entries(this.customHeaders).forEach(([key, value]) => {
        (options.headers as Record<string, string>)[key] = value;
      });
    } else {
      options.headers = this.customHeaders;
    }

    if (this.clientConfiguration.accessToken) {
      (options.headers as Record<string, string>)["Authorization"] =
        "Bearer " + this.clientConfiguration.accessToken;
    }

    if (this.cacheableResponse) {
      this.cacheableOptions = options;
    }

    return options;
  }

  protected async transformResult(
    url: string,
    networkResponse: Response,
    clientProcessCallback: (response: Response) => Promise<any>
  ) {
    const response = await this.checkCache(url, networkResponse);
    const hasBeenHandled = await this.checkStatusCallback(response);

    if (hasBeenHandled !== null) {
      return hasBeenHandled;
    }
    return await clientProcessCallback(response);
  }

  private async putToCache(
    request: Request,
    response: Response
  ): Promise<Response> {
    const cache = await caches.open("nswagts.v1");
    const cloned = response.clone();
    await cache.put(request, response);

    return cloned;
  }

  private async checkCache(url: string, networkResponse: Response) {
    let response: Response = networkResponse;
    if (!process.browser || !this.cacheableResponse) {
      return response;
    }
    console.debug("NswagTs transformResult cacheableResponse executing...");

    const request = new Request(url, this.cacheableOptions);

    const cacheResponse = await caches.match(request);

    const networkOk = this.cacheAllowStatuses.includes(
      networkResponse?.status ?? 0
    );
    const cacheOk = this.cacheAllowStatuses.includes(
      cacheResponse?.status ?? 0
    );

    if (this.cacheStrategy === "CacheFirst") {
      if (cacheOk) {
        console.debug(
          "NswagTs transformResult cacheableResponse cache first using cache",
          cacheResponse
        );
        response = cacheResponse;
      } else {
        console.debug(
          "NswagTs transformResult cacheableResponse cache first using network",
          networkResponse
        );
        response = networkOk
          ? await this.putToCache(request, networkResponse)
          : networkResponse;
      }
    } else if (this.cacheStrategy === "NetworkFirst") {
      if (networkOk) {
        console.debug(
          "NswagTs transformResult cacheableResponse network first using network ok",
          networkResponse
        );
        response = await this.putToCache(request, networkResponse);
      } else if (cacheOk) {
        console.debug(
          "NswagTs transformResult cacheableResponse network first using cache",
          cacheResponse
        );
        response = cacheResponse;
      } else {
        console.debug(
          "NswagTs transformResult cacheableResponse network first using network failure",
          networkResponse
        );
        response = networkResponse;
      }
    }
    this.cacheableResponse = false;
  }

  private async checkStatusCallback(response: Response): Promise<unknown> {
    if (this.responseCallbackMap == null) return null;

    if (
      Object.keys(this.responseCallbackMap).includes(response.status.toString())
    ) {
      const db = this.responseCallbackMap[response.status];

      const result = await db(response);

      return result;
    }

    return null;
  }
}

export class AuthFetchClient extends ClientBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(configuration: ClientConfiguration, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(configuration);
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    auth_Login(signal?: AbortSignal | undefined): Promise<string> {
        let url_ = this.baseUrl + "/api/Auth";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processAuth_Login(_response));
        });
    }

    protected processAuth_Login(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as string;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    auth_CheckAuth(signal?: AbortSignal | undefined): Promise<boolean> {
        let url_ = this.baseUrl + "/api/Auth";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PUT",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processAuth_CheckAuth(_response));
        });
    }

    protected processAuth_CheckAuth(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as boolean;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(null as any);
    }
}

export class ExampleChildFetchClient extends ClientBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(configuration: ClientConfiguration, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(configuration);
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    exampleChild_CreateChild(command: CreateExampleChildCommand, signal?: AbortSignal | undefined): Promise<number> {
        let url_ = this.baseUrl + "/api/ExampleChild";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            signal,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processExampleChild_CreateChild(_response));
        });
    }

    protected processExampleChild_CreateChild(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    exampleChild_GetAllChildren(signal?: AbortSignal | undefined): Promise<BaseExampleChildQueryDto[]> {
        let url_ = this.baseUrl + "/api/ExampleChild";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processExampleChild_GetAllChildren(_response));
        });
    }

    protected processExampleChild_GetAllChildren(response: Response): Promise<BaseExampleChildQueryDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as BaseExampleChildQueryDto[];
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<BaseExampleChildQueryDto[]>(null as any);
    }

    exampleChild_UpdateChild(id: number, command: UpdateExampleChildCommand, signal?: AbortSignal | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/ExampleChild/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            signal,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processExampleChild_UpdateChild(_response));
        });
    }

    protected processExampleChild_UpdateChild(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    exampleChild_DeleteChild(id: number, signal?: AbortSignal | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/ExampleChild/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            signal,
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processExampleChild_DeleteChild(_response));
        });
    }

    protected processExampleChild_DeleteChild(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    exampleChild_GetChildDetails(id: number, signal?: AbortSignal | undefined): Promise<ExampleChildDetailsQueryDto> {
        let url_ = this.baseUrl + "/api/ExampleChild/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processExampleChild_GetChildDetails(_response));
        });
    }

    protected processExampleChild_GetChildDetails(response: Response): Promise<ExampleChildDetailsQueryDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ExampleChildDetailsQueryDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ExampleChildDetailsQueryDto>(null as any);
    }
}

export class ExampleChildListFetchClient extends ClientBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(configuration: ClientConfiguration, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(configuration);
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    exampleChildList_CreateParent(command: CreateExampleParentCommand, signal?: AbortSignal | undefined): Promise<number> {
        let url_ = this.baseUrl + "/api/ExampleChildList";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            signal,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processExampleChildList_CreateParent(_response));
        });
    }

    protected processExampleChildList_CreateParent(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }
}

export class HealthFetchClient extends ClientBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(configuration: ClientConfiguration, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(configuration);
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    health_GetBackendHealth(signal?: AbortSignal | undefined): Promise<boolean> {
        let url_ = this.baseUrl + "/api/Health";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processHealth_GetBackendHealth(_response));
        });
    }

    protected processHealth_GetBackendHealth(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as boolean;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(null as any);
    }
}

export class ItemFetchClient extends ClientBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(configuration: ClientConfiguration, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(configuration);
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    item_CreateItem(command: CreateItemCommand, signal?: AbortSignal | undefined): Promise<number> {
        let url_ = this.baseUrl + "/api/Item";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            signal,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processItem_CreateItem(_response));
        });
    }

    protected processItem_CreateItem(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    item_GetAllItems(signal?: AbortSignal | undefined): Promise<ItemIdDto[]> {
        let url_ = this.baseUrl + "/api/Item";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processItem_GetAllItems(_response));
        });
    }

    protected processItem_GetAllItems(response: Response): Promise<ItemIdDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ItemIdDto[];
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ItemIdDto[]>(null as any);
    }

    item_UploadImages(itemId: number, files?: FileParameter[] | null | undefined, signal?: AbortSignal | undefined): Promise<ImageIdDto[]> {
        let url_ = this.baseUrl + "/api/Item/{itemId}";
        if (itemId === undefined || itemId === null)
            throw new Error("The parameter 'itemId' must be defined.");
        url_ = url_.replace("{itemId}", encodeURIComponent("" + itemId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (files !== null && files !== undefined)
            files.forEach(item_ => content_.append("files", item_.data, item_.fileName ? item_.fileName : "files") );

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processItem_UploadImages(_response));
        });
    }

    protected processItem_UploadImages(response: Response): Promise<ImageIdDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ImageIdDto[];
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ImageIdDto[]>(null as any);
    }

    item_EditItem(itemId: number, editItemDto: EditItemDto, signal?: AbortSignal | undefined): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Item/{itemId}";
        if (itemId === undefined || itemId === null)
            throw new Error("The parameter 'itemId' must be defined.");
        url_ = url_.replace("{itemId}", encodeURIComponent("" + itemId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(editItemDto);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            signal,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processItem_EditItem(_response));
        });
    }

    protected processItem_EditItem(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export class UserFetchClient extends ClientBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(configuration: ClientConfiguration, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(configuration);
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    user_CreateParent(command: CreateUserCommand, signal?: AbortSignal | undefined): Promise<number> {
        let url_ = this.baseUrl + "/api/User";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            signal,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processUser_CreateParent(_response));
        });
    }

    protected processUser_CreateParent(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    user_GetAllUsers(signal?: AbortSignal | undefined): Promise<UserIdDto[]> {
        let url_ = this.baseUrl + "/api/User";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            signal,
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processUser_GetAllUsers(_response));
        });
    }

    protected processUser_GetAllUsers(response: Response): Promise<UserIdDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as UserIdDto[];
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserIdDto[]>(null as any);
    }
}

export interface CreateExampleChildCommand {
    child?: ExampleChildInputDto | null;
}

export interface ExampleChildInputDto {
    name?: string | null;
    type?: ExampleEnum;
    parentId?: number;
}

export enum ExampleEnum {
    Youngest = 0,
    Middle = 1,
    Oldest = 2,
}

export interface UpdateExampleChildCommand {
    child?: ExampleChildInputDto | null;
}

export interface BaseExampleChildQueryDto {
    id?: number;
    name?: string | null;
}

export interface ExampleChildDetailsQueryDto extends BaseExampleChildQueryDto {
    type?: ExampleEnum;
    parent?: ExampleChildParentDto | null;
}

export interface ExampleChildParentDto {
    id?: number;
    name?: string | null;
}

export interface CreateExampleParentCommand {
    name?: string | null;
}

export interface CreateItemCommand {
    name?: string | null;
    totalInStock?: number;
    amountLentOut?: number;
    usedInOffice?: number;
}

export interface ImageIdDto {
    id?: number;
    imageGalleryId?: number;
    index?: number;
    filePath?: string | null;
}

export interface EditItemDto {
    name?: string | null;
    totalInStock?: number;
    usedInOffice?: number;
    amountLentOut?: number;
    images?: ImageIdDto[] | null;
    imagesToDelete?: number[] | null;
}

export interface ItemIdDto {
    name?: string | null;
    totalInStock?: number;
    usedInOffice?: number;
    amountLentOut?: number;
}

export interface CreateUserCommand {
    email?: string | null;
    password?: string | null;
    userRole?: UserRole;
}

export enum UserRole {
    Admin = 0,
    User = 1,
}

export interface UserIdDto {
    id?: number;
    name?: string | null;
    email?: string | null;
    userRole?: UserRole;
}

export enum CommandErrorCode {
    AspNetCoreCompatibleEmailValidator = 0,
    EmailValidator = 1,
    GreaterThanOrEqualValidator = 2,
    GreaterThanValidator = 3,
    LengthValidator = 4,
    MinimumLengthValidator = 5,
    MaximumLengthValidator = 6,
    LessThanOrEqualValidator = 7,
    LessThanValidator = 8,
    NotEmptyValidator = 9,
    NotEqualValidator = 10,
    NotNullValidator = 11,
    PredicateValidator = 12,
    AsyncPredicateValidator = 13,
    RegularExpressionValidator = 14,
    EqualValidator = 15,
    ExactLengthValidator = 16,
    InclusiveBetweenValidator = 17,
    ExclusiveBetweenValidator = 18,
    CreditCardValidator = 19,
    ScalePrecisionValidator = 20,
    EmptyValidator = 21,
    NullValidator = 22,
    EnumValidator = 23,
    ExampleParentCustomErrorCode = 24,
}

export interface AllHubs {
    exampleHub?: ExampleHub | null;
}

export interface ExampleHub {
    methods?: ExampleHubMethods | null;
    events?: ExampleHubEvents | null;
}

export interface ExampleHubMethods {
    sendMessage?: NoResponse | null;
    joinGroup?: NoResponse | null;
    leaveGroup?: NoResponse | null;
}

export interface NoResponse {
}

export interface ExampleHubEvents {
    receiveMessage?: string | null;
}

export interface FileParameter {
    data: any;
    fileName: string;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}

/* istanbul ignore file */

/**
 * Used during client configuration.
 */

/**
 * Any public method are meant to be used after the individual client has been initialized
 */