import { Module } from '@nestjs/common';
import { SpreadsheetsService } from './spreadsheets.service';
import { SpreadsheetsController } from './spreadsheets.controller';

@Module({
  controllers: [SpreadsheetsController],
  providers: [SpreadsheetsService],
  exports: [SpreadsheetsService],
})
export class SpreadsheetsModule {}
