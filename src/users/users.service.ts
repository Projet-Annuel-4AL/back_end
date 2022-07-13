import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundByMailException } from './exception/user-not-found-by-mail-exception';
import { UserNotFoundByIdException } from './exception/user-not-found-by-id-exception';
import * as bcrypt from 'bcrypt';

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

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 5);
    await this.userRepository.update(userId, { currentHashedRefreshToken });
  }

  async removeCurrentRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByUserId(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['likes'],
    });
    if (user) return user;
    throw new UserNotFoundByIdException(userId);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.findByUserId(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async findByMail(userMail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { mail: userMail },
    });
    if (user) return user;
    throw new UserNotFoundByMailException(userMail);
  }
}
