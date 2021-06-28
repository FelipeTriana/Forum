import {MigrationInterface, QueryRunner} from "typeorm";

export class responsesTest1624907465490 implements MigrationInterface {
    name = 'responsesTest1624907465490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "response_publication_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "publication_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "author" character varying(200) NOT NULL DEFAULT 'anon'`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "description" character varying(800) NOT NULL DEFAULT 'Vacio'`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "likes" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "dislikes" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "creation_at"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT timezone('UTC'`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "creation_at"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "creation_at" TIMESTAMP NOT NULL DEFAULT timezone('UTC'`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "dislikes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "likes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "description" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "response" ADD "author" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "response" ALTER COLUMN "publication_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "response_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
