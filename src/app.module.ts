import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configs/ormconfig';
import { UserMiddleware } from './get-user-middleware';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CustomersModule } from './customers/customers.module';
import { ProposalModule } from './proposal/proposal.module';
import { Proposal } from './proposal/entities/proposal.entity';
import { Customer } from './customers/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, Proposal, Customer]),
    UsersModule,
    CustomersModule,
    ProposalModule,
    //AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: 'customers', method: RequestMethod.ALL,
    },
    {
      path: 'proposals', method: RequestMethod.ALL,
    }
  ); // Apply it for all routes or specify routes
  }
}
