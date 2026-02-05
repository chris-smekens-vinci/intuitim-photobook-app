import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CategoriesService } from '../categories.service';
import { Category } from '../schemas/category.schema';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockCategory = {
    _id: '69837391e171e7b5e4dfce8e',
    name: 'Paysage',
    createdAt: new Date(),
    save: jest.fn(),
    toObject: jest.fn(),
  };

  const mockCategoryModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    }),
    new: jest.fn(),
    constructor: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    const categoryId = '69837391e171e7b5e4dfce8e';

    it('should return a category by id', async () => {
      mockCategoryModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCategory),
      });

      const result = await service.findById(categoryId);

      expect(mockCategoryModel.findById).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(mockCategory);
    });
  });
});
