import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
     ) {
    super(
        { 
          usernameField: 'email',
        }
    );
    
  }

  async validate(@Body('email') email: string, @Body('password') password: string): Promise<any> {
    const user = await this.authService.login({email, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}