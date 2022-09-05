import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { role } = request.user || {}
    if(!role || role !== 'admin') return false;
    return true;
  }
}
