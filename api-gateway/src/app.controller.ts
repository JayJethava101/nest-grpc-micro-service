import { Controller, Get, Inject, Post, Body, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UserService {
  createUser(data: { name: string; email: string }): Observable<any>;
  getUser(data: { id: number }): Observable<any>;
}

@Controller()
export class AppController {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Post('users')
  createUser(@Body() data: { name: string; email: string }) {
    return this.userService.createUser(data);
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser({ id: parseInt(id) });
  }
} 