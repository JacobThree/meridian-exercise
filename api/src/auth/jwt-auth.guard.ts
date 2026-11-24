import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const header: string | undefined = req.headers['authorization'];
    if (!header?.startsWith('Bearer ')) throw new UnauthorizedException();

    let payload: { sub: number };
    try {
      payload = await this.jwt.verifyAsync(header.slice('Bearer '.length));
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.users.findById(payload.sub);
    if (!user) throw new UnauthorizedException();

    req.user = { id: user.id };
    return true;
  }
}
