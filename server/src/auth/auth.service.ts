import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123' }
  ];

  login(username, password) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    return { access_token: token };
  }
}
