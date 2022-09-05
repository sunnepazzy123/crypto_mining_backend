import { Injectable } from '@nestjs/common';


@Injectable()
export class HelpersService {
  constructor() {}

  mergeObject<T, S>(target: T, source: S) {
        return {...target, ...source}
  }

}