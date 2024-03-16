import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1710606305974 implements MigrationInterface {
    name = 'SecondMigration1710606305974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, "model" text NOT NULL, "price" text NOT NULL, "currency" text NOT NULL, "description" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_32cf9f95ef37910bbd56fe4b07b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "ccy" text NOT NULL, "base_ccy" text NOT NULL, "buy" text NOT NULL, "sale" text NOT NULL, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car-brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, CONSTRAINT "PK_5a7054f62d1cbe8431646606531" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car-model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "model" text NOT NULL, "brand_id" uuid NOT NULL, CONSTRAINT "PK_38b10ecac731f99780dd51bee10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advisement" ADD CONSTRAINT "FK_611501c7179abe05b2c3960442e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car-model" ADD CONSTRAINT "FK_944b37b5b11b76b13744a944706" FOREIGN KEY ("brand_id") REFERENCES "car-brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car-model" DROP CONSTRAINT "FK_944b37b5b11b76b13744a944706"`);
        await queryRunner.query(`ALTER TABLE "advisement" DROP CONSTRAINT "FK_611501c7179abe05b2c3960442e"`);
        await queryRunner.query(`DROP TABLE "car-model"`);
        await queryRunner.query(`DROP TABLE "car-brand"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "advisement"`);
    }

}
