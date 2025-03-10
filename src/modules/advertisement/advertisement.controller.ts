import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { BannedWordsGuards } from '../../common/guard/banned-words.guards';
import { BrandAndModelGuard } from '../../common/guard/brandAndModel.guard';
import { Role } from '../../common/guard/enums/role.enum';
import { SellingLimits } from '../../common/guard/selling-limits';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { FilesUploadDto } from '../aws/dto/files-upload.dto';
import { FileAmountValidationPipe } from '../aws/validator/fileAmountValidationPipe';
import { AdvertisementListRequestDto } from './dto/requses/advertisement-list.request.dto';
import { CreateAdvertisementRequestDto } from './dto/requses/create-advertisement.request.dto';
import { UpdateAdvertisementRequestDto } from './dto/requses/update-advertisement.request.dto';
import { AdvertisementResponceDto } from './dto/response/advertisement.responce.dto';
import { AdvertisementListResponseDto } from './dto/response/advertisement-list.response.dto';
import { AdvertisementService } from './services/advertisement.service';

@ApiTags('Advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}
  @SkipAuth()
  @ApiOperation({ summary: 'Get all advertisement' })
  @Get()
  public async findAll(
    @Query() query: AdvertisementListRequestDto,
  ): Promise<AdvertisementListResponseDto> {
    return await this.advertisementService.findAll(query);
  }
  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @UseGuards(BrandAndModelGuard, SellingLimits, BannedWordsGuards)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post advertisement' })
  @Post()
  public async create(
    @Body() dto: CreateAdvertisementRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<AdvertisementResponceDto> {
    return await this.advertisementService.create(dto, userData);
  }
  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all my advertisement' })
  @Get('my-advertisement')
  public async findMyAdvertisement(
    @Query() query: AdvertisementListRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<AdvertisementListResponseDto> {
    return await this.advertisementService.findMyAdvertisement(query, userData);
  }
  // @SkipAuth()
  @ApiOperation({ summary: 'Get one advertisement by id' })
  @Get(':advertisementId')
  @ApiBearerAuth()
  public async findOne(
    @Param('advertisementId') advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<AdvertisementResponceDto> {
    return await this.advertisementService.findOne(advertisementId, userData);
  }
  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @ApiOperation({ summary: 'Change advertisement' })
  @ApiBearerAuth()
  @Put(':advertisementId')
  public async update(
    @Param('advertisementId') advertisementId: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateAdvertisementRequestDto,
  ): Promise<AdvertisementResponceDto> {
    return await this.advertisementService.update(
      advertisementId,
      dto,
      userData,
    );
  }
  @Roles(Role.Admin, Role.Manager, Role.Seller)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete advertisement' })
  @Delete(':advertisementId')
  public async remove(
    @Param('advertisementId') advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.advertisementService.remove(advertisementId, userData);
  }
  // @Roles(Role.Admin, Role.Manager, Role.Seller)
  @Post(':advertisementId/photos')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload Advertisement photo' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'advertisement photo',
    type: FilesUploadDto,
  })
  public async uploadPhotos(
    @UploadedFiles(new FileAmountValidationPipe())
    files: Array<Express.Multer.File>,
    @Param('advertisementId') advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<any> {
    return await this.advertisementService.uploadPhotos(
      files,
      advertisementId,
      userData,
    );
  }
}
