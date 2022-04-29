import { Test, TestingModule } from '@nestjs/testing';
import { DownloadS3Service } from './download-s3.service';

describe('DownloadS3Service', () => {
  let service: DownloadS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadS3Service],
    }).compile();

    service = module.get<DownloadS3Service>(DownloadS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
