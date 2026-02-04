import { Routes } from '@angular/router';
import { PhotoGallery } from './shared/components/photo-gallery/photo-gallery';
// import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';

export const routes: Routes = [
  { path: '', component: PhotoGallery },
  // { path: 'photos/:id', component: PhotoDetailsComponent },
];
