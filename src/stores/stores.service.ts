import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './stores.entity';
import { Mall } from 'src/malls/malls.entity';

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
            },
            relations: {
                mall: true
            }
        });
        return store;
    }

    async deleteStore(id: number) {
        const res = await this.storeRepository.delete({ id })

        if (res.affected > 0) return { message: `Store with id: ${id} successfully deleted` }
        else throw new NotFoundException(`Store with id: ${id} not found`)
    }

    async updateStore(id: number, dto: UpdateStoreDto) {
        // return await this.storeRepository.update({ id }, { ...dto })

        const updatedStore = await this.storeRepository
            .createQueryBuilder()
            .update(Store, dto)
            .where('id = :id', { id })
            .returning('*')
            .updateEntity(true)
            .execute();

        return updatedStore.raw[0];
    }
}
