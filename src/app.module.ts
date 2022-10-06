import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dataHub',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CatsModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
