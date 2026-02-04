import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'http://localhost:3000/photos';

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPhotoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}