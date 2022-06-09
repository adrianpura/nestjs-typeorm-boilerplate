import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { BagsController } from './bags.controller';
import { BagsRepository } from './bags.repository';
import { BagsService } from './bags.service';

@Module({
  imports: [TypeOrmModule.forFeature([BagsRepository]), SubscribersModule],
  controllers: [BagsController],
  providers: [BagsService],
  exports: [BagsService],
})
export class BagsModule {}
