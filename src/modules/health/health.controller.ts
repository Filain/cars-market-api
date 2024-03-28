import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';

@SkipAuth()
@ApiTags('Health check')
@Controller('health')
export class HealthController {
  @Get()
  health(): string {
    return 'health';
  }
}
