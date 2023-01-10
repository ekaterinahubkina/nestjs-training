import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Mall } from "src/malls/malls.entity";
import { CategoryType } from "src/utils/types";

export class CreateStoreDto {
    @ApiProperty({ example: 'Nike', description: 'Store\'s name' })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'Something about the store', description: 'Description' })
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    @IsNotEmpty()
    @IsEnum(['online', 'offline'])
    readonly category: CategoryType;

    @ApiProperty({ example: { id: 1 }, description: 'related mall' })
    @IsNotEmpty()
    readonly mall: Mall
}