import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
    OneToMany,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
import { Exclude } from 'class-transformer';
import Model from 'src/entity/index.entity';
import { Package } from 'src/package/package.entity';
import { Referral } from 'src/referral/referral.entity';
import { Deposit } from 'src/deposit/deposit.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import { Vault } from 'src/vault/vault.entity';
import { DepositAnalytics } from 'src/deposit/depositAnalytics.entity';
import { DepositTotal } from 'src/deposit/depositTotal.entity';
import { WithDrawAnalytics } from 'src/withdraw/withdrawAnalytics.entity';
import { WithDrawTotal } from 'src/withdraw/withdrawalTotal.entity';
import { WalletTotal } from 'src/wallet/walletTotal.entity';
import { AnouncementView } from 'src/anouncement/anouncementView.entity';
import { WithDraw } from 'src/withdraw/withdraw.entity';


enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

  
@Entity()
export class User extends Model
   {
    @Column()
    firstName: string;

    @Column()
    lastName: string;
  
    @Column({
      unique: true
    })
    email: string;
  
    @Column()
    @Exclude()
    password: string;

    @Column({unique: true})
    username: string;
    
    @OneToOne(() => Referral, referral => referral.user)
    referral: Referral;

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: 'user',
    })
    role: string;
             
    @Column({default: true})
    isEnable: boolean;

    @OneToMany(() => Deposit, entity => entity.user)
    @JoinColumn()
    deposit: Deposit[];

    @OneToMany(() => DepositAnalytics, entity => entity.user)
    @JoinColumn()
    depositAnalytics: DepositAnalytics[];

    @OneToOne(() => Deposit, entity => entity.user)
    @JoinColumn()
    depositTotal: DepositTotal;

    @OneToMany(() => WithDrawAnalytics, entity => entity.user)
    @JoinColumn()
    withdrawAnalytics: WithDrawAnalytics[];

    @OneToMany(() => WithDraw, entity => entity.user)
    @JoinColumn()
    withdraw: WithDraw[];
  
    @OneToOne(() => WithDrawTotal, entity => entity.user)
    @JoinColumn()
    withdrawTotal: WithDrawTotal;

    @OneToMany(() => Wallet, entity => entity.user)
    @JoinColumn()
    wallet: Wallet[];

    @OneToOne(() => WalletTotal, entity => entity.user)
    @JoinColumn()
    walletTotal: WalletTotal;

    @OneToMany(() => Package, entity => entity.user)
    @JoinColumn()
    package: Package[]

    @OneToOne(() => Vault, entity => entity.user)
    vault: Vault

    @OneToOne(() => AnouncementView, entity => entity.user)
    anouncementView: AnouncementView
  
    @BeforeInsert()
    beforeInsert() {
      console.log('Before Insert');
  
    }
  
    @AfterInsert()
    logInsert() {
    }
  
    @AfterUpdate()
    logUpdate() {
    }
  
    @AfterRemove()
    logDelete() {

    }
  }
  