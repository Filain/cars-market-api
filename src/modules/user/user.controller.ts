import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { FileUploadDto } from '../aws/dto/file-upload.dto';
import { FileSizeValidationPipe } from '../aws/validator/fileSizeValidationPipe';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  public async findAll(): Promise<string> {
    return await this.userService.findAll();
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get information about me' })
  @Get('me')
  public async findMe(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.findMe(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change information about me' })
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateMe(userData, dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get user about me' })
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return await this.userService.findOne(+id);
  }
  // @SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload photo' })
  @Post('me/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'user avatar',
    type: FileUploadDto,
  })
  public async uploadAvatar(
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.uploadAvatar(file, userData);
  }
}
