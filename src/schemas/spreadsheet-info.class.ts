import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class SpreadsheetInfo {
  @Prop()
  user: string;

  @Prop()
  timestamp: Date;

  @Prop()
  status: string;
}
