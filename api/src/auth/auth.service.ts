import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

const ACCESS_TTL = '15m';
const REFRESH_TTL = '30d';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly cfg: ConfigService,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user || !(await this.verifyPassword(user, password))) {
      throw new UnauthorizedException();
    }
    await this.users.update(user.id, { lastLoginAt: new Date() });
    return this.issueTokens(user);
  }

  /** Called by the mobile app whenever the access token is about to expire. */
  async refresh(refreshToken: string) {
    const payload = await this.jwt.verifyAsync(refreshToken, {
      secret: this.cfg.get('JWT_REFRESH_SECRET'),
    });
    const user = await this.users.findOne({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException();
    await this.users.update(user.id, { lastLoginAt: new Date() });
    return this.issueTokens(user);
  }

  private issueTokens(user: User) {
    const accessToken = this.jwt.sign({ sub: user.id }, { expiresIn: ACCESS_TTL });
    const refreshToken = this.jwt.sign(
      { sub: user.id },
      { secret: this.cfg.get('JWT_REFRESH_SECRET'), expiresIn: REFRESH_TTL },
    );
    return { accessToken, refreshToken };
  }

  private async verifyPassword(_user: User, _password: string): Promise<boolean> {
    // bcrypt compare elided for the exercise
    return true;
  }
}
