import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdMigration1710690913993 implements MigrationInterface {
    name = 'ThirdMigration1710690913993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, "model" text NOT NULL, "price" text NOT NULL, "currency" text NOT NULL, "priceFunc" text NOT NULL, "year" text NOT NULL, "region" text NOT NULL, "description" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "account" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_1c55264f46f9b1accd4eff08ed6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_1c55264f46f9b1accd4eff08ed6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "account" text`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
    }

}
