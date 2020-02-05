import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {timeout} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders;

  constructor(
    public http: HttpClient,
  ) {
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
    });
  }

  /**
   * Devuelve la URL a la que se realizará la llamada
   * @param endpoint
   */
  public getURL(endpoint: string): string {
    let base_url = 'http://localhost:8081';
    if (base_url[base_url.length - 1] !== '/') {
      base_url = base_url + '/';
    }

    const url = base_url + endpoint

    return url;
  }

  get(endpoint: string, params?: any, options?): Promise<any> {
    if (!options) {
      options = { headers: this.headers };
    } else {
      if (!options.headers) {
        options.headers = this.headers;
      }
    }

    if (params) {
      options.params = params;
    }

    endpoint = this.getURL(endpoint);

    return new Promise((resolve, reject) => {
      this.http.get(endpoint, options)
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(this.handleErrors(err));
        });
    });
  }

  post(endpoint: string, body: any, options?: object): Promise<any> {
    if (!options) {
      options = { headers: this.headers.append('Content-Type', 'application/json') };
    }

    endpoint = this.getURL(endpoint);

    return new Promise((resolve, reject) => {
      this.http.post(endpoint, body, options)
        .pipe(timeout(30000))
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(this.handleErrors(err));
        });
    });
  }

  put(endpoint: string, body?: any, options?: object): Promise<any> {
    if (!options) {
      options = { headers: this.headers.append('Content-Type', 'application/json') };
    }

    endpoint = this.getURL(endpoint);

    return new Promise((resolve, reject) => {
      this.http.put(endpoint, body, options)
        .pipe(timeout(30000))
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(this.handleErrors(err));
        });
    });
  }

  delete(endpoint: string, body?: any, options?: object): Promise<any> {
    if (!options) {
      options = {
        body: body
      };
    }

    return new Promise((resolve, reject) => {
      this.http.delete(this.getURL(endpoint), options)
        .pipe(timeout(30000))
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(this.handleErrors(err));
        });
    });
  }

  /**
   * Gestión de errores del servicio
   */
  private handleErrors(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.error && error.error.error ?
        (error.error.error.message ? error.error.error.message : error.error.error) :
        error.message}`;
    }
    return errorMessage;
    // return error.error && error.error.error ? (error.error.error.message ? error.error.error.message : error.error.error) : error.message;
  }
}
