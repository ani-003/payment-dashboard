import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { DatabaseModule } from './database/database.module'; // ✅

@Module({
  imports: [
    AuthModule,
    PaymentsModule,
    DatabaseModule, // ✅ Make MongoService available app-wide
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
