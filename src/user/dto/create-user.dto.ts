import { IsDateString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: 'admin' | 'user';

  @IsDateString()
  createdAt: Date;
}
