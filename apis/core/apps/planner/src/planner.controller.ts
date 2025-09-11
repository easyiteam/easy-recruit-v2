import { Controller, Get } from '@nestjs/common';
import { PlannerService } from './planner.service';

@Controller()
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Get()
  getHello(): string {
    return this.plannerService.getHello();
  }
}
