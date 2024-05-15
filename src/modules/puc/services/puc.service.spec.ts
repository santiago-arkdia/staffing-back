import { Test, TestingModule } from '@nestjs/testing';
import { PucService } from './puc.service';

describe('PucService', () => {
  let service: PucService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PucService],
    }).compile();

    service = module.get<PucService>(PucService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
