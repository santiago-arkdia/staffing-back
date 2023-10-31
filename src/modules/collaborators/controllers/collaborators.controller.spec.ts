import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorController } from './collaborators.controller';

describe('CollaboratorController', () => {
  let controller: CollaboratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratorController],
    }).compile();

    controller = module.get<CollaboratorController>(CollaboratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
