import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deposit } from "src/deposit/deposit.entity";
import { Invoice, } from "src/invoice/invoice.entity";
import { User } from "src/users/users.entity";

export const typeOrmModule = TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'cryptoMining',
      entities: [User, Invoice, Deposit],
      synchronize: true,
    });

export const typeOrmModuleFactory = TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mongodb',
          database: config.get<string>('DATABASE'),
          synchronize: true,
          entities: [User, Invoice, Deposit],
          useUnifiedTopology: true,
          useNewUrlParser: true,
          url: config.get<string>('DATABASE_HOST'),
          ssl: false,
        };
      },
    })
