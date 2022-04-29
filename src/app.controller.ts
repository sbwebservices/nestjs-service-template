import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DownloadS3Service } from './download/download-s3.service';
import { NotifyDto } from './dto/notify.dto';
import {
  BucketError,
  BucketNotFound,
  ObjectNotFound,
} from './errors/bucket-s3-errors';
import { MessagingService } from './messaging/messaging.service';
import { SpreadsheetInfo } from './schemas/spreadsheet-info.class';
import { SpreadsheetInfoDocument } from './schemas/spreadsheet-info.schema';
import { SpreadsheetsService } from './spreadsheets/spreadsheets.service';
@Controller()
export class AppController {
  constructor(
    private readonly downloadS3Service: DownloadS3Service,
    private readonly spreadsheetsService: SpreadsheetsService,
    @InjectModel(SpreadsheetInfo.name)
    private spreadsheetInfoModel: Model<SpreadsheetInfoDocument>,
    private readonly messagingService: MessagingService,
  ) {}

  @Post('notify')
  async notify(@Body() dto: NotifyDto): Promise<string> {
    try {
      const spreadshetStreaming = await this.downloadS3Service.downloadFile(
        dto.objectId,
      );      

      this.messagingService.sendToProcessingQueue({ test: 'moo' });

      try {
        await this.spreadsheetInfoModel.create({
          timestamp: Date.now(),
          user: 'abcd@foo.com',
        });
      } catch (error) {
        throw new HttpException(
          'Mongo Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return '';
    } catch (error) {
      if (error instanceof BucketNotFound) {
        throw new HttpException(
          "Bucket 'spreadsheets' does not exist at AWS S3",
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof ObjectNotFound) {
        throw new HttpException(
          `Bucket object '${dto.objectId}' does not exist at AWS S3`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof BucketError) {
        throw new HttpException(
          'An unknow error has ocurred when trying download from AWS S3',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
