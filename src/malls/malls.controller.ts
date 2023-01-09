import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMallDto } from './dto/create-mall.dto';
import { Mall } from './malls.entity';
import { MallsService } from './malls.service';

@ApiTags('MALLS')
@Controller('malls')
@UseGuards(AuthGuard)
export class MallsController {
    constructor(private mallsService: MallsService) {
    }

    @ApiOperation({ summary: 'Create new mall' })
    @ApiResponse({ status: 200, type: Mall })  
    @Post()
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
}
