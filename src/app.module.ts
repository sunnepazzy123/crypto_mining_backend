import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmModulePostgresFactory } from './config/db.config';
import { DepositModule } from './deposit/deposit.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PackageModule } from './package/package.module';
import { ReferralModule } from './referral/referral.module';
import { AuthModule } from './users/auth/auth.module';
import { UsersModule } from './users/users.module';
import { VaultModule } from './vault/vault.module';
import { WalletModule } from './wallet/wallet.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobModule } from './job/job.module';
import { WithDrawModule } from './withdraw/withdraw.module';
// import { MessagesModule } from './messages/messages.module';
const cookieSession = require('cookie-session');


@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // typeOrmModuleFactory,
    // typeOrmModule,
    typeOrmModulePostgresFactory,
    ReferralModule,
    AuthModule,
    DepositModule,
    InvoiceModule,
    VaultModule,
    WalletModule,
    PackageModule,
    ScheduleModule.forRoot(),
    JobModule,
    WithDrawModule,

    // MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
        cookieSession({
          signed: false,
          maxAge: 24 * 60 * 60 * 1000
        })
    ).forRoutes('*')
  }
}
