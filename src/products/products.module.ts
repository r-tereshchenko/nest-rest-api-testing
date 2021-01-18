import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ExchangeService } from '../services/exchange.service';

@Module({
  providers: [ProductsService, ExchangeService],
  controllers: [ProductsController],
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
})

export class ProductsModule {}