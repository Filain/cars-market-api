import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1710153269695 implements MigrationInterface {
    name = 'FirstMigration1710153269695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, "model" text NOT NULL, "price" text NOT NULL, "currency" text NOT NULL, "description" boolean NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text, "email" text NOT NULL, "password" text NOT NULL, "role" text, "account" text, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_36f06086d2187ca909a4cf79030" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_36f06086d2187ca909a4cf79030"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
