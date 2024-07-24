import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Mall } from 'src/malls/malls.entity';
import { StoresController } from './stores.controller';
import { Store } from './stores.entity';
import { StoresService } from './stores.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [TypeOrmModule.forFeature([Store, Mall]), AuthModule],
  exports: [StoresService]
})
export class StoresModule {}
