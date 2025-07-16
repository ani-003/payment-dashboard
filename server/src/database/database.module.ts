import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Module({
  providers: [MongoService],
  exports: [MongoService], // ✅ Make it available to other modules
})
export class DatabaseModule {}
