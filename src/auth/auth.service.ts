import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService) {}

  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    // Encrypt the new user password
    const BCRYPT_SALT = process.env.BCRYPT_SALT || 10;
    try {
      const passwordHash = await bcrypt.hash(
        createUserDto.password,
        BCRYPT_SALT,
      );

      const newUser = {
        ...createUserDto,
        password: passwordHash,
      };

      // Store the new user details
      const user = this.userService.createUser(newUser);
      this.logger.log('New user password hashed successfully');
      return user;
    } catch (e) {
      this.logger.error('User registration failed', e);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again',
        { cause: e },
      );
    }
  }

  validateUser() {
    //
  }
}
