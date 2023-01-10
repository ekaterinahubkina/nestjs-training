import { ApiProperty } from "@nestjs/swagger";
import { Store } from "src/stores/stores.entity";
import { CategoryType } from "src/utils/types";

export class UpdateMallDto {
    @ApiProperty({ example: 'Auchan', description: 'Mall\'s name' })
    readonly name: string;

    @ApiProperty({ example: 'Something about the mall', description: 'Description' })
    readonly description: string;

    @ApiProperty({ example: 'online', description: 'Category (online or offline)' })
    readonly category: CategoryType;

    @ApiProperty({ example: '', description: 'List of stores in this mall' })
    readonly stores: Store[]
}