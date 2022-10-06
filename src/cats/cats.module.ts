import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TestConsumer } from 'src/test.consumer';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), KafkaModule],
  controllers: [CatsController],
  providers: [CatsService, TestConsumer],
})
export class CatsModule {}
