import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  uuid: string;

  @Expose()
  email: string;

  @Expose()
  username: string

  @Expose()
  firstName: string
  
  @Expose()
  lastName: string

  @Expose()
  access_token?: string

  @Expose()
  role?: string

}
