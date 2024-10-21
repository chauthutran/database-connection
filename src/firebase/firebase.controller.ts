// src/firebase/firebase.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('connect')
  connectToDatabase(
    @Body()
    firebaseConfig: {
      credential: admin.ServiceAccount;
      databaseURL: string;
    },
  ) {
    this.firebaseService.connectToDatabase(firebaseConfig);
    return { message: 'Connected to Firebase successfully' };
  }

  @Post('set/:collection/:id')
  async setDocument(
    @Param('collection') collection: string,
    @Param('id') documentId: string,
    @Body() data: any,
  ) {
    await this.firebaseService.setDocument(collection, documentId, data);
    return { message: 'Document set successfully' };
  }

  // Other CRUD methods (getDocument, updateDocument, deleteDocument) go here...
}
