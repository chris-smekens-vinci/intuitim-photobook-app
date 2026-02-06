import { CategoriesService } from './categories.service';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

// Dans CategoriesService
//constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}
// ➜ À mocker : le Model Mongoose

const mockFindExec = <T>(data: T) =>
  ({ exec: jest.fn().mockResolvedValue(data) }) as unknown as ReturnType<
    Model<Category>['find']
  >;

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoryModel: Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Configuration du module de test
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category.name),
          useValue: {
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const mockCategories = [{ name: 'Category1' }, { name: 'Category2' }];
      jest
        .spyOn(categoryModel, 'find')
        .mockReturnValue(mockFindExec(mockCategories));

      const categories = await categoriesService.findAll();
      expect(categories).toEqual(mockCategories);
    });
  });
});
