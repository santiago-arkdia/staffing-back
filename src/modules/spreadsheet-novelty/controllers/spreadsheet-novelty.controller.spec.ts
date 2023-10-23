import { Test, TestingModule } from '@nestjs/testing';
import { SpreadsheetNoveltyController } from './spreadsheet-novelty.controller';

describe('SpreadsheetNoveltyController', () => {
  let controller: SpreadsheetNoveltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpreadsheetNoveltyController],
    }).compile();

    controller = module.get<SpreadsheetNoveltyController>(
      SpreadsheetNoveltyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
