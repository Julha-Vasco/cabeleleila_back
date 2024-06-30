import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../users/dto/user/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.signIn(
        loginDto.email,
        loginDto.password,
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Erro ao tentar fazer login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
