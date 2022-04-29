import configuration from './config/configuration';
import * as path from 'path';
const ENV = process.env.NODE_ENV;
import * as Joi from 'joi';

export default {
  load: [configuration],
  envFilePath: path.resolve(
    process.cwd(),
    'env',
    !ENV ? '.env.local' : `.env.${ENV}`,
  ),
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('local', 'pre', 'stg', 'production', 'test')
      .default('production'),
    AWS_REGION: Joi.string().default('sa-east-1'),
    AWS_DEFAULT_REGION: Joi.string().default('sa-east-1'),
    MONGO_HOST: Joi.string().required(),
    MONGO_PORT: Joi.number().default(27017),
    MONGO_USER: Joi.string(),
    MONGO_PASS: Joi.string(),
    MONGO_AUTHENTICATION_DATABASE: Joi.string().default('spreadsheets'),
    RABBIT_HOST: Joi.string().required(),
    RABBIT_PORT: Joi.number().default(5672),
    RABBIT_USER: Joi.string().required(),
    RABBIT_PASS: Joi.string().required(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
