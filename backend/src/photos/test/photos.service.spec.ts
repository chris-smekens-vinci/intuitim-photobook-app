import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import request from 'supertest';
import { App } from 'supertest/types';
import { ValidationPipe } from '@nestjs/common';
import { PhotosModule } from '../photos.module';
import { CategoriesModule } from '../../categories/categories.module';
import { CategoriesService } from '../../categories/categories.service';

describe('Photos (e2e)', () => {
  let app: INestApplication<App>;
  let categoriesService: CategoriesService;
  let categoryId: string;
  // let photoId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/intuitim-test'),
        PhotosModule,
        CategoriesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.setGlobalPrefix('api');

    await app.init();

    categoriesService = moduleFixture.get<CategoriesService>(CategoriesService);

    // Créer une catégorie de test
    const category = await categoriesService.create('Test Category');
    categoryId = category._id.toString();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/photos (GET)', () => {
    it('should return all photos', () => {
      return request(app.getHttpServer())
        .get('/api/photos')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect((response.body as any[]).length).toBeGreaterThan(0);
          expect((response.body as any[])[0]).toHaveProperty('_id');
          expect((response.body as any[])[0]).toHaveProperty('title');
          expect((response.body as any[])[0]).toHaveProperty('url');
          expect((response.body as any[])[0]).toHaveProperty(
            'dateOfRealization',
          );
          expect((response.body as any[])[0]).toHaveProperty('category');
          expect((response.body as any[])[0]).toHaveProperty('description');
          expect((response.body as any[])[0]).toHaveProperty('comments');
        });
    });

    it('should filter photos by category', () => {
      return request(app.getHttpServer())
        .get(`/api/photos?categoryId=${categoryId}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          (response.body as any[]).forEach((photo: any) => {
            expect(
              (photo as { category?: { name: string } }).category?.name,
            ).toBe('Test Category');
          });
        });
    });

    it('should include deleted photos when includeDeleted=true', () => {
      return request(app.getHttpServer())
        .get('/api/photos?includeDeleted=true')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
        });
    });
  });

  describe('/api/photos/:id (GET)', () => {
    it('should return a specific photo', () => {
      return request(app.getHttpServer())
        .get('/api/photos')
        .expect(200)
        .then((res) => {
          const photo = (res.body as { _id: string }[])[0];
          const photoId = photo._id;
          return request(app.getHttpServer())
            .get(`/api/photos/${photoId}`)
            .expect(200)
            .then((res2) => {
              expect(photo).toHaveProperty('_id');
              expect(photo).toHaveProperty('title');
              expect(photo).toHaveProperty('url');
              expect(res2.body).toHaveProperty('dateOfRealization');
              expect(res2.body).toHaveProperty('category');
              expect(res2.body).toHaveProperty('description');
              expect(res2.body).toHaveProperty('comments');
            });
        });
    });
  });
});
