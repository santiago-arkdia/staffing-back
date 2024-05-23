import { Test, TestingModule } from '@nestjs/testing';
import { AccountingInterfaceService } from './accounting-interface.service';

describe('AccountingInterfaceService', () => {
  let service: AccountingInterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountingInterfaceService],
    }).compile();

    service = module.get<AccountingInterfaceService>(AccountingInterfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
