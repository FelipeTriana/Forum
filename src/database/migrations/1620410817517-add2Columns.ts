import {MigrationInterface, QueryRunner} from "typeorm";

export class add2Columns1620410817517 implements MigrationInterface {
    name = 'add2Columns1620410817517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ADD "fullname" character varying(200) NOT NULL DEFAULT '-'`);
        await queryRunner.query(`ALTER TABLE "publication" ADD "subject" character varying(200) NOT NULL DEFAULT '-'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "name" SET DEFAULT 'anon'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "fullname"`);
    }

}
