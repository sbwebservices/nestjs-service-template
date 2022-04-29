import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AppConfig,
  RabbitMQConstants,
  RabbitMQEnvConfig,
} from '../../config/configuration';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig>) => {
        const config = configService.get<RabbitMQEnvConfig>('rabbitMQ');
        return {
          exchanges: [
            {
              name: RabbitMQConstants.exchange,
              type: RabbitMQConstants.exchange_type,
            },
          ],
          uri: `amqp://${config.user}:${config.pass}@${config.host}:${config.port}`,
          connectionInitOptions: { wait: false },
        };
      },
    }),
  ],
  providers: [],
  exports: [RabbitMQModule],
})
export class RabbitProviderModule {}
