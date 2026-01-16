import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token não fornecido');
    }

    try {
      const payload = this.jwtService.verify<{
        name: string;
        email: string;
      }>(token, {
        algorithms: ['HS256'],
      });
      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Token inválido', { cause: e });
    }
  }
}
