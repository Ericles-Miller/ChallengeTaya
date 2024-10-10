import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configs/ormconfig';
import { UserMiddleware } from './get-user-middleware';
import { Proposal } from './entities/entities.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, Proposal]),
    UsersModule,
    CustomersModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: 'customers', method: RequestMethod.GET
    }); // Apply it for all routes or specify routes
  }
}
