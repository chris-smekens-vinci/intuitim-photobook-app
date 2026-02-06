import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PhotoGallery } from './photo-gallery';
import { PhotoService } from '../../../core/api/photos.service';

describe('PhotoGallery', () => {
  let component: PhotoGallery;
  let fixture: ComponentFixture<PhotoGallery>;
  let photoServiceMock: { getPhotos: jasmine.Spy; addComment: jasmine.Spy };

  beforeEach(async () => {
    photoServiceMock = {
      getPhotos: jasmine.createSpy('getPhotos').and.returnValue(of([])),
      addComment: jasmine.createSpy('addComment'),
    };

    await TestBed.configureTestingModule({
      imports: [PhotoGallery],
      providers: [
        { provide: PhotoService, useValue: photoServiceMock },
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

  it('should invalidate comment when missing ending punctuation', () => {
    const control = component.commentForm.get('content');
    control?.setValue('Pas de ponctuation');

    expect(control?.hasError('missingPunctuation')).toBeTrue();
    expect(component.commentForm.valid).toBeFalse();
  });

  it('should accept comment ending with punctuation', () => {
    const control = component.commentForm.get('content');
    control?.setValue('Tout va bien.');

    expect(control?.hasError('missingPunctuation')).toBeFalse();
    expect(component.commentForm.valid).toBeTrue();
  });
});
