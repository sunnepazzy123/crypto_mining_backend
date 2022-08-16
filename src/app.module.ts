import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmModuleFactory } from './config/db.config';
import { DepositModule } from './deposit/deposit.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ReferralModule } from './referral/referral.module';
import { AuthModule } from './users/auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    typeOrmModuleFactory,
    // typeOrmModule,
    ReferralModule,
    AuthModule,
    DepositModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
