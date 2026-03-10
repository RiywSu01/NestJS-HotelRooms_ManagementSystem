import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService)  {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(); 
        // NestJs can handle many request format like HTTP, WebSockets, or Microservices.
        // so this line told NestJS that we want to check the request that on Http request format right now.
        const token = this.extractTokenFromHeader(request); //extract the tokens from header
        if (!token) {
        throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token); 
            // verify tokens and assign "payload" to be like (e.g., { sub: 1, username: "john" })
            request['user'] = payload; // The request object is automatically create by NestJS
            // take the decoded payload and stick it directly onto the request object under a new property called "user".
            // Because request object gets passed along to Controllers later, Controllers can now easily look at "request.user" 
            // to see exactly who is logged in.
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    extractTokenFromHeader(request: any) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;    
    }
}