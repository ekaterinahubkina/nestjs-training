import { ApiProperty } from "@nestjs/swagger";
import { UserGenderType } from "src/utils/types";

export class UpdateUserDto {
    @ApiProperty({ example: 'male', description: 'Gender (male or female)' })
    gender: UserGenderType;

    @ApiProperty({ example: 'John', description: 'First name' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name' })
    lastName: string;

    @ApiProperty({ example: 'john-doe@gmail.com', description: 'Email' })
    email: string;

    @ApiProperty({ example: '123ZXC!@$', description: 'Password' })
    password: string;

    @ApiProperty({ example: '+74964903948', description: 'Telephone number' })
    phoneNumber: string;
}