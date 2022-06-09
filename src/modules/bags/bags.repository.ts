import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Bag } from 'src/entities/bag.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBagDto } from './dto/create-bag.dto';
import { GetBagsFilterDto } from './dto/get-bags-filter.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@EntityRepository(Bag)
export class BagsRepository extends Repository<Bag> {
  async createBag(createBagDto: CreateBagDto): Promise<Bag> {
    const {
      brand_id,
      store_id,
      subscriber_id,
      order_type,
      order_time,
      order_time_schedule,
    } = createBagDto;
    const bag = new Bag();
    bag.brand_id = brand_id;
    bag.store_id = store_id;
    bag.status = 1;
    bag.subscriber_id = subscriber_id;
    if (order_type) {
      bag.order_type = order_type;
    }
    if (order_time) {
      bag.order_time = order_time;
    }
    if (order_time_schedule) {
      bag.order_time_schedule = order_time_schedule;
    }

    try {
      await bag.save();
    } catch (e) {
      if (e.code === '23505' || e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('bag already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return bag;
  }

  async updateBag(bag: Bag, updateBagDto: UpdateBagDto): Promise<Bag> {
    const {
      //   brand_id,
      //   store_id,
      //   subscriber_id,
      order_type,
      order_time,
      order_time_schedule,
    } = updateBagDto;

    // if (brand_id) {
    //   bag.brand_id = brand_id;
    // }
    // if (store_id) {
    //   bag.store_id = store_id;
    // }
    // if (subscriber_id) {
    //   bag.subscriber_id = subscriber_id;
    // }
    if (order_type) {
      bag.order_type = order_type;
    }
    if (order_time) {
      bag.order_time = order_time;
    }
    if (order_time_schedule) {
      bag.order_time_schedule = order_time_schedule;
    }

    try {
      await bag.save();
    } catch (e) {
      console.log(e.code);
      throw new InternalServerErrorException();
    }

    return bag;
  }

  async getById(id: number): Promise<Bag> {
    const query = this.createQueryBuilder('bags');

    query.andWhere('bags.id = :id', { id });

    return await query.getOne();
  }

  async getBySubscriberId(
    subscriber_id: number,
    filterDto: GetBagsFilterDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Bag>> {
    const query = this.createQueryBuilder('bags');
    query.andWhere('bags.subscriber_id = :subscriber_id', { subscriber_id });

    return await paginate<Bag>(query, options);
  }
}
