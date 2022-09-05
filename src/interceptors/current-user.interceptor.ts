import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

  
  @Injectable()
  export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) {}
  
    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
      const request = context.switchToHttp().getRequest();
      if(!request.user){
        throw new UnauthorizedException()
     }
      const { id } =  request.user;
      if (id) {
        const user = await this.userService.findOne(id);
         request.user = user;
       }
     // run the actual route handler
      return handler.handle();
    }
  }
  