import { Test, TestingModule } from '@nestjs/testing';
import { TypeNoveltyService } from './type-novelty.service';

describe('TypeNoveltyService', () => {
  let service: TypeNoveltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeNoveltyService],
    }).compile();

    service = module.get<TypeNoveltyService>(TypeNoveltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
