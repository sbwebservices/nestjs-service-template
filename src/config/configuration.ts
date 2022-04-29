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
  exchange: 'digitalization.bulk.product',
  exchange_type: 'topic',
  processing_queue: 'digitalization.bulk.product.processing',
  processing_queue_routing_key: 'product.processing',
  auctionlotting_integration_input_queue:
    'digitalization.bulk.product.auction-lotting-input',
  auctionlotting_integration_input_routing_key: 'product.auction-lotting.input',
  auctionlotting_integration_output_queue:
    'digitalization.bulk.product.auction-lotting-output',
  auctionlotting_integration_output_routing_key:
    'product.auction-lotting.output',
};

export default config;
