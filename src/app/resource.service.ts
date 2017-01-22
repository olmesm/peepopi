import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResourceService {
  private moviesApi = 'http://localhost:3000/api';

  data: any[] = [];

  constructor(private http: Http) { }

  query(): Promise<any[]> {
    return this.http.get(this.moviesApi)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
