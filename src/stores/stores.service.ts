import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mall } from 'src/malls/malls.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './stores.entity';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store) private storeRepository: Repository<Store>,
        @InjectRepository(Mall) private mallRepository: Repository<Mall>) { }

    async createStore(dto: CreateStoreDto) {
        const newStore = this.storeRepository.create({ ...dto })
        await this.storeRepository.save(newStore);
        return newStore;
    }

    async getStores() {
        const stores = await this.storeRepository.find({ relations: { mall: true } });
        return stores;
    }

    async getStoreById(id: number) {
        const store = await this.storeRepository.findOne({
            where: {
                id: id,
            }, relations: {
                mall: true
            }
        });
        return store;
    }
}
