import { MigrationInterface, QueryRunner } from "typeorm";

export class test1676879406560 implements MigrationInterface {
    name = 'test1676879406560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" "public"."stores_category_enum" NOT NULL, "mallId" integer NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "malls" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" "public"."malls_category_enum" NOT NULL, CONSTRAINT "UQ_de19711ba9810ca1e329899921f" UNIQUE ("name"), CONSTRAINT "PK_45cc9cb9eba035bbf705d8edf1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'unspecified', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_8fec67479bca933353c3e0eebd8" FOREIGN KEY ("mallId") REFERENCES "malls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_8fec67479bca933353c3e0eebd8"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "malls"`);
        await queryRunner.query(`DROP TABLE "stores"`);
    }

}
