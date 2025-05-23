import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto,  } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: Date.now().toString(),
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
  }
} 