import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import {
  ResourceNotFoundException,
  ResourceInternalException
} from '../exceptions/base.exception';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly MODULE_NAME = 'user';
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log(`Creating new user with email: ${createUserDto.email}`);

      
      const user: User = {
        id: Date.now().toString(),
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      this.users.push(user);
      this.logger.log(`User created successfully with ID: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new ResourceInternalException('Failed to create user', this.MODULE_NAME);
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      this.logger.log(`Fetching user with ID: ${id}`);

      const user = this.users.find(user => user.id === id);
      
      if (!user) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }
      
      this.logger.log(`User found with ID: ${id}`);
      return user;
    } catch (error) {
      this.logger.error(`Error fetching user: ${error.message}`, error.stack);
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      // Transform any other error into a ResourceInternalException
      throw new ResourceInternalException(
        `Failed to fetch user: ${error.message}`,
        this.MODULE_NAME
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      const userIndex = this.users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }

      const updatedUser = {
        ...this.users[userIndex],
        ...updateUserDto,
        updatedAt: new Date(),
      };
      
      this.users[userIndex] = updatedUser;
      this.logger.log(`User updated successfully with ID: ${id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`, error.stack);
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException('Failed to update user', this.MODULE_NAME);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      this.logger.log(`Deleting user with ID: ${id}`);
      const userIndex = this.users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }
      
      this.users.splice(userIndex, 1);
      this.logger.log(`User deleted successfully with ID: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`, error.stack);
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException('Failed to delete user', this.MODULE_NAME);
    }
  }
} 