import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhotoDto } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'http://localhost:3000/api/photos';

  constructor(private http: HttpClient) {
    console.log('PhotoService initialisé avec URL:', this.apiUrl);
  }

  getPhotos(categoryId?: string, includeDeleted: boolean = false): Observable<PhotoDto[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    
    if (categoryId) {
      params.push(`categoryId=${categoryId}`);
    }
    if (includeDeleted) {
      params.push(`includeDeleted=true`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    console.log('GET request to:', url);
    return this.http.get<PhotoDto[]>(url);
  }

  getPhotoById(id: string): Observable<PhotoDto> {
    return this.http.get<PhotoDto>(`${this.apiUrl}/${id}`);
  }

  addComment(photoId: string, content: string): Observable<PhotoDto> {
    return this.http.post<PhotoDto>(`${this.apiUrl}/${photoId}/comments`, { content });
  }
}