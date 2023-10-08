import { Test, TestingModule } from '@nestjs/testing';
import { NovedadesService } from './novedades.service';

describe('NovedadesService', () => {
  let service: NovedadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NovedadesService],
    }).compile();

    service = module.get<NovedadesService>(NovedadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
