import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/guard/enums/role.enum';
import { BaseUserRequestDto } from '../user/dto/request/base-user.request.dto';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInRequestDto } from './dto/request/sign-in.request.dto';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';
import { SignUpAdminRequestDto } from './dto/request/sign-up-admin.request.dto';
import { AuthUserResponseDto } from './dto/response/auth-user.response.dto';
import { TokenResponseDto } from './dto/response/token.response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Registration' })
  @Post('sign-up')
  public async signUp(
    @Body() dto: SignUpRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(
    @Body() dto: SignInRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signIn(dto);
  }
  @Roles(Role.Seller, Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change to Seller or user' })
  @Put('seller')
  public async changeToSealer(
    @CurrentUser() userData: IUserData,
    // @Body() dto: UpdateUserToSallerRequestDto,
  ): Promise<UserResponseDto> {
    return await this.authService.changeToSealer(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.logout(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Update token pair' })
  @Post('refresh')
  public async updateRefreshToken(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenResponseDto> {
    return await this.authService.refreshToken(userData);
  }
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creat manager or other type of user' })
  @Post('create')
  public async createUser(
    @Body() dto: SignUpAdminRequestDto,
  ): Promise<BaseUserRequestDto> {
    return await this.authService.createUser(dto);
  }
}
