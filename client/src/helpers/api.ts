import {deleteValues} from "./localStorage";

interface API {
    init(init: RequestInit): API;
    setParams(params: { [key: string]: unknown }): API;
    get<T>(path?: string): Promise<T>;
    post<T>(path?: string): Promise<T>;
    put<T>(path?: string): Promise<T>;
    patch<T>(path?: string): Promise<T>;
}

export function api(token: string| null, base_url?: string): API {
    let requestInit: RequestInit = {};
    let paramsInit: { [key: string]: unknown } = {};

    const getResponse = (method: string, path = "") => {
        requestInit.method = method;

        if (!(requestInit.headers instanceof Headers)) {
            requestInit.headers = new Headers(requestInit.headers);
        }

        if(token){
            requestInit.headers.set("Authorization", `Bearer ${token}`)
        }

        const url = new URL(`${base_url}${path}`);

        if (Object.keys(paramsInit).length !== 0) {
            Object.keys(paramsInit).forEach((key) => {
                if (paramsInit[key]) {
                    return url.searchParams.append(key, <string>paramsInit[key]);
                }
            });
        }

        return fetch(url.toString(), requestInit).then((response) => {
            if (response.status === 401) {
                 deleteValues();
                window.location.href = "/login";
            }

            if (!response.ok) {
                throw response;
            }

            return response.json();
        });
    };

    return {

        get(path) {
            return getResponse("GET", path);
        },

        init(init) {
            requestInit = init;
            return this;
        },

        patch(path) {
            return getResponse("PATCH", path);
        },

        post(path) {
            return getResponse("POST", path);
        },

        put(path) {
            return getResponse("PUT", path);
        },
        setParams(params) {
            paramsInit = params;

            return this;
        },
    };
}
