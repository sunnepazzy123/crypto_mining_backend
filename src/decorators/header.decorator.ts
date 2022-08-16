import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Header = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.headers;
  },
);
