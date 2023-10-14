import { Test, TestingModule } from '@nestjs/testing';
import { StateNoveltyService } from './state-novelty.service';

describe('StateNoveltyService', () => {
  let service: StateNoveltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateNoveltyService],
    }).compile();

    service = module.get<StateNoveltyService>(StateNoveltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
