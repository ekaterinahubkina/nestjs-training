import { MigrationInterface, QueryRunner } from "typeorm";

export class stores1674554181429 implements MigrationInterface {
    name = 'stores1674554181429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" "public"."stores_category_enum" NOT NULL, "mallId" integer NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_8fec67479bca933353c3e0eebd8" FOREIGN KEY ("mallId") REFERENCES "malls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_8fec67479bca933353c3e0eebd8"`);
        await queryRunner.query(`DROP TABLE "stores"`);
    }

}
