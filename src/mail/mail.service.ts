import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from "nodemailer";
import { SendMailDto } from './dto/sendMail.dto';

@Injectable()
export class MailService {
    private host: string;
    private port: number;
    private secure = false // true for 465, false for other ports
    private user: string
    private pass: string

    constructor(configService: ConfigService) {
        this.host = configService.get('MAIL_HOST')
        this.user = configService.get('MAIL_EMAIL')
        this.pass = configService.get('MAIL_PASSWORD')
        this.port = parseInt(configService.get('MAIL_PORT'))
    }

    private createTransport() {
        const transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: {
                user: this.user,
                pass: this.pass
            }
        });
        return transporter
    }

    async sendMail(body: SendMailDto) {
        try {
            const transporter = this.createTransport();
            const info = await transporter.sendMail(body);
            console.info("Message sent: %s", info.messageId);
        } catch (error) {
            console.error("Error: %s", error);        
        }
  
    }
}
