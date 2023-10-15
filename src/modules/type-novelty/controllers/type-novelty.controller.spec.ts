import { Test, TestingModule } from '@nestjs/testing';
import { TypeNoveltyController } from './type-novelty.controller';

describe('TypeNoveltyController', () => {
  let controller: TypeNoveltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeNoveltyController],
    }).compile();

    controller = module.get<TypeNoveltyController>(TypeNoveltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
