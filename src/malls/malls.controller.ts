import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateMallDto } from './dto/create-mall.dto';
import { UpdateMallDto } from './dto/update-mall.dto';
import { Mall } from './malls.entity';
import { MallsService } from './malls.service';

@ApiTags('MALLS')
@Controller('malls')
@UseGuards(AuthGuard, RoleGuard)
export class MallsController {
    constructor(private mallsService: MallsService) {
    }

    @ApiOperation({ summary: 'Create new mall' })
    @ApiResponse({ status: 200, type: Mall })
    @Post()
    @Role('admin')
    create(@Body() mallDto: CreateMallDto) {
        return this.mallsService.createMall(mallDto)
    }

    @ApiOperation({ summary: 'Get all malls' })
    @ApiResponse({ status: 200, type: [Mall] })
    @Get()
    getUsers() {
        return this.mallsService.getMalls()
    }

    @ApiOperation({ summary: 'Get mall by ID' })
    @ApiResponse({ status: 200, type: Mall })
    @Get('/:id')
    getUserById(@Param('id') id: number) {
        return this.mallsService.getMallById(id)
    }

    @ApiOperation({ summary: 'Delete mall and related stores' })
    @ApiResponse({ status: 200 })
    @Delete(':id')
    @Role('admin')
    deleteMall(@Param('id') id: number) {
        return this.mallsService.deleteMall(id)
    }

    @ApiOperation({ summary: 'Update mall' })
    @ApiResponse({ status: 200 })
    @Patch(':id')
    @Role('admin')
    updateMall(@Param('id') id: number, @Body() mallDto: UpdateMallDto) {
        return this.mallsService.updateMall(id, mallDto)
    }
}
