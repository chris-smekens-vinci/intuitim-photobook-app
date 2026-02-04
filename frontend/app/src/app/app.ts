import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoGallery } from './shared/components/photo-gallery/photo-gallery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PhotoGallery],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  // show splash par défaut true pour s'afficher immédiatement
  showSplash = true;

  ngOnInit(): void {
    const seen = sessionStorage.getItem('splashSeen');
    if (seen) {
      // si déjà vu, cacher tout de suite
      this.showSplash = false;
      return;
    }
    // sinon afficher pendant 3s puis marquer comme vu
    setTimeout(() => {
      this.showSplash = false;
      sessionStorage.setItem('splashSeen', '1');
    }, 3000);
  }
}
