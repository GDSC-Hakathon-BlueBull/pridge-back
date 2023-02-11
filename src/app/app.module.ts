import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { CommonModule } from '../common/common.module';
import { configModule } from './modules/config.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [CommonModule, configModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
