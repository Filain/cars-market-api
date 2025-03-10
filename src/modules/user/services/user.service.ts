import {
  ConflictException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { query } from 'express';
import { CacheCustom } from 'src/common/decorators/cache-method.decorator';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AwsService } from '../../aws/aws.service';
import { EFileType } from '../../aws/models/enums/file-type.enum';
import { UserRepository } from '../../repository/services/user.repository';
import { BaseUserRequestDto } from '../dto/request/base-user.request.dto';
import { UpdateUserRequestDto } from '../dto/request/update-user.request.dto';
import { UserListRequestDto } from '../dto/request/user-list.request.dto';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { UserListResponseDto } from '../dto/response/user-list.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly awsService: AwsService,
  ) {}

  public async findAll(
    query: UserListRequestDto,
  ): Promise<UserListResponseDto> {
    const [users, total] = await this.userRepository.findAll(query);
    return UserMapper.toListResponseDto(users, total, query);
  }

  public async create(createUserDto: BaseUserRequestDto): Promise<any> {
    Logger.log(createUserDto);
    return 'This action adds a new user';
  }

  // @CacheCustom(5000)
  public async findOne(id: string): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id });
    return UserMapper.toResponseDto(entity);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    const user = await this.userRepository.save({ ...entity, ...dto });
    return UserMapper.toResponseDto(user);
  }

  public async remove(id: number): Promise<string> {
    return `This action removes a #${id} user`;
  }
  public async findMe(userData: IUserData): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDto(entity);
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException();
    }
  }
  public async uploadAvatar(
    file: Express.Multer.File,
    userData: IUserData,
  ): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (userEntity.image) {
      await this.awsService.deleteFile(userEntity.image);
    }

    const pathFile = await this.awsService.uploadFile(
      file,
      userData.userId,
      EFileType.USER,
    );

    await this.userRepository.save({ ...userEntity, image: pathFile });
    return UserMapper.toResponseDto(userEntity);
  }
}
