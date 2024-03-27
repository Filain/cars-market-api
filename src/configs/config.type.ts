export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
  bank: BankConfig;
  aws: AWSConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type JWTConfig = {
  accessTokenSecret: string;
  accessTokenExpiration: number;
  refreshTokenSecret: string;
  refreshTokenExpiration: number;
};

export type BankConfig = {
  bankURL: string;
};

export type AWSConfig = {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsS3ObjectAcl: string;
  awsS3BucketPath: string;
  awsS3BucketName: string;
  awsS3Endpoint: string;
  awsS3Region: string;
};
