import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from './schemas/photo.schema';
import { TestingModule, Test } from '@nestjs/testing';
import { PhotosService } from './photos.service';

// Dans PhotosService
//constructor(@InjectModel(Photo.name) private photoModel: Model<PhotoDocument>) {}
// ➜ À mocker : le Model Mongoose

const mockQuery = <T>(data: T) =>
  ({
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(data),
  }) as unknown as ReturnType<Model<PhotoDocument>['find']>;

describe('PhotosService', () => {
  let photosService: PhotosService;
  let photoModel: Model<PhotoDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Configuration du module de test
      providers: [
        PhotosService,
        {
          provide: getModelToken(Photo.name),
          useValue: {
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    photosService = module.get<PhotosService>(PhotosService);
    photoModel = module.get<Model<PhotoDocument>>(getModelToken(Photo.name));
  });

  describe('findAll', () => {
    it('should return an array of photos', async () => {
      const mockPhotos = [
        {
          _id: 'id1',
          title: 'Photo1',
          url: 'http://example.com/1.jpg',
          dateOfRealization: new Date('2020-01-01'),
        },
        {
          _id: 'id2',
          title: 'Photo2',
          url: 'http://example.com/2.jpg',
          dateOfRealization: new Date('2021-01-01'),
        },
      ];
      jest.spyOn(photoModel, 'find').mockReturnValue(mockQuery(mockPhotos));

      const photos = await photosService.findAll();
      expect(photos).toEqual(mockPhotos.map((p) => p));
    });
  });
});
