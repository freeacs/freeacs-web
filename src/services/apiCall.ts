type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const get = (url: string) => apiCall('GET', url);
export const post = (url: string, data: object) => apiCall('POST', url, data);
export const del = (url: string) => apiCall('DELETE', url);
export const put = (url: string, data: object) => apiCall('PUT', url, data);

function apiCall(method: HttpMethod = 'GET', url: string = '', data?: object) {
    return fetch(url, {
        body: data ? JSON.stringify(data) : null,
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method,
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
    }).then(response => response.text());
}