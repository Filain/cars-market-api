import * as path from 'node:path';

import {
  DeleteObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3ClientConfig } from '@aws-sdk/client-s3/dist-types/S3Client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AWSConfig } from '../../configs/config.type';
import { EFileType } from './models/enums/file-type.enum';

@Injectable()
export class AwsService {
  private AWSConfig: AWSConfig;
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.AWSConfig = this.configService.get<AWSConfig>('aws');

    const configuration: S3ClientConfig = {
      credentials: {
        accessKeyId: this.AWSConfig.awsAccessKeyId,
        secretAccessKey: this.AWSConfig.awsSecretAccessKey,
      },
      region: this.AWSConfig.awsS3Region,
    };

    const endpoint = this.AWSConfig.awsS3Endpoint;
    if (endpoint) {
      configuration.endpoint = endpoint;
      configuration.forcePathStyle = true;
    }

    this.client = new S3Client(configuration);
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemId: string,
    itemType: EFileType,
  ): Promise<string> {
    const pathFile = this.buildPath(file.originalname, itemId, itemType);

    await this.client.send(
      new PutObjectCommand({
        Key: pathFile,
        Bucket: this.AWSConfig.awsS3BucketName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: this.AWSConfig.awsS3ObjectAcl as ObjectCannedACL,
      }),
    );
    return pathFile;
  }
  public async uploadFiles(
    files: Express.Multer.File[],
    itemId: string,
    itemType: EFileType,
  ): Promise<string[]> {
    const uploadedFilePaths: string[] = [];

    // Проходимося по кожному файлу у масиві
    for (const file of files) {
      const pathFile = this.buildPath(file.originalname, itemId, itemType);

      // Відправляємо файл на сервер AWS S3
      await this.client.send(
        new PutObjectCommand({
          Key: pathFile,
          Bucket: this.AWSConfig.awsS3BucketName,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: this.AWSConfig.awsS3ObjectAcl as ObjectCannedACL,
        }),
      );

      // Додаємо шлях завантаженого файлу до масиву
      uploadedFilePaths.push(pathFile);
    }

    // Повертаємо масив шляхів завантажених файлів
    return uploadedFilePaths;
  }

  public async deleteFile(pathFile: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.AWSConfig.awsS3BucketName,
        Key: pathFile,
      }),
    );
  }

  private buildPath(
    fileName: string,
    itemId: string,
    itemType: string,
  ): string {
    return `${itemType}/${itemId}/${crypto.randomUUID()}${path.extname(fileName)}`;
  }
}
