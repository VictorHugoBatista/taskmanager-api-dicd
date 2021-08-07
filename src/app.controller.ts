import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('/healthcheck')
  @ApiOperation({ summary: 'Healthchecks the api' })
  @ApiTags('Common')
  healthCheck() {
    return {
      healthy: true,
    };
  }
}
