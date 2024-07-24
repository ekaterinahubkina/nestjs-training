import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @ApiProperty({ example: 'john-doe@gmail.com', description: 'Email' })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ example: '123ZXC!@$', description: 'Password' })
    @IsNotEmpty()
    readonly password: string;
}