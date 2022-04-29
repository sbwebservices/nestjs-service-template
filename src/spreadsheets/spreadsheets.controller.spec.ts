import { Test, TestingModule } from '@nestjs/testing';
import { SpreadsheetsController } from './spreadsheets.controller';
import { SpreadsheetsService } from './spreadsheets.service';

describe('SpreadsheetsController', () => {
  let controller: SpreadsheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpreadsheetsController],
      providers: [SpreadsheetsService],
    }).compile();

    controller = module.get<SpreadsheetsController>(SpreadsheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
