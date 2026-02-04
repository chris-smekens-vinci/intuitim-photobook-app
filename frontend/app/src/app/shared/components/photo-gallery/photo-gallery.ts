import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PhotoService, PhotoDto } from '../../../core/api/photos.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.html',
  styleUrls: ['./photo-gallery.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class PhotoGallery implements OnInit {
  photos: PhotoDto[] = [];
  selectedPhoto: PhotoDto | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    console.log('Chargement des photos...');
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        console.log('Photos reçues:', data);
        this.photos = data;
        this.loading = false;
        if (data.length > 0) {
          this.selectedPhoto = data[0];
        }
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.error = 'Erreur lors du chargement des photos';
        this.loading = false;
      }
    });
  }

  selectPhoto(photo: PhotoDto): void {
    this.selectedPhoto = photo;
  }

  trackById(index: number, photo: PhotoDto): string {
    return photo._id;
  }
}
