import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { Store } from "src/stores/stores.entity";
import { CategoryType } from "src/utils/types";

export class UpdateMallDto {
    @ApiProperty({ example: 'Auchan', description: 'Mall\'s name' })
    @IsOptional()
    readonly name: string;

    @ApiProperty({ example: 'Something about the mall', description: 'Description' })
    @IsOptional()
    readonly description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    @IsOptional()
    @IsEnum(['online', 'offline'])
    readonly category: CategoryType;

    @ApiProperty({ example: '', description: 'List of stores in this mall' })
    @IsOptional()
    readonly stores: Store[]
}