import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deposit } from "src/deposit/deposit.entity";
import { Invoice, } from "src/invoice/invoice.entity";
import { Package } from "src/package/package.entity";
import { Referral } from "src/referral/referral.entity";
import { User } from "src/users/users.entity";
import { Vault } from "src/vault/vault.entity";
import { Wallet } from "src/wallet/wallet.entity";
import { WithDraw } from "src/withdraw/withdraw.entity";

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
          synchronize: true,
          entities: [User, Invoice, Deposit, Package, Referral, Wallet, Vault, WithDraw],
          ssl: false,
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "password",
        };
      },
    })