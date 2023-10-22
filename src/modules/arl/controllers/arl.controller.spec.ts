import { Test, TestingModule } from '@nestjs/testing';
import { ArlController } from './arl.controller';

describe('ArlController', () => {
  let controller: ArlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArlController],
    }).compile();

    controller = module.get<ArlController>(ArlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
