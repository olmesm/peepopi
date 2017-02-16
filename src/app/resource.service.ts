import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResourceService {
  private moviesApi = 'http://localhost:3000/api';

  data: any[] = [];

  constructor(private http: Http) { }

  query(): Promise<any[]> {
    return this.http.get(this.moviesApi, { params: { page: 1 } })
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private makeJson(str: string): JSON {
    return JSON.parse(str.replace(/rating\"\:\,/, 'rating\"\:\"0\"\,'));
  }
}
