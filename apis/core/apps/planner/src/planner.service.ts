import { Injectable } from '@nestjs/common';

@Injectable()
export class PlannerService {
  getHello(): string {
    return 'Hello World!';
  }
}
