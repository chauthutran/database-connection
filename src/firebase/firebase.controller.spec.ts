import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';

describe('FirebaseController', () => {
  let controller: FirebaseController;
  let service: FirebaseService;

  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirebaseController],
      providers: [
        {
          provide: FirebaseService,
          useValue: {
            findDocuments: jest.fn(),
            createDocument: jest.fn(),
            updateDocument: jest.fn(),
            deleteDocument: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FirebaseController>(FirebaseController);
    service = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests as needed, for example:
  it('should call findDocuments on FirebaseService', async () => {
    const mockResponse = [{ name: 'Groceries' }];
    (service.findDocument as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.findDocument('categories', "xxx");
    expect(result).toEqual({ message: 'Document found successfully', result: mockResponse });
    expect(service.findDocument).toHaveBeenCalledWith('categories', {});
  });
});
