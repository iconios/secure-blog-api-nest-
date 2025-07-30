import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private user: User[] = [];
  private readonly logger = new Logger(UserService.name);

  createUser(createUserDto: CreateUserDto): User {
    try {
      const newUser = {
        id: uuidv4(),
        ...createUserDto,
      };
      this.user.push(newUser);
      this.logger.log(`User ${createUserDto.username} successfully registered`);
      return newUser;
    } catch (e: unknown) {
      throw new InternalServerErrorException(
        'Something went wrong. Please try again ',
        e,
      );
    }
  }

  findAll(): User[] {
    return this.user;
  }

  findOneById(id: string): User {
    return this.user.find((person) => person.id === id);
  }

  findOneByUsername(username: string): User {
    return this.user.find((person) => person.username === username);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    // Confirm the user id is valid
    const validateUserId = this.user.find((person) => person.id === id);
    if (!validateUserId) {
      this.logger.log('Invalid user');
      throw new ForbiddenException('Invalid user');
    }

    // Update the user details in the updateUserDetails object
    let updateUserDetails = { ...validateUserId };
    if (updateUserDto.username) {
      updateUserDetails = {
        ...validateUserId,
        username: updateUserDto.username,
      };
      this.logger.log(`User ${id} updates username property`);
    }

    if (updateUserDto.password) {
      updateUserDetails = {
        ...validateUserId,
        password: updateUserDto.password,
      };
      this.logger.log(`User ${id} updates password property`);
    }

    if (updateUserDto.role) {
      updateUserDetails = {
        ...validateUserId,
        role: updateUserDto.role,
      };
      this.logger.log(`User ${id} updates role property`);
    }

    // Update the user details in the storage
    const filteredUsers = this.user.filter((user) => user.id !== id);
    filteredUsers.push(updateUserDetails);
    this.user = [...filteredUsers];

    // Return the updated user details
    this.logger.log(`User ${id} update request completed`);
    return updateUserDetails;
  }

  remove(id: string): boolean {
    const filteredUsers = this.user.filter((user) => user.id !== id);
    this.user = [...filteredUsers];
    return true;
  }
}
