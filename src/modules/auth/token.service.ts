import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(user: CreateUserDto) {
    const payload = { username: user.username, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
    };
  }

  async refresh() {
    return;
  }
}
