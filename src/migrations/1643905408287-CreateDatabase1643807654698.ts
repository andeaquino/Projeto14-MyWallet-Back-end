import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase16438076546981643905408287 implements MigrationInterface {
    name = 'CreateDatabase16438076546981643905408287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "entries" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "entries" ADD "value" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "entries" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "entries" ADD "date" character varying NOT NULL`);
    }

}
