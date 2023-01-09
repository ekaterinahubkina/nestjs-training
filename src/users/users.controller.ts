import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(AuthGuard)
    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(AuthGuard)
    @Get('/:id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id)
    }

    @ApiOperation({ summary: 'Update user by ID' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUser(id, userDto)
    }

    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted' })
    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id)
    }

  
}
