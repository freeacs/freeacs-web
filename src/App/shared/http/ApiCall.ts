import axios from 'axios';
import { HttpMethod } from './HttpMethod';

export default function ApiCall(
  method: HttpMethod = 'GET',
  url: string = '',
  data?: object
): Promise<any> {
  const token = localStorage.getItem('jwtToken');
  return axios(url, {
    params: data && method == 'GET' ? data : null,
    data: data && method == 'POST' ? JSON.stringify(data) : null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token && 'Bearer ' + token
    },
    method
  }).then(response => response.data);
}
