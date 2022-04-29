export interface RabbitMQEnvConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}
export interface MongoEnvConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  pass: string;
}

export interface AppConfig {
  rabbitMQ: RabbitMQEnvConfig;
  mongo: MongoEnvConfig;
}

const config = (): AppConfig => {
  return {
    rabbitMQ: {
      host: process.env.RABBIT_HOST,
      port: Number(process.env.RABBIT_PORT),
      user: process.env.RABBIT_USER,
      pass: process.env.RABBIT_PASS,
    },
    mongo: {
      host: process.env.MONGO_HOST,
      port: Number(process.env.MONGO_PORT),
      database: process.env.MONGO_AUTHENTICATION_DATABASE,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    },
  };
};

export const RabbitMQConstants = {
  exchange: '<SQUAD>.<PROJECTNAME>.<EXCHANGE_NAME>',
  exchange_type: 'topic',
  processing_queue: '<SQUAD>.<PROJECTNAME>.<EXCHANGE_NAME>.<QUEUE_NAME>',
  processing_queue_routing_key: 'product.<ROUTING_KEY>',
};

export default config;
