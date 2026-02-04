import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PhotoService } from '../../../core/api/photos.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.html',
  styleUrls: ['./photo-gallery.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class PhotoGallery implements OnInit {
  photos: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des photos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  trackById(index: number, photo: any): string {
    return photo._id;
  }
}
