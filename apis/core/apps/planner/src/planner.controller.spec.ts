import { Test, TestingModule } from '@nestjs/testing';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';

describe('PlannerController', () => {
  let plannerController: PlannerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlannerController],
      providers: [PlannerService],
    }).compile();

    plannerController = app.get<PlannerController>(PlannerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(plannerController.getHello()).toBe('Hello World!');
    });
  });
});
