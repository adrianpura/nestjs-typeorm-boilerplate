/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetSubscribersFilterDo } from './dto/get-subscribers-filter.dto';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscribersRepository } from './subscribers.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './../../entities/subscriber.entity';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
const aes256 = require('aes256');

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(SubscribersRepository)
    private subscribersRepository: SubscribersRepository,
  ) {}

  async getSubscribers(
    filterDto: GetSubscribersFilterDo,
    options: IPaginationOptions,
  ): Promise<Pagination<Subscriber>> {
    const results = await this.subscribersRepository.getSubscribers(
      filterDto,
      options,
    );
    const cipher = aes256.createCipher(process.env.APP_KEY);

    return new Pagination(
      await Promise.all(
        results.items.map(async (item: Subscriber) => {
          item['psid'] = cipher.decrypt(item['psid'].toString());
          item['first_name'] = cipher.decrypt(item['first_name'].toString());
          item['last_name'] = cipher.decrypt(item['last_name'].toString());
          item['email'] = item['email']
            ? cipher.decrypt(item['email'].toString())
            : '';

          return item;
        }),
      ),
      results.meta,
      results.links,
    );
  }

  async getSubscriberById(id: number): Promise<any> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const data = await this.subscribersRepository.getById(id);

    if (!data) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }

    data['psid'] = cipher.decrypt(data['psid'].toString());
    data['first_name'] = cipher.decrypt(data['first_name'].toString());
    data['last_name'] = cipher.decrypt(data['last_name'].toString());
    data['email'] = data['email']
      ? cipher.decrypt(data['email'].toString())
      : '';

    return {
      statusCode: 200,
      message: 'subscriber found',
      data: data,
    };
  }

  async getSubscriberByPsid(psid: string): Promise<any> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const data = await this.subscribersRepository.getByPsid(psid);

    if (!data) {
      throw new NotFoundException(`Subscriber with PSID ${psid} not found`);
    }

    data['psid'] = cipher.decrypt(data['psid'].toString());
    data['first_name'] = cipher.decrypt(data['first_name'].toString());
    data['last_name'] = cipher.decrypt(data['last_name'].toString());
    data['email'] = data['email']
      ? cipher.decrypt(data['email'].toString())
      : '';

    return {
      statusCode: 200,
      message: 'subscriber found',
      data: data,
    };
  }

  async createSubscriber(
    createSubscriberDto: CreateSubscriberDto,
  ): Promise<any> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const data = await this.subscribersRepository.createSubscriber(
      createSubscriberDto,
    );

    data['psid'] = cipher.decrypt(data['psid'].toString());
    data['first_name'] = cipher.decrypt(data['first_name'].toString());
    data['last_name'] = cipher.decrypt(data['last_name'].toString());

    return {
      statusCode: 201,
      message: 'subscriber created',
      data: data,
    };
  }

  async updateSubscriber(
    updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<any> {
    const { psid } = updateSubscriberDto;
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const subscriber = await this.subscribersRepository.getByPsid(psid);

    if (!subscriber) {
      throw new NotFoundException(`Subscriber with PSID ${psid} not found`);
    }

    const data = await this.subscribersRepository.updateSubscriber(
      subscriber,
      updateSubscriberDto,
    );

    data['psid'] = cipher.decrypt(data['psid'].toString());
    data['first_name'] = cipher.decrypt(data['first_name'].toString());
    data['last_name'] = cipher.decrypt(data['last_name'].toString());
    data['email'] = data['email']
      ? cipher.decrypt(data['email'].toString())
      : '';

    return {
      statusCode: 200,
      message: 'subscriber updated',
      data: data,
    };
  }

  async getSubscriberIdByPsid(psid: string): Promise<any> {
    return await this.subscribersRepository.getByPsid(psid);
  }
}
