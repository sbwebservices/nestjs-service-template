import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadModule } from './download/download.module';
import { SpreadsheetInfo } from './schemas/spreadsheet-info.class';
import { SpreadsheetInfoSchema } from './schemas/spreadsheet-info.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoProviderModule } from './providers/mongo/mongo-provider.module';
import configModuleOptions from './config-module-options';
import { MessagingModule } from './messaging/messaging.module';
import { RabbitProviderModule } from './providers/rabbitmq/rabbitmq-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongoProviderModule,
    RabbitProviderModule,
    MongooseModule.forFeature([
      { name: SpreadsheetInfo.name, schema: SpreadsheetInfoSchema },
    ]),
    DownloadModule,
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
