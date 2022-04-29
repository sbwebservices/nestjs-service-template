import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SpreadsheetInfo } from './spreadsheet-info.class';

export type SpreadsheetInfoDocument = SpreadsheetInfo & Document;

export const SpreadsheetInfoSchema =
  SchemaFactory.createForClass(SpreadsheetInfo);
