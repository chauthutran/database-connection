// src/mongodb/mongodb.controller.ts
import { Controller, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { MongoDBService } from './mongodb.service';

@Controller('mongodb')
export class MongoDBController {
  constructor(private readonly mongodbService: MongoDBService) {}

  // Endpoint to connect to MongoDB with dynamic parameters
  @Post('connect')
  async connectToDB(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('dbName') dbName: string,
    @Body('host') host: string = 'localhost',
    @Body('appName') appName: string,
    @Body('port') port: number,
  ) {
    await this.mongodbService.connectToDatabase(username, password, dbName, host, appName, port);
    return { message: `Connected to ${dbName} successfully` };
  }

  // Create a document in a specific collection
  @Post('find/:collectionName')
  async getDocuments(
    @Param('collectionName') collectionName: string,
    @Body() payload: any,
  ) {
    const result = await this.mongodbService.findDocuments(collectionName, payload);
    return { message: 'Document found successfully', result };
  }

  // Create a document in a specific collection
  @Post('create/:collectionName')
  async createDocument(
    @Param('collectionName') collectionName: string,
    @Body() payload: any,
  ) {
    const result = await this.mongodbService.createDocument(collectionName, payload);
    return { message: 'Document created successfully', result };
  }

  // Update a document in a specific collection
  @Put('update/:collectionName')
  async updateDocument(
    @Param('collectionName') collectionName: string,
    @Body('filter') filter: any,
    @Body('payload') payload: any,
  ) {
    const result = await this.mongodbService.updateDocument(collectionName, filter, payload);
    return { message: 'Document updated successfully', result };
  }

  // Delete a document in a specific collection
  @Delete('delete/:collectionName')
  async deleteDocument(
    @Param('collectionName') collectionName: string,
    @Body('filter') filter: any,
  ) {
    const result = await this.mongodbService.deleteDocument(collectionName, filter);
    return { message: 'Document deleted successfully', result };
  }
}
