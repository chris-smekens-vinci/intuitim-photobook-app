import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PhotoDto {
  _id: string;
  title: string;
  url: string;
  category: {
    _id?: string;
    name: string;
  };
  dateOfRealization: Date;
  description?: string;
  comments: Array<{
    content: string;
    createdAt: Date;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'http://localhost:3000/api/photos';

  constructor(private http: HttpClient) {
    console.log('PhotoService initialisé avec URL:', this.apiUrl);
  }

  getPhotos(): Observable<PhotoDto[]> {
    console.log('GET request to:', this.apiUrl);
    return this.http.get<PhotoDto[]>(this.apiUrl);
  }

  getPhotoById(id: string): Observable<PhotoDto> {
    return this.http.get<PhotoDto>(`${this.apiUrl}/${id}`);
  }
}