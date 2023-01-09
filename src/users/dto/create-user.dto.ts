import { ApiProperty } from "@nestjs/swagger";
import { UserGenderType } from "src/utils/types";

export class CreateUserDto {
    @ApiProperty({example: 'male', description: 'Gender (male or female)'})
    readonly gender: UserGenderType;

    @ApiProperty({example: 'John', description: 'First name'})
    readonly firstName: string;

    @ApiProperty({example: 'Doe', description: 'Last name'})
    readonly lastName: string;

    @ApiProperty({example: 'john-doe@gmail.com', description: 'Email'})
    readonly email: string;

    @ApiProperty({example: '123ZXC!@$', description: 'Password'})
    readonly password: string;

    @ApiProperty({example: '+74964903948', description: 'Telephone number'})
    readonly phoneNumber: string;
    
}