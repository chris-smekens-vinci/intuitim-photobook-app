import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoGallery } from './shared/components/photo-gallery/photo-gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotoGallery],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
