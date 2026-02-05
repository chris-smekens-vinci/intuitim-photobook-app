import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PhotoGallery } from './photo-gallery';

describe('PhotoGallery', () => {
  let component: PhotoGallery;
  let fixture: ComponentFixture<PhotoGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGallery],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
