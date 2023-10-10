import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesNewsService } from './categories-news.service';

describe('CategoriesNewsService', () => {
  let service: CategoriesNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesNewsService],
    }).compile();

    service = module.get<CategoriesNewsService>(CategoriesNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
