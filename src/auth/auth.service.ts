import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { sendConfirmationEmail } from 'src/services/postmark';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto);
        if (!user) {
            throw new NotFoundException('User not found!')
        } else if (!user.isConfirmed) {
            throw new ForbiddenException('Please confirm your email address first')
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
        if (user) {
            const { token } = this.generateVerificationToken(user);
            sendConfirmationEmail(user.email, user.firstName, token);
        }
        return { message: `We\'ve sent an email to ${user.email}, please confirm your email address` };

    }
    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            token: this.jwtService.sign(payload, { expiresIn: '24h' })
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new NotFoundException(`User with email: ${userDto.email} not found`)
        }
        const passwordMatches = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordMatches) {
            return user;
        } else {
            throw new UnauthorizedException('Wrong email or password.');
        }
    }

    private generateVerificationToken(user: User) {
        const payload = { email: user.email };
        return {
            token: this.jwtService.sign(payload, { expiresIn: '15m' })
        }
    }

    async confirmUser(token: string) {
        const { email } = this.jwtService.verify(token);
        if (!email) {
            throw new HttpException('Token has expires', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userService.getUserByEmail(email);
        if (user.isConfirmed) {
            throw new ConflictException('Email is already confirmed')
        }

        const res = await this.userService.updateUserByEmail(email);
        if (res.affected > 0) {
            return { message: `User email: ${email} is now confirmed.` }
        } else {
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST)
        }
    }
}
