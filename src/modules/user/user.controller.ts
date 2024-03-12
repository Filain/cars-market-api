import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @SkipAuth()
  // @Post()
  // public async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
  //   return await this.userService.create(dto);
  // }
  //
  // @SkipAuth()
  // @Get()
  // public async findAll(): Promise<string> {
  //   return await this.userService.findAll();
  // }

  @ApiBearerAuth()
  @Get(':me')
  public async findMe(): Promise<string> {
    return await this.userService.findOne(155);
  }

  @ApiBearerAuth()
  @Put('me')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return await this.userService.update(12, updateUserDto);
  }
  @SkipAuth()
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return await this.userService.remove(+id);
  }
}
