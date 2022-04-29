import { Controller } from '@nestjs/common';
import { SpreadsheetsService } from './spreadsheets.service';

@Controller('spreadsheets')
export class SpreadsheetsController {
  constructor(private readonly spreadsheetsService: SpreadsheetsService) {}
}
