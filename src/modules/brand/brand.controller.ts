import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/guard/enums/role.enum';
import { CarBrandEntity } from '../../database/entities/car-brand.entity';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { BrandService } from './brand.service';
import { CreateBrandRequstDto } from './dto/request/create-brand.requst.dto';
import { UpdateBrandRequstDto } from './dto/request/update-brand.requst.dto';

@ApiTags('Brand manager')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin and Manager can create brand here' })
  @Post()
  public async create(
    @Body() dto: CreateBrandRequstDto,
  ): Promise<CarBrandEntity> {
    return await this.brandService.create(dto);
  }
  @SkipAuth()
  @Get()
  public async findAll() {
    return await this.brandService.findAll();
  }
  @SkipAuth()
  @Get(':brand')
  public async findOne(@Param('brand') brand: string) {
    return await this.brandService.findOne(brand);
  }
  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin and Manager can update brand here' })
  @Put(':brand')
  public async update(
    @Param('brand') brand: string,
    @Body() dto: UpdateBrandRequstDto,
  ) {
    return await this.brandService.update(brand, dto);
  }
  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin and Manager can delete brand here' })
  @Delete(':brand')
  public async remove(@Param('brand') brand: string): Promise<void> {
    return await this.brandService.remove(brand);
  }
}
