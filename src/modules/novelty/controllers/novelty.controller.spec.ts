import { Test, TestingModule } from '@nestjs/testing';
import { NoveltyController } from './novelty.controller';

describe('NoveltyController', () => {
  let controller: NoveltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoveltyController],
    }).compile();

    controller = module.get<NoveltyController>(NoveltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
