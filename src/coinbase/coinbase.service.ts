import { BadRequestException, Injectable, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Webhook, resources, } from "coinbase-commerce-node";


@Injectable()
export class CoinBaseService {
      secretKey: null | string;
      apiKey: null | string;
      Client = Client
      Webhook = Webhook
      resources = resources
      
  constructor(configService: ConfigService) {
    this.secretKey = configService.get('COINBASE_SECRET_KEY')
    this.apiKey = configService.get('COINBASE_API_KEY')
    this.Client.init(this.apiKey)

  }


createCharge(data) {
    try {
      return this.resources.Charge.create(data)
    } catch (error) {
      throw new BadRequestException('Merchant charge credential invalid');
    }

  }

 event(body: any, headers: string) {
    try {
      return this.Webhook.verifyEventBody(
        JSON.stringify(body),
        headers,
        this.secretKey
      );
      
    } catch (error) {
      throw new BadRequestException('Merchant hook credential invalid');
    }
  }

}
