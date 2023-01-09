import { ApiProperty } from "@nestjs/swagger";
import { Store } from "src/stores/stores.entity";
import { CategoryType } from "src/utils/types";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('malls')
export class Mall {
    @ApiProperty({ example: 1, description: 'ID' })
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty({ example: 'Auchan', description: 'Mall\'s name' })
    @Column({ type: 'varchar', nullable: false, unique: true })
    name: string;

    @ApiProperty({ example: 'Something about the mall', description: 'Description' })
    @Column({ type: 'varchar' })
    description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    @Column({
        type: 'enum',
        enum: ['online', 'offline']
    })
    category: CategoryType;

    @ApiProperty({ example: '?', description: 'List of stores in this mall', required: false })
    @OneToMany(() => Store, (store) => store.mall)
    stores: Store[]
}