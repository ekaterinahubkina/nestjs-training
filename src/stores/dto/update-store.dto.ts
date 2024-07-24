import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { CategoryType } from "src/utils/types";

export class UpdateStoreDto {
    @ApiProperty({ example: 'Nike', description: 'Store\'s name' })
    @IsOptional()
    readonly name: string;

    @ApiProperty({ example: 'Something about the store', description: 'Description' })
    @IsOptional()
    readonly description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    @IsOptional()
    @IsEnum(['online', 'offline'])
    readonly category: CategoryType;

    @ApiProperty({ example: 1, description: 'Mall id' })
    @IsOptional()
    readonly mallId: number
}