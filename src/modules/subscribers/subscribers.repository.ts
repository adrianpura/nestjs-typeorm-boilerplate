/* eslint-disable @typescript-eslint/no-var-requires */
import { Repository, EntityRepository } from 'typeorm';
import { Subscriber } from '../../entities/subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { GetSubscribersFilterDto } from './dto/get-subscribers-filter.dto';
const aes256 = require('aes256');
const { uuid } = require('uuidv4');

@EntityRepository(Subscriber)
export class SubscribersRepository extends Repository<Subscriber> {
  async getSubscribers(
    filterDto: GetSubscribersFilterDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Subscriber>> {
    const { gender } = filterDto;

    const query = this.createQueryBuilder('subscribers');

    if (gender) {
      query.andWhere('subscribers.gender = :gender', { gender });
    }

    return await paginate<Subscriber>(query, options);
  }

  async getById(id: number): Promise<Subscriber> {
    const query = this.createQueryBuilder('subscribers');

    query.andWhere('subscribers.id = :id', { id });

    return await query.getOne();
  }

  async getByPsid(psid: string): Promise<Subscriber> {
    const query = this.createQueryBuilder('subscribers');

    const hashedPsid = crypto
      .createHash('sha256')
      .update(psid)
      .digest('base64');

    query.andWhere('subscribers.psid_hashed = :psid_hashed', {
      psid_hashed: hashedPsid,
    });

    return await query.getOne();
  }

  async createSubscriber(
    createSubscriberDto: CreateSubscriberDto,
  ): Promise<Subscriber> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const { psid, brand_id, first_name, last_name } = createSubscriberDto;

    const subscriber = new Subscriber();
    subscriber.psid = cipher.encrypt(psid);
    subscriber.brand_id = brand_id;
    subscriber.uuid = uuid();
    subscriber.psid_hashed = crypto
      .createHash('sha256')
      .update(psid)
      .digest('base64');
    subscriber.first_name = cipher.encrypt(first_name);
    subscriber.first_name_hashed = crypto
      .createHash('sha256')
      .update(first_name)
      .digest('base64');
    subscriber.last_name = cipher.encrypt(last_name);
    subscriber.last_name_hashed = crypto
      .createHash('sha256')
      .update(last_name)
      .digest('base64');
    try {
      await subscriber.save();
    } catch (e) {
      if (e.code === '23505' || e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('user already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return subscriber;
  }

  async updateSubscriber(
    subscriber: Subscriber,
    updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<Subscriber> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const { gender, email, birthday, mobile_number } = updateSubscriberDto;

    if (gender) {
      subscriber.gender = gender;
    }

    if (email) {
      subscriber.email = cipher.encrypt(email);
      subscriber.email_hashed = crypto
        .createHash('sha256')
        .update(email)
        .digest('base64');
    }

    if (birthday) {
      subscriber.birthday = birthday;
    }

    if (mobile_number) {
      subscriber.mobile_number = mobile_number;
    }

    try {
      await subscriber.save();
    } catch (e) {
      console.log(e.code);
      throw new InternalServerErrorException();
    }

    return subscriber;
  }
}
