import { ApiProperty } from "@nestjs/swagger";
import { RoleType, UserGenderType } from "src/utils/types";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty({ example: 1, description: 'ID' })
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty({ example: 'male', description: 'Gender (male, female or unspecified)' })
    @Column({
        type: 'enum',
        enum: ['male', 'female', 'unspecified'],
        default: 'unspecified'
    })
    gender: UserGenderType;

    @ApiProperty({ example: 'John', description: 'First name' })
    @Column({ type: 'varchar', nullable: false })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name' })
    @Column({ type: 'varchar' })
    lastName: string;

    @ApiProperty({ example: 'john-doe@gmail.com', description: 'Email' })
    @Column({ type: 'varchar', unique: true })
    email: string;

    @ApiProperty({ example: '123ZXC!@$', description: 'Password' })
    @Column({ type: 'varchar', select: false })
    password: string;

    @ApiProperty({ example: '+74964903948', description: 'Telephone number' })
    @Column({ type: 'varchar' })
    phoneNumber: string;

    @ApiProperty({ example: true, description: 'Is user confirmed or not' })
    @Column({ type: 'boolean', default: false })
    isConfirmed: boolean;

    @ApiProperty({ example: 'admin', description: 'Role of the user' })
    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user'
    })
    role: RoleType


    
    // @ManyToOne(() => Role, (role) => role.users)
    // role: Role;
}