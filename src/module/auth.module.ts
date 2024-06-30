import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { User } from '../users/entities/user.entity';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants,
      signOptions: { expiresIn: '60y' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
