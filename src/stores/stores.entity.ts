import { ApiProperty } from "@nestjs/swagger";
import { Mall } from "src/malls/malls.entity";
import { CategoryType } from "src/utils/types";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('stores')
export class Store {
    @ApiProperty({ example: 1, description: 'ID' })
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty({ example: 'Nike', description: 'Store\'s name' })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ApiProperty({ example: 'Something about the store', description: 'Description' })
    @Column({ type: 'varchar' })
    description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    @Column({
        type: 'enum',
        enum: ['online', 'offline']
    })
    category: CategoryType;

    @ManyToOne(() => Mall, (mall) => mall.stores, { orphanedRowAction: 'delete', onDelete: 'CASCADE', nullable: false })
    // @JoinColumn({ name: 'MallId' })
    mall: Mall
}