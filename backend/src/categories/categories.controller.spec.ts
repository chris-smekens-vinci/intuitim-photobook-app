import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

// Dans CategoriesController
//constructor(private readonly categoriesService: CategoriesService) {}
// ➜ À mocker : CategoriesService

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(() => {
    categoriesService = new CategoriesService(null);
    categoriesController = new CategoriesController(categoriesService);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = ['test'];
      jest.spyOn(categoriesService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
