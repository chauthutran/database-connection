// src/mongodb/mongodb.module.ts
import { Module } from '@nestjs/common';
import { MongoDBService } from './mongodb.service';
import { MongoDBController } from './mongodb.controller';

@Module({
  providers: [MongoDBService],
  controllers: [MongoDBController],
  exports: [MongoDBService],
})
export class MongoDBModule {}
