import { IsDateString, IsString } from 'class-validator';

export class User {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: 'admin' | 'user';

  @IsDateString()
  createdAt: Date;
}
