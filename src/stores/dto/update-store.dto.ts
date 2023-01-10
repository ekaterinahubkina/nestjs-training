import { ApiProperty } from "@nestjs/swagger";
import { CategoryType } from "src/utils/types";

export class UpdateStoreDto {
    @ApiProperty({ example: 'Nike', description: 'Store\'s name' })
    readonly name: string;

    @ApiProperty({ example: 'Something about the store', description: 'Description' })
    readonly description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    readonly category: CategoryType;

    @ApiProperty({ example: 1, description: 'Mall id' })
    readonly mallId: number
}