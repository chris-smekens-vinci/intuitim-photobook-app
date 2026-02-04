import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../core/api/photos.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.html',
  styleUrls: ['./photo-gallery.css'],
})
export class PhotoGallery implements OnInit {
  photos: any[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe((data) => {
      this.photos = data;
    });
  }
}
