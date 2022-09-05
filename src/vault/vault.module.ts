import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaultService } from './vault.service';
import { Vault } from './vault.entity';
import { VaultController } from './vault.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HelperModule } from 'src/helpers/helpers.module';


@Module({
 controllers: [VaultController],
  providers: [
    VaultService,
  ],
  imports: [
    TypeOrmModule.forFeature([Vault]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3 days' },
        };
      },
      inject: [ConfigService],
    }),
    HelperModule,
  ],
  exports: [VaultService]

})
export class VaultModule {}