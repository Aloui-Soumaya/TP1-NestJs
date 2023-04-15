import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['auth-user'];
    console.log('token === ', authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, 'aPdSgVkYp3s6v8y/B?E(H+MbQeThWmZq') as any;
      req['user'] = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
