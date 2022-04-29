import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AppConfig,
  RabbitMQConstants,
  RabbitMQEnvConfig,
} from '../../config/configuration';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import * as inspector from 'inspector';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig>) => {
        const config = configService.get<RabbitMQEnvConfig>('rabbitMQ');

        let endpoint = config.host;

        if (process.env.NODE_ENV === 'local' && inspector.url()) {
          endpoint = 'http://localhost:4566';
        }

        const params: RabbitMQConfig = {
          exchanges: [
            {
              name: RabbitMQConstants.exchange,
              type: RabbitMQConstants.exchange_type,
            },
          ],
          uri: `amqp://${config.user}:${config.pass}@${endpoint}:${config.port}`,
          connectionInitOptions: { wait: true, timeout: 20000 },
        };

        return Promise.resolve(params);
      },
    }),
  ],
  providers: [],
  exports: [RabbitMQModule],
})
export class RabbitProviderModule {}
