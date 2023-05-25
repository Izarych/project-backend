import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return next(new UnauthorizedException({ message: 'No req.headers.authorization' }))
            }

            const token = authHeader.split(' ')[1];

            if (!token) {
                return next(new UnauthorizedException({ message: 'No access token' }))
            }

            let userData = null;

            try {
                userData = new JwtService().verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            } catch (error) { }

            if (!userData) {
                return next(new UnauthorizedException({ message: 'No auth 1' }))
            }

            req.user = userData;
            next();
        } catch (error) {
            return next(new UnauthorizedException({ message: 'No auth 2' }))
        }

    }
}