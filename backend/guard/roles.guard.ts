import {
    CanActivate,
    ExecutionContext, ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles: string[] = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new UnauthorizedException(({ message: 'Пользователь не авторизован' }))
            }
            
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException(({ message: 'Пользователь не авторизован' }))
            }
            const user = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            req.user = user;
            for (const role of user.roles) {
                if (requiredRoles.includes(role.value)) {
                    return true
                }
            }
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        } catch (e) {
            throw e
        }
    }
}