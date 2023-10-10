import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesNewsController } from './categories-news.controller';

describe('CategoriesNewsController', () => {
  let controller: CategoriesNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesNewsController],
    }).compile();

    controller = module.get<CategoriesNewsController>(CategoriesNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
