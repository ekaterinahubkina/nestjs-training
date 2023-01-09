import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(dto: CreateUserDto) {
        const newUser = this.userRepository.create({ ...dto })
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user;
    }

    async getUserByEmail(email: string) {
        const qb = this.userRepository.createQueryBuilder()
        const user = await qb
            .select(["user.password", "user.email"])
            .from(User, 'user')
            .where("user.email = :email", {
                email: email
            })
            .getOne()

        console.log(user, 'user')
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        return await this.userRepository.update({ id }, { ...dto })
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete({ id })
    }
}