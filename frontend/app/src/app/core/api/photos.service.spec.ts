import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PhotoService, PhotoDto } from './photos.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/api/photos';

  const basePhoto: PhotoDto = {
    _id: 'photo-123',
    title: 'Grand Canyon',
    url: 'https://images7.alphacoders.com/116/1169586.jpg',
    category: {
      _id: '69837391e171e7b5e4dfce8e',
      name: 'Paysage',
    },
    dateOfRealization: new Date('2024-06-15T00:00:00.000Z'),
    description: 'Vue spectaculaire du Grand Canyon, paysage naturel emblématique des États-Unis',
    isDeleted: false,
    comments: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getPhotos should call GET with no params', () => {
    let received: PhotoDto[] | undefined;

    service.getPhotos().subscribe((photos) => {
      received = photos;
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush([basePhoto]);

    expect(received).toEqual([basePhoto]);
  });

  it('getPhotos should call GET with categoryId and includeDeleted', () => {
    const categoryId = 'cat-999';

    service.getPhotos(categoryId, true).subscribe();

    const req = httpMock.expectOne(`${apiUrl}?categoryId=${categoryId}&includeDeleted=true`);
    expect(req.request.method).toBe('GET');

    req.flush([basePhoto]);
  });

  it('getPhotoById should call GET with id', () => {
    const id = 'photo-456';
    let received: PhotoDto | undefined;

    service.getPhotoById(id).subscribe((photo) => {
      received = photo;
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');

    req.flush(basePhoto);

    expect(received).toEqual(basePhoto);
  });

  it('addComment should POST to /comments with content', () => {
    const photoId = 'photo-789';
    const content = 'Magnifique photo !';
    let received: PhotoDto | undefined;

    service.addComment(photoId, content).subscribe((photo) => {
      received = photo;
    });

    const req = httpMock.expectOne(`${apiUrl}/${photoId}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ content });

    const withComment: PhotoDto = {
      ...basePhoto,
      comments: [{ content, createdAt: new Date('2026-02-03T13:06:46.402Z') }],
    };

    req.flush(withComment);

    expect(received).toEqual(withComment);
  });

  it('addComment should surface error when content has no ending punctuation', () => {
    const photoId = 'photo-789';
    const content = 'Pas de ponctuation';

    let errorStatus: number | undefined;

    service.addComment(photoId, content).subscribe({
      next: () => fail('should error'),
      error: (err) => {
        errorStatus = err.status;
      },
    });

    const req = httpMock.expectOne(`${apiUrl}/${photoId}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ content });

    req.flush(
      { message: 'Comment must end with punctuation' },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(errorStatus).toBe(400);
  });
});
