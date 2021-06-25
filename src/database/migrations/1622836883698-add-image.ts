import {MigrationInterface, QueryRunner} from "typeorm";

export class addImage1622836883698 implements MigrationInterface {
    name = 'addImage1622836883698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ADD "myBufferColumn" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "myBufferColumn"`);
    }

}
