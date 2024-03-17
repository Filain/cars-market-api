import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TasksService } from './task.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [TasksService],
  exports: [],
})
export class TaskModule {}
