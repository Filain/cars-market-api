import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
  @Post()
  public async create(
    @Body() dto: CreateCarRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CarsResponceDto> {
    return await this.carsService.create(dto, userData);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all my cars' })
  @Get('my-cars')
  public async findMyCars(
    @Query() query: CarsListRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CarsListResponseDto> {
    return await this.carsService.findMyCars(query, userData);
  }
  @SkipAuth()
  @ApiOperation({ summary: 'Get one car by id' })
  @Get(':carId')
  public async findOne(
    @Param('carId') carId: string,
  ): Promise<CarsResponceDto> {
    return await this.carsService.findOne(carId);
  }
  @ApiOperation({ summary: 'Change advertisement' })
  @ApiBearerAuth()
  @Put(':carId')
  public async update(
    @Param('carId') carId: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateCarRequestDto,
  ): Promise<CarsResponceDto> {
    return await this.carsService.update(carId, dto, userData);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete advertisement' })
  @Delete(':carId')
  public async remove(
    @Param('carId') carId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.carsService.remove(carId, userData);
  }
}
