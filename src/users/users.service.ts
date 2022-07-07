import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userCreate: CreateUserDto) {
    const user = this.userRepository.create({
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
      mail: userCreate.mail,
      password: userCreate.password,
      idAddress: userCreate.idAddress,
    });
    return this.userRepository.save(user);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['followed', 'following'],
    });
  }

  async findByUserId(userId: number): Promise<User> {
    const users = await this.userRepository.find({
      where: { id: userId },
      relations: ['followed', 'following', 'likes'],
    });
    return users[0];
  }

  async findByMail(userMail: string): Promise<User | undefined> {
    const users = await this.userRepository.find({
      where: { mail: userMail },
    });
    return users[0];
  }
}
