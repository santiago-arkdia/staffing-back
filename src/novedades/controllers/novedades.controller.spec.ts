import { Test, TestingModule } from '@nestjs/testing';
import { NovedadesController } from './novedades.controller';

describe('NovedadesController', () => {
  let controller: NovedadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovedadesController],
    }).compile();

    controller = module.get<NovedadesController>(NovedadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
