import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, MongoEnvConfig } from '../../config/configuration';
import * as inspector from 'inspector';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig>) => {
        // const secret = await secretsManagerService.getSecret<MongoSecrets>(
        //   process.env.AWS_SECRET_MONGO,
        // );

        const config = configService.get<MongoEnvConfig>('mongo');

        if (process.env.NODE_ENV !== 'local') {
          //   config.user = secret.username;
          //   config.pass = secret.password;
          console.log('');
        } else if (inspector.url()) {
          config.host = 'localhost';
        }

        // eslint-disable-next-line prettier/prettier
                const path = `${config.user}:${encodeURIComponent(config.pass)}@${config.host}:${config.port}/${config.database}`;

        if (process.env.NODE_ENV === 'local') {
          return {
            uri: `mongodb://${path}?tls=false`,
          };
        }

        return {
          uri: `mongodb://${path}?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`,
          //tlsCAFile: './rds-combined-ca-bundle.pem',
        };
      },
    }),
  ],
})
export class MongoProviderModule {}
