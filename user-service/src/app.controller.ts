import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'CreateUser')
  createUser(data: { name: string; email: string }) {
    return this.appService.createUser(data);
  }

  @GrpcMethod('UserService', 'GetUser')
  getUser(data: { id: number }) {
    return this.appService.getUser(data);
  }
} 