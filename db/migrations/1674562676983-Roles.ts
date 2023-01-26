import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1674562676983 implements MigrationInterface {
    name = 'Roles1674562676983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "roleId"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_roleid_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_value_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "value" "public"."roles_value_enum" NOT NULL, CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" "public"."users_roleid_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_value_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_roleid_enum" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roleId" TO "role"`);
    }

}
