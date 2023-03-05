import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.services';
import { CreateUserDto } from '../users/dtos/user.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(param: CreateUserDto) {
    const user = await this.usersService.findUser(param.username);
    if (
      user &&
      user.password === param.password &&
      user.username === param.username
    ) {
      return this.tokenService.generateJwtToken(param);
    } else {
      throw new UnauthorizedException();
    }
  }

  async refresh() {
    return;
  }
}
