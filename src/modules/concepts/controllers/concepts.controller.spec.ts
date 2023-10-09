import { Test, TestingModule } from '@nestjs/testing';
import { ConceptsController } from './concepts.controller';

describe('ConceptsController', () => {
  let controller: ConceptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptsController],
    }).compile();

    controller = module.get<ConceptsController>(ConceptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
