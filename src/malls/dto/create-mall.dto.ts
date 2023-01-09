import { ApiProperty } from "@nestjs/swagger";
import { Store } from "src/stores/stores.entity";
import { CategoryType } from "src/utils/types";

export class CreateMallDto {
    @ApiProperty({ example: 'Auchan', description: 'Mall\'s name' })
    name: string;

    @ApiProperty({ example: 'Something about the mall', description: 'Description' })
    description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    category: CategoryType;

    @ApiProperty({ example: '', description: 'List of stores in this mall' })
    stores: Store[]
    
}