import { UserEntity } from '../../../database/entities/user.entity';
import { UserListRequestDto } from '../dto/request/user-list.request.dto';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { UserListResponseDto } from '../dto/response/user-list.response.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      accountType: userEntity.accountType,
      roles: userEntity.roles,
      image: userEntity.image,
    };
  }

  public static toListResponseDto(
    entities: UserEntity[],
    total: number,
    query: UserListRequestDto,
  ): UserListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
