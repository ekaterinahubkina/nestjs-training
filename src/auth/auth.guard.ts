import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const { authorization } = request.headers;
            if (!authorization || !authorization.startsWith('Bearer ')) {
                throw new UnauthorizedException({ message: "Unauthorized!" });
            }
            const token = authorization.replace('Bearer ', '');
            const user = this.jwtService.verify(token);
            request.user = user;
            return true;
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException({ message: "Unauthorized!" });
        }
    }
}