import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CONFIG_KEYS } from '../config/keys.dev';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(CONFIG_KEYS.mongoURI),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
