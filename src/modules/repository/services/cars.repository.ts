import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarsEntity } from '../../../database/entities/cars.entity';

@Injectable()
export class CarsRepository extends Repository<CarsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarsEntity, dataSource.manager);
  }
}
