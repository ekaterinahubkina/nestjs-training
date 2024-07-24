import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const role = this.reflector.get<string>('role', context.getHandler());
            if (!role) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const { authorization } = request.headers;
            if (!authorization || !authorization.startsWith('Bearer ')) {
                throw new UnauthorizedException({ message: "Unauthorized!" });
            }
            const token = authorization.replace('Bearer ', '');
            const user = this.jwtService.verify(token);
            request.user = user;
            console.log(user)
            if (user.role === 'admin') {
                console.log('User is Admin')
                return true;
            }
            return user.role === role;
        } catch (error) {
            console.log(error)
            throw new ForbiddenException({ message: "Access denied!" });
        }
    }
}