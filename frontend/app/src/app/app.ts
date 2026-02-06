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
  // show splash by default true to display immediately
  showSplash = true;

  ngOnInit(): void {
    const seen = sessionStorage.getItem('splashSeen');
    if (seen) {
      // if seen, hide immediately
      this.showSplash = false;
      return;
    }
    // otherwise show for 3s then mark as seen
    setTimeout(() => {
      this.showSplash = false;
      sessionStorage.setItem('splashSeen', '1');
    }, 3000);
  }
}
