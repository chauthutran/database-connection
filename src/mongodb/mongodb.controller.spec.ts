import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBController } from './mongodb.controller';
import { MongoDBService } from './mongodb.service';

describe('MongodbController', () => {
  let controller: MongoDBController;
  let service: MongoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoDBController],
      providers: [
        {
          provide: MongoDBService,
          useValue: {
            findDocuments: jest.fn(),
            createDocument: jest.fn(),
            updateDocument: jest.fn(),
            deleteDocument: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MongoDBController>(MongoDBController);
    service = module.get<MongoDBService>(MongoDBService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests as needed, for example:
  it('should call findDocuments on MongoDBService', async () => {
    const mockResponse = [{ name: 'Groceries' }];
    (service.findDocuments as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.getDocuments('categories', {});
    expect(result).toEqual({ message: 'Document found successfully', result: mockResponse });
    expect(service.findDocuments).toHaveBeenCalledWith('categories', {});
  });
});
