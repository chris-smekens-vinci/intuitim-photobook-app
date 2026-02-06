import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Test, TestingModule } from '@nestjs/testing';

// Dans CategoriesController
//constructor(private readonly categoriesService: CategoriesService) {}
// ➜ À mocker : CategoriesService

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Configuration du module de test
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    categoriesController =
      module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const mockCategories = [{ name: 'Category1' }, { name: 'Category2' }];
      jest
        .spyOn(categoriesService, 'findAll')
        .mockResolvedValue(
          mockCategories as unknown as Awaited<
            ReturnType<CategoriesService['findAll']>
          >,
        );

      const categories = await categoriesController.findAll();
      expect(categories).toEqual(mockCategories);
    });
  });
});
