import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { RabbitProviderModule } from 'src/providers/rabbitmq/rabbitmq-provider.module';

@Module({
  imports: [RabbitProviderModule],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
