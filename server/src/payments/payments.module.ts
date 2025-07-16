import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { DatabaseModule } from '../database/database.module'; // ✅

@Module({
  imports: [DatabaseModule], // ✅ So PaymentsService can use MongoService
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
