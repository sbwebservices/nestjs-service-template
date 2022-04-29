import { IsNotEmpty } from 'class-validator';

export class NotifyDto {
  @IsNotEmpty()
  objectId: string;
}
