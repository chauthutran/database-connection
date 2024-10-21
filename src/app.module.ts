// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongodb/mongodb.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseController } from './firebase/firebase.controller';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [MongoDBModule, FirebaseModule],
  providers: [FirebaseService],
  controllers: [FirebaseController],
})
export class AppModule {}
