// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongodb/mongodb.module';

@Module({
  imports: [MongoDBModule],
})
export class AppModule {}
