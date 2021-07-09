import {MigrationInterface, QueryRunner} from "typeorm";

export class addImageColumn1625675871829 implements MigrationInterface {
    name = 'addImageColumn1625675871829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" RENAME COLUMN "myBufferColumn" TO "image"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "publication" ADD "image" character varying(200) NOT NULL DEFAULT 'not image'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "publication" ADD "image" bytea`);
        await queryRunner.query(`ALTER TABLE "publication" RENAME COLUMN "image" TO "myBufferColumn"`);
    }

}
