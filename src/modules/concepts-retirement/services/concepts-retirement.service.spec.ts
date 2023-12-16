import { Test, TestingModule } from '@nestjs/testing';
import { ConceptsRetirementService } from './concepts-retirement.service';

describe('ConceptsRetirementService', () => {
  let service: ConceptsRetirementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptsRetirementService],
    }).compile();

    service = module.get<ConceptsRetirementService>(ConceptsRetirementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
