import {MigrationInterface, QueryRunner} from "typeorm";

export class addInteractions1620413612444 implements MigrationInterface {
    name = 'addInteractions1620413612444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ADD "like" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "publication" ADD "dislike" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "dislike"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "like"`);
    }

}
