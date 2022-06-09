import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SubscribersAddressesController } from './subscribers-addresses.controller';
import { SubscribersAddressesRepository } from './subscribers-addresses.repository';
import { SubscribersAddressesService } from './subscribers-addresses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscribersAddressesRepository]),
    SubscribersModule,
  ],
  controllers: [SubscribersAddressesController],
  providers: [SubscribersAddressesService],
  exports: [SubscribersAddressesService],
})
export class SubscribersAddressesModule {}
