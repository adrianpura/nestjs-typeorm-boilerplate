import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database.config';
import { SubscribersModule } from './modules/subscribers/subscribers.module';
import { BagsModule } from './modules/bags/bags.module';
import { SubscribersAddressesModule } from './modules/subscribers-addresses/subscribers-addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    SubscribersModule,
    BagsModule,
    SubscribersAddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('We are here inside App module');
  }
}
