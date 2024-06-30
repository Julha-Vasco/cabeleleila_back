import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/user/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
