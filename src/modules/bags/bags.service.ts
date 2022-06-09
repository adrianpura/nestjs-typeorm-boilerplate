import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Bag } from 'src/entities/bag.entity';
import { SubscribersService } from '../subscribers/subscribers.service';
import { BagsRepository } from './bags.repository';
import { CreateBagDto } from './dto/create-bag.dto';
import { GetBagsFilterDto } from './dto/get-bags-filter.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Injectable()
export class BagsService {
  constructor(
    @InjectRepository(BagsRepository)
    private bagsRepository: BagsRepository,
    private subscribersService: SubscribersService,
  ) {}

  async createBag(createBagDto: CreateBagDto): Promise<any> {
    const { subscriber_id } = createBagDto;
    const userInDb = await this.subscribersService.getSubscriberById(
      subscriber_id,
    );
    if (!userInDb) {
      throw new NotFoundException(`User with id ${subscriber_id} not found`);
    }
    const data = await this.bagsRepository.createBag(createBagDto);
    return {
      statusCode: 201,
      message: 'bag created',
      data: data,
    };
  }

  async updateBag(updateBagDto: UpdateBagDto): Promise<any> {
    const { subscriber_id, id } = updateBagDto;
    const subscriber = await this.subscribersService.getSubscriberById(
      subscriber_id,
    );
    if (!subscriber) {
      throw new NotFoundException(`User with id ${subscriber_id} not found`);
    }

    const bag = await this.bagsRepository.getById(id);
    if (!bag) {
      throw new NotFoundException(`Bag with id ${id} not found`);
    }

    const data = await this.bagsRepository.updateBag(bag, updateBagDto);

    return {
      statusCode: 200,
      message: 'bag updated',
      data: data,
    };
  }

  async getBagById(id: number): Promise<any> {
    const data = await this.bagsRepository.getById(id);

    if (!data) {
      throw new NotFoundException(`Bag with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'bag found',
      data: data,
    };
  }

  async getBagBySubscriberId(
    subscriber_id: number,
    filterDto: GetBagsFilterDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Bag>> {
    const data = await this.bagsRepository.getBySubscriberId(
      subscriber_id,
      filterDto,
      options,
    );

    if (!data) {
      throw new NotFoundException(
        `Bag with subscriber_id ${subscriber_id} not found`,
      );
    }

    return new Pagination(
      await Promise.all(
        data.items.map(async (item: Bag) => {
          return item;
        }),
      ),
      data.meta,
      data.links,
    );
  }
}
