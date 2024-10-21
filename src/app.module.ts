// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongodb/mongodb.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseController } from './firebase/firebase.controller';

@Module({
  imports: [MongoDBModule],
  providers: [FirebaseService],
  controllers: [FirebaseController],
})
export class AppModule {}
