import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health check')
@Controller('health')
export class HealthController {
  @Get()
  health(): string {
    return 'health';
  }
}
