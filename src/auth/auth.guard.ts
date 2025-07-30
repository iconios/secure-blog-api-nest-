import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return ValidateRequest(request);
  }
}

const ValidateRequest = async (request: Request): Promise<boolean> => {
  // Get the request headers
  const authHeader = request.headers['authorization'];
  if (!authHeader) throw new ForbiddenException('Authorization header missing');

  // Get the authorization token
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token)
    throw new ForbiddenException('Invalid authorization format');

  // Validate the authorization token
  try {
    const getUserFromToken = jwt.verify(token, process.env.JWT_SECRET);
    return !!getUserFromToken;
  } catch (e) {
    throw new ForbiddenException('Malformed token', { cause: e });
  }
};
