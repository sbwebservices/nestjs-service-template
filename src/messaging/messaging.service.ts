import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RabbitMQConstants } from 'src/config/configuration';

@Injectable()
export class MessagingService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: RabbitMQConstants.exchange,
    routingKey: RabbitMQConstants.processing_queue_routing_key,
    queue: RabbitMQConstants.processing_queue,
  })
  public async listeningProcessingQueue(msg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }

  public async sendToProcessingQueue(product: any) {
    this.amqpConnection.publish(
      'digitalization.bulk.product', //RabbitMQConstants.exchange,
      'product.processing', //RabbitMQConstants.processing_queue_routing_key,
      product,
    );
  }

  @RabbitSubscribe({
    exchange: RabbitMQConstants.exchange,
    routingKey: RabbitMQConstants.auctionlotting_integration_output_routing_key,
    queue: RabbitMQConstants.auctionlotting_integration_output_queue,
  })
  public async listeningAuctionLottingResultQueue(msg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }

  public async sendToAuctionLottingInputQueue(product: any) {
    this.amqpConnection.publish(
      RabbitMQConstants.exchange,
      RabbitMQConstants.auctionlotting_integration_input_routing_key,
      product,
    );
  }
}
