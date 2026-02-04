import { Routes } from '@angular/router';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';

export const routes: Routes = [
  { path: '', component: PhotoGalleryComponent },
  { path: 'photo/:id', component: PhotoDetailsComponent },
];
