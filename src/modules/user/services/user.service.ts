import {
  ConflictException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CacheCustom } from 'src/common/decorators/cache-method.decorator';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserRepository } from '../../repository/services/user.repository';
import { BaseUserRequestDto } from '../dto/request/base-user.request.dto';
import { UpdateUserRequestDto } from '../dto/request/update-user.request.dto';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: BaseUserRequestDto): Promise<any> {
    Logger.log(createUserDto);
    return 'This action adds a new user';
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  @CacheCustom(5000)
  public async findOne(id: number): Promise<string> {
    throw new UnprocessableEntityException('User not found');
    return `This action returns a #${id} user`;
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
}
