import { ApiProperty } from "@nestjs/swagger";
import { CategoryType } from "src/utils/types";

export class CreateStoreDto {
    @ApiProperty({ example: 'Nike', description: 'Store\'s name' })
    name: string;

    @ApiProperty({ example: 'Something about the store', description: 'Description' })
    description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    category: CategoryType;

    @ApiProperty({ example: 1, description: 'Mall id' })
    mallId: number
}