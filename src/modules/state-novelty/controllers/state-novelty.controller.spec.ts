import { Test, TestingModule } from '@nestjs/testing';
import { StateNoveltyController } from './state-novelty.controller';

describe('StateNoveltyController', () => {
  let controller: StateNoveltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateNoveltyController],
    }).compile();

    controller = module.get<StateNoveltyController>(StateNoveltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
