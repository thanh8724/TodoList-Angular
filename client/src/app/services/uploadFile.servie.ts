import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}
  uploadImage(file: File, destinationFolder: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`/api/upload?folder=${destinationFolder}`, formData);
  }
}