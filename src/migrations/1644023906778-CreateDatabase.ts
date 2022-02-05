import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1644023906778 implements MigrationInterface {
    name = 'CreateDatabase1644023906778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entries" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "value" numeric NOT NULL, "category_id" integer, CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_37514effe55909a03b7305864f4" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_37514effe55909a03b7305864f4"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "entries"`);
    }

}
