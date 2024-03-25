import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdMigration1711361384763 implements MigrationInterface {
    name = 'ThirdMigration1711361384763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "views" TIMESTAMP NOT NULL DEFAULT now(), "advertisement_id" uuid NOT NULL, CONSTRAINT "PK_ae7537f375649a618fff0fb2cb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "totalViews"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "viewsToday"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "viewsThisWeek"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "viewsThisMonth"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "advertisement_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_e1bfabe4399da1bce5c97c918ae" FOREIGN KEY ("advertisement_id") REFERENCES "advertisement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_f3c154ad4ddaccab7f3cbe92d44" FOREIGN KEY ("advertisement_id") REFERENCES "advertisement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_f3c154ad4ddaccab7f3cbe92d44"`);
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_e1bfabe4399da1bce5c97c918ae"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "advertisement_id"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "viewsThisMonth" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "viewsThisWeek" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "viewsToday" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "totalViews" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "views"`);
    }

}
