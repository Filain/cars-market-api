import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Role } from '../../../common/guard/enums/role.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { BaseUserRequestDto } from '../../user/dto/request/base-user.request.dto';
import { UpdateUserRequestDto } from '../../user/dto/request/update-user.request.dto';
import { UserResponseDto } from '../../user/dto/response/user.response.dto';
import { UserMapper } from '../../user/services/user.mapper';
import { UserService } from '../../user/services/user.service';
import { SignInRequestDto } from '../dto/request/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/request/sign-up.request.dto';
import { SignUpAdminRequestDto } from '../dto/request/sign-up-admin.request.dto';
import { UpdateUserToSallerRequestDto } from '../dto/request/update-user-to-saller.request.dto';
import { AuthUserResponseDto } from '../dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly refreshRepository: RefreshTokenRepository,
  ) {}
  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }
  public async isAdmin(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  public async createAdmin(dto: SignUpRequestDto): Promise<UserEntity> {
    const password = await bcrypt.hash(dto.password, 10);
    const admin = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    return admin;
  }

  public async changeToSealer(
    userData: IUserData,
    dto: UpdateUserToSallerRequestDto,
  ): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    const user = await this.userRepository.save({ ...userEntity, ...dto });
    return UserMapper.toResponseDto(user);
  }

  //   userData: IUserData): Promise<UserEntity> {
  //   const user = await this.userRepository.findOneBy({
  //     id: userData.userId,
  //   });
  //   if (!(user.roles = Role.Sealer)) {
  //     await this.userRepository.save({user.roles = Role.Sealer});
  //   }
  //   return user;
  // }
  //
  //
  // public async updateMe(
  //   userData: IUserData,
  //   dto: UpdateUserRequestDto,
  // ): Promise<UserResponseDto> {
  //   const entity = await this.userRepository.findOneBy({ id: userData.userId });
  //   const user = await this.userRepository.save({ ...entity, ...dto });
  //   return UserMapper.toResponseDto(user);
  // }

  public async createUser(
    dto: SignUpAdminRequestDto,
  ): Promise<BaseUserRequestDto> {
    await this.userService.isEmailUniqueOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);

    return await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
  }

  public async signUp(dto: SignUpRequestDto): Promise<AuthUserResponseDto> {
    await this.userService.isEmailUniqueOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
      userRoles: user.roles,
    });

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        dto.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        dto.deviceId,
        tokens.accessToken,
      ),
    ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async signIn(dto: SignInRequestDto): Promise<AuthUserResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!userEntity) {
      throw new UnauthorizedException();
    }

    const isPasswordsMatch = await bcrypt.compare(
      dto.password,
      userEntity.password,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: userEntity.id });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
      userRoles: user.roles,
    });

    await Promise.all([
      this.refreshRepository.delete({
        user_id: user.id,
        deviceId: dto.deviceId,
      }),
      this.authCacheService.removeToken(user.id, dto.deviceId),
    ]);

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        dto.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        dto.deviceId,
        tokens.accessToken,
      ),
    ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async logout(userData: IUserData): Promise<void> {
    await Promise.all([
      this.refreshRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
      this.authCacheService.removeToken(userData.userId, userData.deviceId),
    ]);
  }

  public async refreshToken(userData: IUserData): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    await Promise.all([
      this.refreshRepository.delete({
        user_id: user.id,
        deviceId: userData.deviceId,
      }),
      this.authCacheService.removeToken(user.id, userData.deviceId),
    ]);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: userData.deviceId,
      userRoles: user.roles,
    });

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        userData.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        userData.deviceId,
        tokens.accessToken,
      ),
    ]);
    return tokens;
  }
}
