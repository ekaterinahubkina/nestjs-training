import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { UserGenderType } from "src/utils/types";

export class CreateUserDto {
    @ApiProperty({example: 'male', description: 'Gender (male or female)'})
    @IsNotEmpty()
    @IsEnum(['male', 'female', 'unspecified'])
    readonly gender: UserGenderType;

    @ApiProperty({example: 'John', description: 'First name'})
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty({example: 'Doe', description: 'Last name'})
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty({example: 'john-doe@gmail.com', description: 'Email'})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({example: '123ZXC!@$', description: 'Password'})
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({example: '+74964903948', description: 'Telephone number'})
    @IsNotEmpty()
    readonly phoneNumber: string;
    
}