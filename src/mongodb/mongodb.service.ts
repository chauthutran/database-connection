/**
 * A method to establish a MongoDB connection dynamically using parameters (connectToDatabase).
 * Generic methods to interact with MongoDB collections:
 * createCollection: Create a collection dynamically with a custom schema.
 * createDocument: Insert a document into the specified collection.
 * updateDocument: Update a document in the specified collection.
 * deleteDocument: Remove a document from the specified collection.
 */
import { Injectable } from '@nestjs/common';
import { Connection, connect, Model, Schema, model, models } from 'mongoose';

/**
 * By marking a class with @Injectable(), you tell NestJS that this class can be managed by the NestJS dependency injection system. 
 * It allows other parts of your application to request this service as a dependency.
 */
@Injectable()
export class MongoDBService {
  private connection!: Connection;

  // Method to create a dynamilc connection
  async connectToDatabase(
    username: string,
    password: string,
    dbName: string,
    host: string = 'localhost',
    appName: string,
    port?: number,
  ): Promise<void> {
    const uri = `mongodb+srv://${username}:${password}@${host}${port !== undefined ? ':' + port : ''}/${dbName}?retryWrites=true&w=majority&appName=${appName}`;

    console.log(uri);

    this.connection = await connect(uri, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    }).then((conn) => conn.connection);

    console.log(`Connected to MongoDB: ${dbName}`);
  }

  // Generic method to create a collection with a dynamic schema
  async createCollection(
    collectionName: string,
    schemaDefinition: Record<string, any>,
  ) {
    const schema = new Schema(schemaDefinition, { strict: false });
    const model = this.connection.model(collectionName, schema);
    return model;
  }

  // Find documents with a query (payload)
  async findDocuments(collectionName: string, payload: any) {
    // const model = this.connection.model(collectionName);

    // // Find documents based on the query (payload)
    // const documents = await model.find(payload).exec();

    // return documents;

    // Dynamically create a model for the given collection name
    const DynamicModel: Model<any> = this.getModel(collectionName);

    // Find documents based on the payload
    const documents = await DynamicModel.find(payload).exec();
    return documents;
  }

  // Create a document in the collection
  async createDocument(collectionName: string, payload: any) {
    // const model = this.connection.model(collectionName);
    // const document = new model(payload);
    // return document.save();

    // Dynamically create a model for the given collection name
    const DynamicModel: Model<any> = this.getModel(collectionName);

    // Create a new document using 'new' with the payload
    const document = new DynamicModel(payload);
    return await document.save();
  }

  // Update a document in the collection
  async updateDocument(collectionName: string, filter: any, updateData: any) {
    const DynamicModel = this.getModel(collectionName);

    // Update a document based on the filter and update data
    const updatedDocument = await DynamicModel.findOneAndUpdate(
      filter,
      updateData,
      {
        new: true, // return the updated document
      },
    ).exec();

    return updatedDocument;
  }

  async deleteDocument(collectionName: string, filter: any) {
    const DynamicModel = this.getModel(collectionName);

    // Delete a document based on the filter
    const deletedDocument = await DynamicModel.findOneAndDelete(filter).exec();

    return deletedDocument;
  }

  // Helper to get a dynamic model or create it if it doesn't exist
  private getModel(collectionName: string): Model<any> {
    // Check if the model already exists in mongoose.models
    if (models[collectionName]) {
      return models[collectionName];
    }

    // If not, create a new model for the collection
    const dynamicSchema = new Schema({}, { strict: false });
    return model(collectionName, dynamicSchema, collectionName);
  }
}
