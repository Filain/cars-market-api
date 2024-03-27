import { MigrationInterface, QueryRunner } from "typeorm";

export class FourthMigration1711533665420 implements MigrationInterface {
    name = 'FourthMigration1711533665420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
