import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Anouncement } from "src/anouncement/anouncement.entity";
import { AnouncementView } from "src/anouncement/anouncementView.entity";
import { Deposit } from "src/deposit/deposit.entity";
import { DepositAnalytics } from "src/deposit/depositAnalytics.entity";
import { DepositTotal } from "src/deposit/depositTotal.entity";
import { Invoice, } from "src/invoice/invoice.entity";
import { Package } from "src/package/package.entity";
import { Referral } from "src/referral/referral.entity";
import { User } from "src/users/users.entity";
import { Vault } from "src/vault/vault.entity";
import { Wallet } from "src/wallet/wallet.entity";
import { WalletTotal } from "src/wallet/walletTotal.entity";
import { WithDraw } from "src/withdraw/withdraw.entity";
import { WithDrawTotal } from "src/withdraw/withdrawalTotal.entity";
import { WithDrawAnalytics } from "src/withdraw/withdrawAnalytics.entity";

export const typeOrmModule = TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'cryptoMining',
      entities: [User, Invoice, Deposit, Package, Referral, Wallet, WithDraw],
      synchronize: true,
    });

// export const typeOrmModuleFactory = TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => {
//         return {
//           type: 'mongodb',
//           database: config.get<string>('DATABASE'),
//           synchronize: true,
//           entities: [User, Invoice, Deposit, Package, Referral, Wallet],
//           useUnifiedTopology: true,
//           useNewUrlParser: true,
//           url: config.get<string>('DATABASE_HOST'),
//           ssl: false,
//         };
//       },
//     });

export const typeOrmModulePostgresFactory = TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: 'postgres',
          synchronize: false,
          logging: true,
          entities: [
            User, Invoice, Deposit, Package, Referral, 
            Wallet, Vault, WithDraw, WithDrawAnalytics, DepositAnalytics, 
            DepositTotal, WithDrawTotal, WalletTotal, AnouncementView,
            Anouncement,
          ],
          ssl: false,
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "password",
          migrations: [
            '/dist/src/migrations/*.js'
          ],
          cli: {
            migrationsDir: '/src/migrations'
          }
        };
      },
    })