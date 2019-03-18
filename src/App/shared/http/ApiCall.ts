import axios from 'axios';
import { ApiHttpMethod } from './HttpMethod';

export default function ApiCall(
  method: ApiHttpMethod = 'GET',
  url: string = '',
  data?: object
): Promise<any> {
  return axios(url, {
    data: data ? JSON.stringify(data) : null,
    headers: { 'Content-Type': 'application/json' },
    method
  }).then(response => response.data);
}
