import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoryService, CategoryDto } from './categories.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/api/categories';

  const categories: CategoryDto[] = [
    { _id: 'cat-1', name: 'Nature' },
    { _id: 'cat-2', name: 'Sport' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getCategories should call GET and return list', () => {
    let received: CategoryDto[] | undefined;

    service.getCategories().subscribe((data) => {
      received = data;
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(categories);

    expect(received).toEqual(categories);
  });
});
