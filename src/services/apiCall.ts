import axios from 'axios';

export type ApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export default function apiCall(method: ApiHttpMethod = 'GET', url: string = '', data?: object): Promise<string> {
    return axios(url, {
        data: data ? JSON.stringify(data) : null,
        headers: { "Content-Type": "application/json" },
        method
    }).then(response => response.data);
}
