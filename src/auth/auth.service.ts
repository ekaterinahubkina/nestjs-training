import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        if(!user) {
            throw new NotFoundException('User not found!')
        }
        return this.generateToken(user);

    }

    async signup(userDto: CreateUserDto) {
        const existingUser = await this.userService.getUserByEmail(userDto.email);
        if (existingUser) {
            throw new HttpException(`User with email ${userDto.email} already exists.`, HttpStatus.CONFLICT)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return user;

    }
    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if(!user) {
            throw new NotFoundException(`User with email: ${userDto.email} not found`)
        }
        const passwordMatches = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordMatches) {
            return user;
        } else {
            throw new UnauthorizedException('Wrong email or password.');
        }
    }
}
