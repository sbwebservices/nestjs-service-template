import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Module } from '@nestjs/common';
import { DownloadS3Service } from './download-s3.service';
import * as inspector from 'inspector';

const s3ClientFactory = {
  provide: 'CUSTOM_S3_CLIENT',
  useFactory: () => {
    const params: S3ClientConfig = {
      region: process.env.AWS_REGION,
      credentials: defaultProvider(),
    };

    if (process.env.NODE_ENV === 'local') {
      params.forcePathStyle = true;
      params.endpoint = inspector.url()
        ? 'http://localhost:4566'
        : process.env.AWS_ENDPOINT;
    }

    return new S3Client(params);
  },
};

@Module({
  providers: [DownloadS3Service, s3ClientFactory],
  exports: [DownloadS3Service],
})
export class DownloadModule {}
