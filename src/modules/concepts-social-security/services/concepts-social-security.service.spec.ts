import { Test, TestingModule } from '@nestjs/testing';
import { ConceptsSocialSecurityService } from './concepts-social-security.service';

describe('ConceptsSocialSecurityService', () => {
  let service: ConceptsSocialSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptsSocialSecurityService],
    }).compile();

    service = module.get<ConceptsSocialSecurityService>(ConceptsSocialSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
