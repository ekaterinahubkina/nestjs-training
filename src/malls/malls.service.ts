import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/stores/stores.entity';
import { Repository } from 'typeorm';
import { CreateMallDto } from './dto/create-mall.dto';
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
        const users = await this.mallRepository.find({ relations: { stores: true } });
        return users;
    }

    async getMallById(id: number) {
        const mall = await this.mallRepository.findOneBy({ id });
        return mall;
    }
}
