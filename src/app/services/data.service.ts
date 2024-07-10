import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';

export interface Data {
  date: string;   // Change from number to string
  day: string;
  tasks: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${environment.apiUrl}data`;  // Use environment variable

  constructor(private http: HttpClient) { }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDataByDate(date: string): Observable<Data> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.get<Data>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createData(data: Data): Observable<Data> {
    // Ensure date is converted to string before sending
    const dataToSend: Data = {
      ...data,
      date: data.date.toString()  // Convert date to string if it's a number
    };

    return this.http.post<Data>(this.apiUrl, dataToSend, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(date: string, data: Data): Observable<any> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteData(date: string): Observable<any> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return throwError(error.message || error);
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}


