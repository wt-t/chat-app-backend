import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/typeorm/entities/User';
import { CreateUserParams, updateUserParams } from 'src/utils/Types/types';
import { Repository } from 'typeorm';
import { SerialisedUser } from './dtos/serialisedUser.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(username: string) {
    const AllUsers = await this.userRepository.find();
    return AllUsers.find((user) => user.username === username);
  }

  async getAllUsers(): Promise<SerialisedUser[]> {
    const AllUsers: SerialisedUser[] = await this.userRepository.find();
    return AllUsers.map((user) => plainToClass(SerialisedUser, user));
  }

  async createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({ ...userDetails });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUser: updateUserParams) {
    return this.userRepository.update({ id }, { ...updateUser });
  }

  async deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
