import { Module } from '@nestjs/common';
import { HealthcheckController } from './application/controllers/healthcheck.controller';

@Module({
  controllers: [HealthcheckController],
})
export class CommonModule {}
