import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateCarRequestDto } from './dto/requses/create-car.request.dto';
import { UpdateCarRequestDto } from './dto/requses/update-car.request.dto';
import { CarResponceDto } from './dto/response/car.responce.dto';
import { CarsService } from './services/cars.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @SkipAuth()
  @ApiOperation({ summary: 'Get all cars' })
  @Get()
  findAll() {
    return this.carsService.findAll();
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post advertisement' })
  @Put()
  public async create(
    @Body() dto: CreateCarRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CarResponceDto> {
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
