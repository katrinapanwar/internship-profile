import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Data {
  date: number;
  day: string;
  tasks: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://ec2-13-233-251-193.ap-south-1.compute.amazonaws.com:8080/';  // Updated URL to web API

  constructor(private http: HttpClient) { }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDataByDate(date: number): Observable<Data> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.get<Data>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.apiUrl, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(date: number, data: Data): Observable<any> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.put(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteData(date: number): Observable<any> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return throwError(error.message || error);
  }
}
