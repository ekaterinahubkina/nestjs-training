import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/stores/stores.entity';
import { Repository } from 'typeorm';
import { CreateMallDto } from './dto/create-mall.dto';
import { UpdateMallDto } from './dto/update-mall.dto';
import { Mall } from './malls.entity';

@Injectable()
export class MallsService {
    constructor(
        @InjectRepository(Mall) private mallRepository: Repository<Mall>,
        @InjectRepository(Store) private storeRepository: Repository<Store>
    ) { }
    async createMall(dto: CreateMallDto) {
        const newMall = this.mallRepository.create({ ...dto })
        await this.mallRepository.save(newMall);
        return newMall;
    }

    async getMalls() {
        const malls = await this.mallRepository.find({ relations: { stores: true } });
        return malls;
    }

    async getMallById(id: number) {
        const mall = await this.mallRepository.findOneBy({ id });
        return mall;
    }

    async deleteMall(id: number) {
        const res = await this.mallRepository.delete({ id })

        if (res.affected > 0) return { message: `Mall with id: ${id} successfully deleted` }
        else throw new NotFoundException(`Mall with id: ${id} not found`)
    }

    async updateMall(id: number, dto: UpdateMallDto) {
        const updatedMall = await this.mallRepository
            .createQueryBuilder()
            .update(Mall, dto)
            .where('id = :id', { id })
            .returning('*')
            .updateEntity(true)
            .execute();

        return updatedMall.raw[0];
    }
}
