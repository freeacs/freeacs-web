export type ApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export default function apiCall(method: ApiHttpMethod = 'GET', url: string = '', data?: object): Promise<string> {
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
