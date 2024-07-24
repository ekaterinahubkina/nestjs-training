import { Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { RoleGuard } from 'src/auth/guards/role.guard';

@ApiTags('USERS')
@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @Role('admin')
    getUsers() {
        return this.usersService.getUsers()
    }

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, type: User })
    @Get('/:id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id)
    }

    @ApiOperation({ summary: 'Update user by ID' })
    @ApiResponse({ status: 200, type: User })
    @Patch('/:id')
    updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUser(id, userDto)
    }

    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted' })
    @Delete('/:id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id)
    }
}
