import {
  Param,
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  ParseIntPipe,
  Delete,
  HttpException,
  HttpStatus,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.services';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/Updateuser.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UsePipes } from '@nestjs/common/decorators';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { AllExceptionFilter } from '../filters/exeption.filter';

@UseFilters(AllExceptionFilter)
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user/getAll')
  async getUsers() {
    const users = this.usersService.getAllUsers();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/user/create')
  async createUser(@Body() user: CreateUserDto) {
    this.usersService.createUser(user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user/:id')
  @UsePipes(ValidationPipe)
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
    return;
  }
}
