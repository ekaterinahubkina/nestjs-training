import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Store } from "src/stores/stores.entity";
import { CategoryType } from "src/utils/types";

export class CreateMallDto {
    @ApiProperty({ example: 'Auchan', description: 'Mall\'s name' })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'Something about the mall', description: 'Description' })
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    @IsNotEmpty()
    @IsEnum(['online', 'offline'])
    readonly category: CategoryType;

    @ApiProperty({ example: '', description: 'List of stores in this mall' })
    @IsOptional()
    readonly stores: Store[]
}