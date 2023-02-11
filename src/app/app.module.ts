import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { CommonModule } from '../common/common.module';
import { configModule } from './modules/config.module';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CommonModule, configModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
