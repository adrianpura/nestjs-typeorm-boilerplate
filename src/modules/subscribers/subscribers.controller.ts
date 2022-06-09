import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from './../../entities/subscriber.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ConfigService } from '@nestjs/config';
import { GetSubscribersFilterDto } from './dto/get-subscribers-filter.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(
    private subscribersService: SubscribersService,
    private configService: ConfigService,
  ) {}

  @Get()
  getSubscribers(
    @Query(ValidationPipe) filterDto: GetSubscribersFilterDto,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Subscriber>> {
    const baseUrl = this.configService.get('BASE_URL');
    limit = limit > 100 ? 100 : limit;

    const params = filterDto;
    delete params['page'];
    delete params['limit'];

    const queryString = Object.keys(params)
      .map((key) => key + '=' + filterDto[key])
      .join('&');

    return this.subscribersService.getSubscribers(filterDto, {
      page,
      limit,
      route: baseUrl + '/subscribers?' + queryString,
    });
  }

  @Get('/get-by-psid/:psid')
  getSubscriberByPsid(@Param('psid') psid: string): Promise<Subscriber> {
    return this.subscribersService.getSubscriberByPsid(psid);
  }

  @Get('/:id')
  getSubscriberById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Subscriber> {
    return this.subscribersService.getSubscriberById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSubscriber(
    @Body() createSubscriberDto: CreateSubscriberDto,
  ): Promise<any> {
    return this.subscribersService.createSubscriber(createSubscriberDto);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  updateSubscriber(
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<any> {
    return this.subscribersService.updateSubscriber(updateSubscriberDto);
  }
}
