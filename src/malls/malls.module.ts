import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Store } from 'src/stores/stores.entity';
import { MallsController } from './malls.controller';
import { Mall } from './malls.entity';
import { MallsService } from './malls.service';

@Module({
  controllers: [MallsController],
  providers: [MallsService],
  imports: [TypeOrmModule.forFeature([Mall, Store]), AuthModule],
  exports: [MallsService]
})
export class MallsModule {}
