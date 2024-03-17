import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { GlobalExceptionFilter } from './common/exeptions/global-exception.filter';
import { Role } from './common/guard/enums/role.enum';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig, Config } from './configs/config.type';
import { AppModule } from './modules/app.module';
import { SignUpAdminRequestDto } from './modules/auth/dto/request/sign-up-admin.request.dto';
import { AuthService } from './modules/auth/services/auth.service';
import { BankRequestService } from './modules/schedule/services/bankRequest.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cars market API')
    .setDescription('Short description of CARS API')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 3,
      persistAuthorization: true,
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    const url = `http://localhost:${appConfig.port}`;
    Logger.log(`Server running ${url}`);
    Logger.log(`Swagger running ${url}/docs`);
  });

  const appAdminCreate = app.get(AuthService);

  const adminData: SignUpAdminRequestDto = {
    deviceId: 'deviceId',
    name: 'admin',
    email: 'admin@example.com',
    password: '123qwe!@#QWE',
    roles: Role.Admin,
  };
  const ifAdmin = await appAdminCreate.isAdmin(adminData.email);
  if (!ifAdmin) {
    await appAdminCreate.createAdmin(adminData);
    Logger.log('Admin user created successfully.');
  }

  const appCreateBankRequest = app.get(BankRequestService);
  await appCreateBankRequest.getAndSave();
}
void bootstrap();
