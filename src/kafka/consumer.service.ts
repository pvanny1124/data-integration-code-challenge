import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private readonly consumers: Consumer[] = []; //track amount of consumers in application so we can discoonnect from them later on

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown(signal?: string) {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
