import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import {
  BucketError,
  BucketNotFound,
  ObjectNotFound,
} from 'src/errors/bucket-s3-errors';
import { Readable } from 'stream';

@Injectable()
export class DownloadS3Service {
  constructor(@Inject('CUSTOM_S3_CLIENT') private client: S3Client) {}

  async downloadFile(id: string): Promise<Readable> {
    try {
      const command = new GetObjectCommand({
        Bucket: 'spreadsheets',
        Key: id,
      });

      const response = await this.client.send(command);
      return response.Body as Readable;
    } catch (error) {
      if (error?.Code === 'NoSuchBucket') {
        throw new BucketNotFound(id);
      }

      if (error?.Code === 'NoSuchKey') {
        throw new ObjectNotFound(id);
      }

      throw new BucketError(error?.message);
    }
  }
}
