import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { BaseModelRequestDto } from './dto/request/base-model.request.dto';
import { ModelResponseDto } from './dto/response/model.response.dto';
import { ModelListResponseDto } from './dto/response/model-list.response.dto';
import { ModelService } from './services/model.service';

@ApiTags('Model manager')
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}
  @SkipAuth()
  @ApiOperation({ summary: 'Admin and Manager can create model here' })
  @Post()
  public async create(
    @Body() dto: BaseModelRequestDto,
  ): Promise<ModelResponseDto> {
    return await this.modelService.create(dto);
  }
  @SkipAuth()
  @Get(':brand')
  public async findAll(
    @Param('brand') brand: string,
  ): Promise<ModelListResponseDto> {
    return await this.modelService.findAll(brand);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Admin and Manager can create model here' })
  @Put(':model')
  public async update(
    @Param('model') model: string,
    @Body() dto: BaseModelRequestDto,
  ): Promise<ModelResponseDto> {
    return await this.modelService.update(model, dto);
  }
  @SkipAuth()
  @ApiOperation({ summary: 'Admin and Manager can delete model here' })
  @Delete(':model')
  public async remove(@Param('model') model: string) {
    return await this.modelService.remove(model);
  }
}
