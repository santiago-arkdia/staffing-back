import { Test, TestingModule } from '@nestjs/testing';
import { NoveltyService } from './novelty.service';

describe('NoveltyService', () => {
  let service: NoveltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoveltyService],
    }).compile();

    service = module.get<NoveltyService>(NoveltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
