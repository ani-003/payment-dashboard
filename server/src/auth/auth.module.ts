import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';



@Module({
  controllers: [AuthController], // ✅ Only controllers here
  providers: [AuthService],     // ✅ Strategy goes here
})
export class AuthModule {}
