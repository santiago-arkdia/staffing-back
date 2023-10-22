import { Test, TestingModule } from '@nestjs/testing';
import { ArlService } from './arl.service';

describe('ArlService', () => {
  let service: ArlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArlService],
    }).compile();

    service = module.get<ArlService>(ArlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
