import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { Readable } from 'stream';

@Injectable()
export class SpreadsheetsService {
  async read(stream: Readable): Promise<any> {
    const workbook = new Workbook();
    await workbook.xlsx.read(stream);
    return {};
  }
}
