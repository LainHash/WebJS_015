import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1774421048591 implements MigrationInterface {
    name = 'Init1774421048591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Categories\` (\`CategoryId\` int NOT NULL AUTO_INCREMENT, \`CategoryCode\` varchar(255) NOT NULL, \`CategoryName\` varchar(255) NOT NULL, \`Description\` varchar(255) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`CategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Brands\` (\`BrandId\` int NOT NULL AUTO_INCREMENT, \`BrandCode\` varchar(255) NOT NULL, \`BrandName\` varchar(255) NOT NULL, \`Description\` varchar(255) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`BrandId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Products\` (\`ProductId\` int NOT NULL AUTO_INCREMENT, \`ProductCode\` varchar(255) NOT NULL, \`ProductName\` varchar(255) NOT NULL, \`CategoryId\` int NOT NULL, \`BrandId\` int NOT NULL, \`UnitPrice\` int NOT NULL, \`UnitsInStock\` int NOT NULL, \`Discontinued\` tinyint NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryCategoryId\` int NULL, \`brandBrandId\` int NULL, UNIQUE INDEX \`IDX_252a923bcdc16507bf11c5fab4\` (\`ProductCode\`), PRIMARY KEY (\`ProductId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Products\` ADD CONSTRAINT \`FK_8211b4790474e39bf9880805b7c\` FOREIGN KEY (\`categoryCategoryId\`) REFERENCES \`Categories\`(\`CategoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Products\` ADD CONSTRAINT \`FK_b3c23fd5da2a6e0e6f35155b894\` FOREIGN KEY (\`brandBrandId\`) REFERENCES \`Brands\`(\`BrandId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Products\` DROP FOREIGN KEY \`FK_b3c23fd5da2a6e0e6f35155b894\``);
        await queryRunner.query(`ALTER TABLE \`Products\` DROP FOREIGN KEY \`FK_8211b4790474e39bf9880805b7c\``);
        await queryRunner.query(`DROP INDEX \`IDX_252a923bcdc16507bf11c5fab4\` ON \`Products\``);
        await queryRunner.query(`DROP TABLE \`Products\``);
        await queryRunner.query(`DROP TABLE \`Brands\``);
        await queryRunner.query(`DROP TABLE \`Categories\``);
    }

}
