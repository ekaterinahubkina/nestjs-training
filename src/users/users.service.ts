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
            .select(["user.password", "user.email", "user.id", "user.role", "user.isConfirmed"])
            .from(User, 'user')
            .where("user.email = :email", {
                email: email
            })
            .getOne()

        console.log(user, 'user')
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const updatedUser = await this.userRepository
            .createQueryBuilder()
            .update(User, dto)
            .where('id = :id', { id })
            .returning(['id', 'email', 'firstName', 'lastName', 'gender', 'phoneNumber'])
            .updateEntity(true)
            .execute();

        return updatedUser.raw[0];
    }

    async deleteUser(id: number) {

        // const user = await this.getUserById(id);
        // if (user) {
        //     await this.userRepository.delete({ id });
        //     return { messge: `User with id: ${id} was successfully deleted.` }
        // }

        const res = await this.userRepository.createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id })
            .execute()

        if (res.affected > 0) return { message: `User with id: ${id} successfully deleted` }
        else throw new NotFoundException(`User with id: ${id} not found`)
    }

    async updateUserByEmail(email: string) {
        return await this.userRepository.update({ email }, { isConfirmed: true })
    }
}