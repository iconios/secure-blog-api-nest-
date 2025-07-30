import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createNewUser(createUserDto);
  }
}
