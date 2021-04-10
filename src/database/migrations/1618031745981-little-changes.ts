import {MigrationInterface, QueryRunner} from "typeorm";

export class littleChanges1618031745981 implements MigrationInterface {
    name = 'littleChanges1618031745981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "completed"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ADD "completed" boolean NOT NULL DEFAULT false`);
    }

}
