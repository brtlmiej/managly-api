import { Test, TestingModule } from '@nestjs/testing';
import { WorkersTypesController } from './workers-types.controller';

describe('WorkersTypesController', () => {
  let controller: WorkersTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkersTypesController],
    }).compile();

    controller = module.get<WorkersTypesController>(WorkersTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
