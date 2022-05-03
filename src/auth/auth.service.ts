import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(mail: string, pwd: string): Promise<any> {
    const user = await this.userService.findByMail(mail);
    if (user && user.password === pwd) {
      const { password, posts, ...result } = user; // retire le champs password de la réponse
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { mail: user.mail, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
