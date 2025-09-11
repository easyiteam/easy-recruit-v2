import { NestFactory } from '@nestjs/core';
import { PlannerModule } from './planner.module';

async function bootstrap() {
  const app = await NestFactory.create(PlannerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
