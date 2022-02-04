import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1643980564339 implements MigrationInterface {
    name = 'CreateDatabase1643980564339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entries" ALTER COLUMN "value" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" ALTER COLUMN "value" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "color"`);
    }

}
