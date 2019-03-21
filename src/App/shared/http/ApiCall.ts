import axios from 'axios';
import { HttpMethod } from './HttpMethod';

export default function ApiCall(
  method: HttpMethod = 'GET',
  url: string = '',
  data?: object
): Promise<any> {
  return axios(url, {
    data: data ? JSON.stringify(data) : null,
    headers: { 'Content-Type': 'application/json' },
    method
  }).then(response => response.data);
}
