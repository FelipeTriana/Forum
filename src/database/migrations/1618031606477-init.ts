import {MigrationInterface, QueryRunner} from "typeorm";

export class init1618031606477 implements MigrationInterface {
    name = 'init1618031606477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "publication" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "description" character varying(800) NOT NULL DEFAULT 'Vacio', "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "publication"`);
    }

}
