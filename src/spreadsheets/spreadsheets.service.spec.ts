import { Test, TestingModule } from '@nestjs/testing';
import { SpreadsheetsService } from './spreadsheets.service';

describe('SpreadsheetsService', () => {
  let service: SpreadsheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpreadsheetsService],
    }).compile();

    service = module.get<SpreadsheetsService>(SpreadsheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
