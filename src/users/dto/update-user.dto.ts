import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional } from "class-validator";
import { RoleType, UserGenderType } from "src/utils/types";

export class UpdateUserDto {
    @ApiProperty({ example: 'male', description: 'Gender (male or female)' })
    @IsOptional()
    @IsEnum(['male', 'female', 'unspecified'])
    readonly gender: UserGenderType;

    @ApiProperty({ example: 'John', description: 'First name' })
    @IsOptional()
    readonly firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name' })
    @IsOptional()
    readonly lastName: string;

    @ApiProperty({ example: 'john-doe@gmail.com', description: 'Email' })
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: '123ZXC!@$', description: 'Password' })
    @IsOptional()
    readonly password: string;

    @ApiProperty({ example: '+74964903948', description: 'Telephone number' })
    @IsOptional()
    readonly phoneNumber: string;

    @ApiProperty({example: 'user', description: 'Role (user or admin)'})
    @IsEnum(['user', 'admin'])
    @IsOptional()
    readonly role: RoleType;
}