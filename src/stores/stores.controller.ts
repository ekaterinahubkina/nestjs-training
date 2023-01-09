import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './stores.entity';
import { StoresService } from './stores.service';

@ApiTags('STORES')
@Controller('stores')
@UseGuards(AuthGuard)
export class StoresController {
    constructor(private storesService: StoresService) {
    }

    @ApiOperation({ summary: 'Create new store' })
    @ApiResponse({ status: 200, type: Store })  
    @Post()
    create(@Body() storeDto: CreateStoreDto) {
        return this.storesService.createStore(storeDto)
    }

    @ApiOperation({ summary: 'Get all stores' })
    @ApiResponse({ status: 200, type: [Store] })
    @Get()
    getUsers() {
        return this.storesService.getStores()
    }

    @ApiOperation({ summary: 'Get store by ID' })
    @ApiResponse({ status: 200, type: Store })
    @Get('/:id')
    getStoreById(@Param('id') id: number) {
        return this.storesService.getStoreById(id)
    }
}
