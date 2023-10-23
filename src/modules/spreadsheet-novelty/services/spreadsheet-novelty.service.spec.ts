import { Test, TestingModule } from '@nestjs/testing';
import { SpreadsheetNoveltyService } from './spreadsheet-novelty.service';

describe('SpreadsheetNoveltyService', () => {
  let service: SpreadsheetNoveltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpreadsheetNoveltyService],
    }).compile();

    service = module.get<SpreadsheetNoveltyService>(SpreadsheetNoveltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
