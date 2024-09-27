import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
    //@ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refresh_token, username } = request.body;

    if (!refresh_token) {
      throw new UnauthorizedException('Поле refresh_token обязательно');
    }

    if (!username) {
      throw new UnauthorizedException('Поле username обязательно');
    }

    const user = this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Пользователя не существует');
    }

    return true;
  }
}
