import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1711029491994 implements MigrationInterface {
    name = 'SecondMigration1711029491994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "url" TO "photo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "photo" TO "url"`);
    }

}
