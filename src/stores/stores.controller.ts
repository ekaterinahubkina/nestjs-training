import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './stores.entity';
import { StoresService } from './stores.service';

@ApiTags('STORES')
@Controller('stores')
@UseGuards(AuthGuard, RoleGuard)
export class StoresController {
    constructor(private storesService: StoresService) {
    }

    @ApiOperation({ summary: 'Create new store' })
    @ApiResponse({ status: 201, type: Store })
    @Post()
    @Role('admin')
    create(@Body() storeDto: CreateStoreDto) {
        return this.storesService.createStore(storeDto)
    }

    @ApiOperation({ summary: 'Get all stores' })
    @ApiResponse({ status: 200, type: [Store] })
    @Get()
    @Role('user')
    getUsers() {
        return this.storesService.getStores()
    }

    @ApiOperation({ summary: 'Get store by ID' })
    @ApiResponse({ status: 200, type: Store })
    @Get(':id')
    getStoreById(@Param('id') id: number) {
        return this.storesService.getStoreById(id)
    }

    @ApiOperation({ summary: 'Delete store' })
    @ApiResponse({ status: 200 })
    @Delete(':id')
    @Role('admin')
    deleteStore(@Param('id') id: number) {
        return this.storesService.deleteStore(id)
    }

    @ApiOperation({ summary: 'Update store' })
    @ApiResponse({ status: 200 })
    @Patch(':id')
    @Role('admin')
    updateStore(@Param('id') id: number, @Body() storeDto: UpdateStoreDto) {
        return this.storesService.updateStore(id, storeDto)
    }
}
