import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  @ApiOperation({ summary: 'Healthchecks the api' })
  @ApiTags('Common')
  healthCheck() {
    return {
      healthy: true,
    };
  }
}
