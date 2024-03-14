import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarsListRequestDto } from './dto/requses/cars-list.request.dto';
import { CreateCarRequestDto } from './dto/requses/create-car.request.dto';
import { UpdateCarRequestDto } from './dto/requses/update-car.request.dto';
import { CarsResponceDto } from './dto/response/cars.responce.dto';
import { CarsListResponseDto } from './dto/response/cars-list.response.dto';
import { CarsService } from './services/cars.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @SkipAuth()
  @ApiOperation({ summary: 'Get all cars' })
  @Get()
  public async findAll(
    @Query() query: CarsListRequestDto,
  ): Promise<CarsListResponseDto> {
    return await this.carsService.findAll(query);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post advertisement' })
  @Put()
  public async create(
    @Body() dto: CreateCarRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CarsResponceDto> {
    return await this.carsService.create(dto, userData);
  }
  @SkipAuth()
  @ApiOperation({ summary: 'Get one car by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
  @ApiOperation({ summary: 'Change advertisement' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarRequestDto) {
    return this.carsService.update(+id, updateCarDto);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete advertisement' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all my advertisement' })
  @Get('My')
  findMy(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
}
