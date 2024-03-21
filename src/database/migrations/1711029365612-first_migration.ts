import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1711029365612 implements MigrationInterface {
    name = 'FirstMigration1711029365612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."advertisement_region_enum" AS ENUM('East', 'West', 'North', 'South', 'Central', 'Kyiv', 'Southeast', 'Southwest', 'Northwest', 'Northeast', 'Undefined')`);
        await queryRunner.query(`CREATE TYPE "public"."advertisement_currency_enum" AS ENUM('UAH', 'EUR', 'USD')`);
        await queryRunner.query(`CREATE TYPE "public"."advertisement_isvalidate_enum" AS ENUM('not active', 'active')`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "brand" text NOT NULL, "model" text NOT NULL, "description" text NOT NULL, "year" integer NOT NULL, "region" "public"."advertisement_region_enum" NOT NULL DEFAULT 'Undefined', "price" numeric(10,2) NOT NULL, "currency" "public"."advertisement_currency_enum" NOT NULL DEFAULT 'UAH', "priceFunc" numeric(10,2), "isValidate" "public"."advertisement_isvalidate_enum" NOT NULL DEFAULT 'not active', "totalViews" integer NOT NULL DEFAULT '0', "viewsToday" integer NOT NULL DEFAULT '0', "viewsThisWeek" integer NOT NULL DEFAULT '0', "viewsThisMonth" integer NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('user', 'seller', 'manager', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."users_accounttype_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text, "email" text NOT NULL, "deviceId" text NOT NULL, "password" text NOT NULL, "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'user', "accountType" "public"."users_accounttype_enum" NOT NULL DEFAULT 'basic', "blocked" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "ccy" text NOT NULL, "base_ccy" text NOT NULL, "buy" text NOT NULL, "sale" text NOT NULL, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car-brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, CONSTRAINT "UQ_a872987a9a55e2c79d14decb32f" UNIQUE ("brand"), CONSTRAINT "PK_5a7054f62d1cbe8431646606531" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car-model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "model" text NOT NULL, "brand_id" uuid NOT NULL, CONSTRAINT "UQ_ac0d4c50ae4780c1d622daf8406" UNIQUE ("model"), CONSTRAINT "PK_38b10ecac731f99780dd51bee10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "url" text NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_1c55264f46f9b1accd4eff08ed6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_36f06086d2187ca909a4cf79030" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car-model" ADD CONSTRAINT "FK_944b37b5b11b76b13744a944706" FOREIGN KEY ("brand_id") REFERENCES "car-brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car-model" DROP CONSTRAINT "FK_944b37b5b11b76b13744a944706"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_36f06086d2187ca909a4cf79030"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_1c55264f46f9b1accd4eff08ed6"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "car-model"`);
        await queryRunner.query(`DROP TABLE "car-brand"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_accounttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TYPE "public"."advertisement_isvalidate_enum"`);
        await queryRunner.query(`DROP TYPE "public"."advertisement_currency_enum"`);
        await queryRunner.query(`DROP TYPE "public"."advertisement_region_enum"`);
    }

}
